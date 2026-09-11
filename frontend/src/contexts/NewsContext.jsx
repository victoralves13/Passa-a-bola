import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchFeminineFootballNews } from '../services/newsService';

const NewsContext = createContext();

export const useNewsContext = () => {
  const context = useContext(NewsContext);
  if (!context) throw new Error('useNewsContext deve ser usado dentro de NewsProvider');
  return context;
};

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastFetchTime, setLastFetchTime] = useState(null);
  const CACHE_DURATION = 5 * 60 * 1000;

  const loadNews = useCallback(async (forceRefresh = false) => {
    if (!forceRefresh && news.length > 0 && lastFetchTime && Date.now() - lastFetchTime < CACHE_DURATION) return;
    try {
      setLoading(true); setError(null);
      const newsData = await fetchFeminineFootballNews();
      setNews(newsData); setLastFetchTime(Date.now());
    } catch {
      setError('Erro ao carregar notícias');
      if (news.length === 0) setNews([]);
    } finally { setLoading(false); }
  }, [news.length, lastFetchTime]);

  useEffect(() => { if (news.length === 0 && !loading) loadNews(); }, []);

  return <NewsContext.Provider value={{ news, loading, error, loadNews, refreshNews: () => loadNews(true) }}>{children}</NewsContext.Provider>;
};

export default NewsContext;
