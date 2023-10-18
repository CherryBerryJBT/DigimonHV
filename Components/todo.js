import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomToggle from '../Style/CustomToggle'
import { styles } from '../Style/Stylesheet';

const ToDo = () => {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        if (storedTasks) {
          setTaskList(JSON.parse(storedTasks));
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load tasks.');
      }
    };

    loadTasks();
  }, []);

  const saveTasks = async (newTaskList) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(newTaskList));
    } catch (error) {
      Alert.alert('Error', 'Failed to save tasks.');
    }
  };

  const addTask = () => {
    if (task.trim()) {
      const newTaskList = [...taskList, { id: Math.random().toString(), task: task.trim() }];
      saveTasks(newTaskList);
      setTaskList(newTaskList);
      setTask('');
    }
  };

  const deleteTask = (taskId) => {
    const newTaskList = taskList.filter(task => task.id !== taskId);
    saveTasks(newTaskList);
    setTaskList(newTaskList);
  };

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <CustomToggle
        initialState={item.completed}
        onToggle={(isSelected) => handleToggle(item.id, isSelected)}
      />
      <Text style={[styles.task, item.completed ? styles.completedTask : null]}>{item.task}</Text>
      <TouchableOpacity onPress={() => deleteTask(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );

  const handleToggle = (taskId, isSelected) => {
    const newTaskList = taskList.map(task =>
      task.id === taskId ? { ...task, completed: isSelected } : task
    );
    saveTasks(newTaskList);
    setTaskList(newTaskList);
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>DigiDo</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Task"
          value={task}
          onChangeText={text => setTask(text)}
        />
        <Button title="do" onPress={addTask} color="#841584" />
      </View>
      <FlatList
        data={taskList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.listContainer}
      />
    </View>
  );
};

export default ToDo;
