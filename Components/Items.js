import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomToggle from '../Style/CustomToggle';
import { styles } from '../Style/Stylesheet';
import Shop from '../Components/shop';
import { useRoute } from '@react-navigation/native';
import { useItems } from '../Workspace/ItemsContext';
import { v4 as uuidv4 } from 'uuid';

function Items() {
  const itemsContext = useItems();
  console.log(itemsContext);
  const items = itemsContext.items;
  const setItems = itemsContext.setItems;

  //const [items, setItems] = useItems();
  const [inputValue, setInputValue] = useState('');
  const route = useRoute();
  

    useEffect(() => {
      const loadItems = async () => {
        try {
          const storedItems = await AsyncStorage.getItem('items');
          if (storedItems) {
            setItems(JSON.parse(storedItems) || []);
          }
        } catch (error) {
          console.error("Failed to load items:", error);
        }
      };
      loadItems();
    }, []);

    useEffect(() => {
        if (route.params?.boughtItem) {
            const newItems = [...items, route.params.boughtItem];
            setItems(newItems);
            saveItems(newItems);
        }
    }, [route.params?.boughtItem, items]);

    const addItem = () => {
      if (inputValue.trim() !== '') {
        const newItem = { id: uuidv4(), name: inputValue };
        setItems(prevItems => [...prevItems, newItem]);
        setInputValue('');
      }
    };

    const saveItems = async (newItems) => {
        try {
            await AsyncStorage.setItem('items', JSON.stringify(newItems));
        } catch (error) {
            console.error("Failed to save items:", error);
        }
    };

    const removeItem = (id) => {
        const updatedItems = items.filter(item => item.id !== id);
        setItems(updatedItems);
        saveItems(updatedItems);
    };
    
    // item is bought from the shop
    const buyItemFromShop = (item) => {
        const updatedItems = [...items, item];
        setItems(updatedItems);
        saveItems(updatedItems);
    };

    return (
        <View style={styles.screen}>
          <Text style={styles.title}>Items</Text>
    
          {/* List of items */}
          <FlatList
            data={items}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <Text style={styles.task}>{item.name}</Text>
                <TouchableOpacity style={styles.deleteButton} onPress={() => removeItem(item.id)}>
                  <Text style={styles.deleteButtonText}>🌬️</Text>
                </TouchableOpacity>
              </View>
            )}
          />
    
          {/* Input field and Add button */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={inputValue}
              onChangeText={setInputValue}
              placeholder="What did you find?"
              maxLength={30} 
            />
            <Button title="gather" color="#ffa500" onPress={addItem} />
          </View>
    
        </View>
    ); 
}

export default Items;
