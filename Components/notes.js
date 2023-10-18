import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomToggle from '../Style/CustomToggle';
import { styles } from '../Style/Stylesheet';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const storedNotes = await AsyncStorage.getItem('storedNotes');
        setNotes(storedNotes !== null ? JSON.parse(storedNotes) : []);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
    };

    fetchNotes();
  }, []);

  const handleAddNote = async () => {
    try {
      const newNote = { content: input, isSelected: false };
      const newNotesArray = [...notes, newNote];
      await AsyncStorage.setItem('storedNotes', JSON.stringify(newNotesArray));
      setNotes(newNotesArray);
      setInput('');
    } catch (error) {
      console.error("Failed to save note:", error);
    }
  };

  const handleToggle = async (index) => {
    try {
      const newNotesArray = [...notes];
      newNotesArray[index].isSelected = !newNotesArray[index].isSelected;
      await AsyncStorage.setItem('storedNotes', JSON.stringify(newNotesArray));
      setNotes(newNotesArray);
    } catch (error) {
      console.error("Failed to update note selection:", error);
    }
  };

  const handleDeleteNote = async (index) => {
    try {
      const newNotesArray = [...notes];
      newNotesArray.splice(index, 1); 
      await AsyncStorage.setItem('storedNotes', JSON.stringify(newNotesArray));
      setNotes(newNotesArray); 
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>DigiNotes</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Scribble here..."
          value={input}
          onChangeText={setInput}
        />
        <Button title="write" color="#ffa500" onPress={handleAddNote} />
      </View>
      <ScrollView>
        {notes.map((note, index) => (
          <View key={index} style={styles.listItem}>
            <CustomToggle initialState={note.isSelected} onToggle={() => handleToggle(index)} />
            <Text style={styles.task}>{note.content}</Text>
            <TouchableOpacity 
              style={styles.deleteButton} 
              onPress={() => handleDeleteNote(index)}
            >
              <Text style={styles.deleteButtonText}>🗑️</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Notes;
