import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';

export default function Layout({ children }) {
  const location = useLocation();
  const { user, logout } = useAuth();
  const links = [
    ['/', 'Início'], ['jogos', 'Jogos'], ['tabela', 'Tabela'], ['noticias', 'Notícias'], ['fantasy', 'Fantasy']
  ];
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-40 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link to="/" className="font-black text-xl text-[var(--brand)]">⚽ Passa a Bola</Link>
          <nav className="hidden md:flex items-center gap-1">
            {links.map(([path,label]) => <Link key={path} to={path === '/' ? '/' : `/${path}`} className={`px-3 py-2 rounded-lg text-sm font-semibold ${location.pathname === (path === '/' ? '/' : `/${path}`) ? 'bg-purple-50 text-[var(--brand)]' : 'text-slate-600 hover:bg-slate-100'}`}>{label}</Link>)}
          </nav>
          <div className="flex items-center gap-2">
            {user ? <><span className="hidden sm:inline text-sm text-slate-600">Olá, {user.name}</span><button onClick={logout} className="px-3 py-2 rounded-lg border text-sm font-semibold">Sair</button></> : <Link to="/login" className="px-4 py-2 rounded-lg text-white text-sm font-bold header-brand">Entrar</Link>}
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="mt-12 bg-slate-900 text-white py-8"><div className="max-w-7xl mx-auto px-4 text-sm text-slate-300">Passa a Bola • Projeto acadêmico FIAP</div></footer>
    </div>
  );
}
