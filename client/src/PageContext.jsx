import React, { useState, useEffect, createContext, useContext } from 'react';

export const PageContext = createContext();

export const usePage = () => useContext(PageContext);

export const PageProvider = ({ children }) => {
  const [page, setPage] = useState(() => {
    const savedPage = localStorage.getItem('page');
    return savedPage ? JSON.parse(savedPage) : null;
  });

  useEffect(() => {
    if (page) {
      localStorage.setItem('page', JSON.stringify(page));
    } else {
      localStorage.removeItem('page');
    }
  }, [page]);

  return (
    <PageContext.Provider value={{ page, setPage }}>
      {children}
    </PageContext.Provider>
  );
};
