const express = require('express');
const path = require('path');
const fs = require('fs');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcrypt');
const newsRoutes = require('./routes/news');
const app = express();
const DATA = path.join(__dirname,'db','db.json');

app.set('trust proxy', 1);

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

const allowedOriginsEnv = process.env.ALLOWED_ORIGINS || '';
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  ...allowedOriginsEnv.split(',').filter(o => o.trim())
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) callback(null, true);
    else callback(new Error('Origin não permitida pelo CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Muitas tentativas de login. Tente novamente em 15 minutos.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Muitas requisições. Tente novamente mais tarde.' },
});

app.use('/api/', apiLimiter);
app.use(express.json());

function readDB(){ return JSON.parse(fs.readFileSync(DATA,'utf8')); }
function writeDB(obj){ fs.writeFileSync(DATA, JSON.stringify(obj, null, 2)); }

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token de autenticação necessário' });

  try {
    const db = readDB();
    const session = (db.sessions || []).find(s => s.token === token);
    if (!session) return res.status(401).json({ error: 'Token inválido ou expirado' });

    const TOKEN_EXPIRATION = 24 * 60 * 60 * 1000;
    if (Date.now() - session.createdAt > TOKEN_EXPIRATION) {
      db.sessions = db.sessions.filter(s => s.token !== token);
      writeDB(db);
      return res.status(401).json({ error: 'Token expirado. Faça login novamente.' });
    }

    req.user = session.user;
    req.token = token;
    next();
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao validar token' });
  }
};

app.get('/api/games', (req,res,next)=>{
  try { res.json(readDB().games || []); } catch (error) { next(error); }
});

app.get('/api/teams', (req,res,next)=>{
  try { res.json(readDB().teams || []); } catch (error) { next(error); }
});

app.get('/api/ranking', (req,res,next)=>{
  try { res.json(readDB().ranking || []); } catch (error) { next(error); }
});

app.post('/api/auth/login', loginLimiter, async (req,res)=>{
  const {email,password} = req.body;
  if (!email || !password) return res.status(400).json({error: 'Email e senha são obrigatórios'});
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({error: 'Email inválido'});

  try {
    const db = readDB();
    const user = (db.users || []).find(u => u.email === email);
    if (!user) return res.status(401).json({error:'Email ou senha incorretos'});

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({error:'Email ou senha incorretos'});

    const token = `token_${Date.now()}_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    const userData = { id: user.id, name: user.name, email: user.email, role: user.role || 'user' };
    if (!db.sessions) db.sessions = [];
    db.sessions.push({ token, userId: user.id, user: userData, createdAt: Date.now() });
    writeDB(db);
    res.json({ token, user: userData });
  } catch (error) {
    res.status(500).json({error: 'Erro ao processar login'});
  }
});

app.post('/api/auth/logout', authenticateToken, (req,res)=>{
  try {
    const db = readDB();
    db.sessions = (db.sessions || []).filter(s => s.token !== req.token);
    writeDB(db);
    res.json({ message: 'Logout realizado com sucesso' });
  } catch (err) { res.status(500).json({ error: 'Erro ao fazer logout' }); }
});

app.get('/api/auth/verify', authenticateToken, (req,res)=>{
  res.json({ valid: true, user: req.user });
});

app.use('/api', newsRoutes);

app.use((err, req, res, next) => {
  console.error('Erro:', err);
  res.status(err.status || 500).json({ error: err.message || 'Erro interno do servidor' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=> console.log('Server rodando na porta', PORT));
