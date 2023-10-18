import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, FlatList, StyleSheet, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const DigimonSearch = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');

  useEffect(() => {
    fetch('https://digimon-api.vercel.app/api/digimon')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  const filteredData = data.filter(digimon => {
    const matchesName = digimon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'All' || digimon.level === selectedLevel;
    return matchesName && matchesLevel;
  });

  return (
    <View style={styles.container}>
      <TextInput
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder="Digisearch..."
        style={styles.input}
      />
      <Picker
        selectedValue={selectedLevel}
        onValueChange={(itemValue) => setSelectedLevel(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="All Levels" value="All" />
        <Picker.Item label="In Training" value="In Training" />
        <Picker.Item label="Rookie" value="Rookie" />
        <Picker.Item label="Champion" value="Champion" />
        <Picker.Item label="Ultimate" value="Ultimate" />
        <Picker.Item label="Mega" value="Mega" />
        {/* Add more levels as needed */}
      </Picker>
      <FlatList
        data={filteredData}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.img }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.level}>Level: {item.level}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 50,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  picker: {
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  level: {
    fontSize: 16,
  },
});

export default DigimonSearch;
