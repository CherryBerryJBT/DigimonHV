import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from '../Style/Stylesheet';
import { useItems } from '../Workspace/ItemsContext';
import { v4 as uuidv4 } from 'uuid';
import { collection, getDocs } from "@firebase/firestore";
import { FIRESTORE_DB } from "../Login/firebase";



const Shop = () => {
    const { items, setItems } = useItems();
    const [shopItems, setShopItems] = useState([
        //{ id: '4', name: 'Digi-Potion' }, 
    ]);

    useEffect(() => {
        // Fetch items from Firestore
        const fetchItems = async () => {
            try {
                const querySnapshot = await getDocs(collection(FIRESTORE_DB, "DigiShopItems")); // "DigiShopItems" collection in Firestore
    
                const fetchedItems = querySnapshot.docs.map(doc => {
                    return { id: doc.id, ...doc.data() };
                });
                setShopItems(fetchedItems);
            } catch (error) {
                console.error("Error fetching shop items: ", error);
            }
        };
    
        fetchItems();
    }, []);

    const buyItem = (item) => {
        const itemExists = items.some(i => i.id === item.id);

        if (!itemExists) {
            const newItem = { ...item, id: uuidv4() }; 
            setItems(prevItems => [...prevItems, newItem]);
        }
    }


    return (
        <View style={styles.screen}>
            <Text style={styles.title}>DigiShop</Text>
            <FlatList
                data={shopItems}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Text style={styles.task}>{item.name}</Text>
                        <TouchableOpacity 
                            style={styles.deleteButton} color= "#8fbc8f" onPress={() => buyItem(item)}
                        >
                            <Text style={styles.deleteButtonText}>Buy</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
    
};

const additionalStyles = StyleSheet.create({
    widenedItem: {
      width: '75%',
      paddingHorizontal: 10,
    },
  });

export default Shop;
