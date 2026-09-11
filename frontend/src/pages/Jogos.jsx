import React, { useEffect, useState } from 'react';
import { apiUrl } from '../config/api.js';

export default function Jogos() {
  const [games,setGames]=useState([]);
  useEffect(()=>{fetch(apiUrl('games')).then(r=>r.json()).then(setGames).catch(()=>setGames([]))},[]);
  return <div className="max-w-5xl mx-auto px-4 py-10"><h1 className="text-3xl font-black">Jogos</h1><p className="text-slate-500 mt-1">Partidas e resultados.</p><div className="grid md:grid-cols-2 gap-5 mt-8">{games.map(g=><article key={g.id} className="bg-white border rounded-2xl p-6 shadow-sm"><div className="text-xs text-slate-500">{new Date(g.date).toLocaleString('pt-BR')}</div><div className="flex items-center justify-between mt-5 font-bold"><span>{g.home}</span><strong className="text-xl text-purple-700">{g.score}</strong><span>{g.away}</span></div></article>)}</div></div>;
}
