import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [compareList, setCompareList] = useState(() => {
    try {
      const saved = localStorage.getItem('dc_compare');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCompareDrawerOpen, setIsCompareDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('dc_compare', JSON.stringify(compareList));
    } catch (e) {
      console.error('Failed to save compare list', e);
    }
  }, [compareList]);

  const addToCompare = (product) => {
    if (compareList.length >= 4) {
      toast.error('You can compare a maximum of 4 products at a time.');
      return false;
    }
    if (compareList.some((p) => p.id === product.id)) {
      toast('Product is already in compare list');
      return false;
    }
    setCompareList((prev) => [...prev, product]);
    toast.success(`Added ${product.name} to compare`);
    setIsCompareDrawerOpen(true);
    return true;
  };

  const removeFromCompare = (productId) => {
    setCompareList((prev) => prev.filter((p) => p.id !== productId));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const isInCompare = (productId) => {
    return compareList.some((p) => p.id === productId);
  };

  return (
    <CompareContext.Provider
      value={{
        compareList,
        isCompareDrawerOpen,
        setIsCompareDrawerOpen,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => useContext(CompareContext);
