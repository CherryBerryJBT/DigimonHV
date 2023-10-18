import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create a context with an empty default value
export const ItemsContext = createContext({
  items: [],
  setItems: () => {},
});


// Custom hook for components to use the context
export function useItems() {
  const context = useContext(ItemsContext);
  if (context === undefined) {
    throw new Error('useItems must be used within an ItemsProvider');
  }
  return context;
}

// Provider component that holds the state and methods
export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([
    { id: '1', name: 'Digi-Egg' },
    { id: '2', name: 'Digi-Device' },
    { id: '3', name: 'Digi-Snack' },
  ]);

  // Load items at start
  useEffect(() => {
    const loadItems = async () => {
      try {
        const storedItems = await AsyncStorage.getItem('items');
        if (storedItems) {
          setItems(JSON.parse(storedItems));
        }
      } catch (error) {
        console.error("Failed to load items:", error);
      }
    };
    loadItems();
  }, []);

  // Save items whenever they change
  useEffect(() => {
    const saveItems = async () => {
      try {
        await AsyncStorage.setItem('items', JSON.stringify(items));
      } catch (error) {
        console.error("Failed to save items:", error);
      }
    };
    saveItems();
  }, [items]);

  return (
    <ItemsContext.Provider value={{ items, setItems }}>
      {children}
    </ItemsContext.Provider>
  );
};
