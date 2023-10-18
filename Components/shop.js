import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from '../Style/Stylesheet';
import { useItems } from '../Workspace/ItemsContext';
import { v4 as uuidv4 } from 'uuid';

const Shop = () => {
    const { items, setItems } = useItems();
    const shopItems = [
        { id: '4', name: 'Digi-Potion' },
        { id: '5', name: 'Digi-Armor' },
        { id: '6', name: 'Digi-Sword' },
    ];

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

export default Shop;
