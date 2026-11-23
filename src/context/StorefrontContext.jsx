import React, { createContext, useContext, useState, useEffect } from 'react';
import { dbService } from '../services/firebase/db';

const StorefrontContext = createContext();

export const StorefrontProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [settings, setSettings] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const refreshCatalogData = async () => {
    const [cats, brnds, sets] = await Promise.all([
      dbService.getAll('categories', { status: 'active' }, 'displayOrder', 'asc'),
      dbService.getAll('brands', { status: 'active' }, 'displayOrder', 'asc'),
      dbService.getAll('settings'),
    ]);
    setCategories(cats || []);
    setBrands(brnds || []);
    if (sets && sets.length > 0) {
      setSettings(sets[0]);
    }
  };

  useEffect(() => {
    refreshCatalogData();

    // Listen for category/brand/settings updates from admin in same window
    const handleCatUpdate = () => refreshCatalogData();
    window.addEventListener('dc_db_categories_updated', handleCatUpdate);
    window.addEventListener('dc_db_brands_updated', handleCatUpdate);
    window.addEventListener('dc_db_settings_updated', handleCatUpdate);

    return () => {
      window.removeEventListener('dc_db_categories_updated', handleCatUpdate);
      window.removeEventListener('dc_db_brands_updated', handleCatUpdate);
      window.removeEventListener('dc_db_settings_updated', handleCatUpdate);
    };
  }, []);

  return (
    <StorefrontContext.Provider
      value={{
        categories,
        brands,
        settings,
        isSearchOpen,
        setIsSearchOpen,
        refreshCatalogData,
      }}
    >
      {children}
    </StorefrontContext.Provider>
  );
};

export const useStorefront = () => useContext(StorefrontContext);
