import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Diary = () => {
  const [entries, setEntries] = useState([]);
  const [input, setInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentEntryIndex, setCurrentEntryIndex] = useState(null);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const storedEntries = await AsyncStorage.getItem('storedEntries');
        setEntries(storedEntries !== null ? JSON.parse(storedEntries) : []);
      } catch (error) {
        console.error("Failed to fetch entries:", error);
      }
    };

    fetchEntries();
  }, []);

  const handleSaveEntry = async () => {
    try {
      const newEntriesArray = [...entries];
      newEntriesArray[currentEntryIndex].content = input;
      await AsyncStorage.setItem('storedEntries', JSON.stringify(newEntriesArray));
      setEntries(newEntriesArray);
      setIsEditing(false);
      setInput('');
    } catch (error) {
      console.error("Failed to update entry:", error);
    }
  };

  const handleAddEntry = async () => {
    if (input.trim() === '') {
      // Prevent empty entries
      return;
    }
  
    const newEntry = {
      date: new Date().toLocaleDateString(),
      content: input,
    };
  
    try {
      const updatedEntries = [...entries, newEntry];
      await AsyncStorage.setItem('storedEntries', JSON.stringify(updatedEntries));
      setEntries(updatedEntries);
      setInput('');
    } catch (error) {
      console.error("Failed to add new entry:", error);
    }
  };

  const handleEditEntry = (index) => {
    setInput(entries[index].content);
    setIsEditing(true);
    setCurrentEntryIndex(index);
  };

  const handleDeleteEntry = async (index) => {
    try {
      const newEntriesArray = [...entries];
      newEntriesArray.splice(index, 1);
      await AsyncStorage.setItem('storedEntries', JSON.stringify(newEntriesArray));
      setEntries(newEntriesArray);
    } catch (error) {
      console.error("Failed to delete entry:", error);
    }
  };

  return (
    <View style={styles.screen}>
    <View style={styles.container}>
      <Text style={styles.title}>DigiDiary</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="What's on your mind?"
          value={input}
          onChangeText={setInput}
          multiline
        />
        {isEditing ? (
  <TouchableOpacity style={styles.customButton} onPress={handleSaveEntry}>
    <Text style={styles.buttonText}>Save</Text>
  </TouchableOpacity>
) : (
  <TouchableOpacity style={styles.customButton} onPress={handleAddEntry}>
    <Text style={styles.buttonText}>Type</Text>
  </TouchableOpacity>
)}
        {/*<Button title="Type" color="#ffa500" onPress={handleAddEntry} />*/}
      </View>
      <ScrollView>
        {entries.map((entry, index) => (
          <View key={index} style={styles.entry}>
            <View style={styles.entryHeader}>
              <Text style={styles.entryDate}>{entry.date}</Text>
              <TouchableOpacity onPress={() => handleEditEntry(index)} style={styles.editButton}>
  <Text style={styles.editButtonText}>Edit</Text>
</TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteEntry(index)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>📜</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.entryContent}>{entry.content}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
    screen: {
        padding: 50,
        flex: 1,
        backgroundColor: '#f3f3f3',
      },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
      },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#663399', 
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginRight: 10,
    paddingVertical: 6,
  },
  entry: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    minWidth: '100%',
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  entryDate: {
    fontSize: 18,
    color: '#666',
  },
  deleteButton: {
    backgroundColor: '#ff6347',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
  },
  entryContent: {
    marginTop: 10,
    fontSize: 16,
  },
  customButton: {
    backgroundColor: "#ffa500",
    paddingHorizontal: 10, 
    paddingVertical: 10, 
    borderRadius: 5, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  buttonText: {
    color: 'white',
    fontSize: 16, 
  },
});

export default Diary;
