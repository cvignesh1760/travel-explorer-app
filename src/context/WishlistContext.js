import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WISHLIST_STORAGE_KEY = '@travel_explorer_wishlist_v1';

const WishlistContext = createContext({
  wishlist: [],
  isWishlisted: () => false,
  toggleWishlist: () => {},
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  clearWishlist: () => {},
  isLoading: true,
});

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load persisted wishlist on app startup (Extension Challenge 4)
  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const stored = await AsyncStorage.getItem(WISHLIST_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setWishlist(parsed);
          }
        }
      } catch (error) {
        console.warn('Failed to load wishlist from local storage', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadWishlist();
  }, []);

  // Save wishlist to local storage on changes
  const saveWishlist = async (updatedList) => {
    try {
      await AsyncStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(updatedList));
    } catch (error) {
      console.warn('Failed to persist wishlist to local storage', error);
    }
  };

  const isWishlisted = (destinationId) => {
    return wishlist.includes(destinationId);
  };

  const addToWishlist = (destinationId) => {
    if (!wishlist.includes(destinationId)) {
      const updated = [...wishlist, destinationId];
      setWishlist(updated);
      saveWishlist(updated);
    }
  };

  const removeFromWishlist = (destinationId) => {
    const updated = wishlist.filter((id) => id !== destinationId);
    setWishlist(updated);
    saveWishlist(updated);
  };

  const toggleWishlist = (destinationId) => {
    if (isWishlisted(destinationId)) {
      removeFromWishlist(destinationId);
    } else {
      addToWishlist(destinationId);
    }
  };

  const clearWishlist = () => {
    setWishlist([]);
    saveWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isWishlisted,
        toggleWishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isLoading,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
