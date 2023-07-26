import React, { createContext, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import qs from 'qs';

const Context = createContext({});

export const SearchParamsProvider: React.FC<{children?: React.ReactNode}> = ({ children }) => {
  const location = useLocation();

  let params;
  try {
    params = qs.parse(
      location.search,
      { ignoreQueryPrefix: true, depth: 10 },
    );
  } catch (error) {
    params = {};
    const pairs = location.search.slice(1).split('&');
    pairs.forEach(pair => {
      const [key, value] = pair.split('=');
      params[key] = value;
    });
  }

  return (
    <Context.Provider value={params}>
      {children}
    </Context.Provider>
  );
};

export const useSearchParams = (): qs.ParsedQs => useContext(Context);
