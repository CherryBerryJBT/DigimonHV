import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

console.log("Digimons component is being rendered");

function Digimons() {
    const [allDigimons, setAllDigimons] = useState([]);
    const [wildDigimons, setWildDigimons] = useState([]);
    const [caughtDigimons, setCaughtDigimons] = useState([]);

    // Fetch Digimons
    useEffect(() => {
        fetch('https://digimon-api.vercel.app/api/digimon')
            .then(response => response.json())
            .then(data => {
                console.log("Fetched Data:", data);
                setAllDigimons(data);
                setWildDigimons(selectRandomDigimons(data));
            });
    }, []);

    // Load caught Digimons from AsyncStorage
    useEffect(() => {
        const loadCaughtDigimons = async () => {
            try {
                const storedDigimons = await AsyncStorage.getItem('caughtDigimons');
                if (storedDigimons) {
                    setCaughtDigimons(JSON.parse(storedDigimons));
                }
            } catch (error) {
                console.error("Failed to load caught Digimons:", error);
            }
        };
        loadCaughtDigimons();
    }, []);

    // Save caught Digimons to AsyncStorage whenever they change
    useEffect(() => {
        const saveCaughtDigimons = async () => {
            try {
                await AsyncStorage.setItem('caughtDigimons', JSON.stringify(caughtDigimons));
            } catch (error) {
                console.error("Failed to save caught Digimons:", error);
            }
        };
        saveCaughtDigimons();
    }, [caughtDigimons]);
//shuffle Digimons and select Wild to catch just one of them at a time
  const selectRandomDigimons = (digimons) => {
    let availableDigimons = digimons.filter(d => !caughtDigimons.some(cd => cd.name === d.name));
    let shuffled = digimons.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
};

const catchDigimon = (digimon) => {
    setCaughtDigimons(prevState => [...prevState, digimon]);
    setWildDigimons(selectRandomDigimons(allDigimons));
};

const releaseDigimon = (digimonName) => {
    setCaughtDigimons(prevState => prevState.filter(d => d.name !== digimonName));
};

return (
    <View style={styles.container}>
        {/* Wild Digimons section */}
        <View style={styles.halfContainer}>
            <Text style={styles.title}>Wild Digimons</Text>
            <FlatList
                data={wildDigimons.filter(d => !caughtDigimons.some(cd => cd.name === d.name))}
                keyExtractor={item => item.name}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Image source={{ uri: item.img }} style={styles.image} />
                        <Text>{item.name}</Text>
                        <Button title="Catch" color="#ffa500" onPress={() => catchDigimon(item)} />
                    </View>
                )}
            />
        </View>

        {/* Caught Digimons section */}
        <View style={styles.halfContainer}>
            <Text style={styles.title}>Caught Digimons</Text>
            <FlatList
                data={caughtDigimons}
                keyExtractor={item => item.name}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Image source={{ uri: item.img }} style={styles.image} />
                        <Text>{item.name}</Text>
                        <Button title="Release" color="#ffa500" onPress={() => releaseDigimon(item.name)} />
                    </View>
                )}
            />
        </View>
    </View>
);

  
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 10,
    },

    halfContainer: {
      flex: 1,
      justifyContent: 'center',
  },
});

export default Digimons;
