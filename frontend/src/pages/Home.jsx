import React from 'react';
import { Link } from 'react-router-dom';
import { useNews } from '../hooks/useNews.jsx';

export default function Home() {
  const { news, loading } = useNews();
  return <div className="max-w-7xl mx-auto px-4 py-10">
    <section className="rounded-3xl bg-gradient-to-br from-purple-800 to-purple-500 text-white p-8 md:p-14 shadow-xl">
      <span className="text-sm font-bold uppercase tracking-wider text-purple-100">Futebol feminino</span>
      <h1 className="text-4xl md:text-6xl font-black mt-3 max-w-3xl">Tudo sobre o futebol feminino em um só lugar.</h1>
      <p className="mt-5 max-w-2xl text-purple-50 text-lg">Acompanhe jogos, classificação, notícias e Fantasy League em uma experiência integrada.</p>
      <div className="flex flex-wrap gap-3 mt-8"><Link to="/jogos" className="bg-white text-purple-800 px-5 py-3 rounded-xl font-bold">Ver jogos</Link><Link to="/tabela" className="border border-white/40 px-5 py-3 rounded-xl font-bold">Classificação</Link></div>
    </section>
    <section className="mt-10"><div className="flex justify-between items-end mb-5"><div><h2 className="text-2xl font-black">Últimas notícias</h2><p className="text-slate-500">Conteúdo sobre futebol feminino</p></div><Link to="/noticias" className="text-purple-700 font-bold">Ver todas →</Link></div>
      {loading ? <p>Carregando notícias...</p> : <div className="grid md:grid-cols-3 gap-5">{news.slice(0,3).map(n=><article key={n.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border"><img src={n.image} alt="" className="w-full h-44 object-cover"/><div className="p-5"><p className="text-xs uppercase font-bold text-purple-600">{n.category}</p><h3 className="font-bold mt-2">{n.title}</h3><p className="text-sm text-slate-500 mt-2">{n.excerpt}</p></div></article>)}</div>}
    </section>
  </div>;
}
