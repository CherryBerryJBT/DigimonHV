import React, { useState, useEffect } from 'react'; // Added useEffect import
import { View, Button, StyleSheet, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import EventModal from './EventModal';
import EventList from './EventList';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CalendarMain = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const getMarkedDates = () => {
    let marked = {};

    // Highlight the selected day with a circle
    if (selectedDate) {
      marked[selectedDate] = {
        selected: true,
        selectedColor: 'gold',
      };
    }

    // Show dots for days with events
    events.forEach(event => {
      if (marked[event.date]) {
        marked[event.date].dots = [
          { key: 'event', color: 'green' },
        ];
      } else {
        marked[event.date] = {
          dots: [
            { key: 'event', color: 'green' },
          ],
        };
      }
    });

    return marked;
  };

  useEffect(() => {
    // Load saved events when the component mounts
    const loadEvents = async () => {
      try {
        const savedEvents = await AsyncStorage.getItem('events');
        if (savedEvents) {
          setEvents(JSON.parse(savedEvents));
        }
      } catch (error) {
        console.error("Error loading events:", error);
      }
    };

    loadEvents();
  }, []);

  const handleAddEvent = async (event) => {
    const newEvents = [...events, event];
    setEvents(newEvents);
    try {
      await AsyncStorage.setItem('events', JSON.stringify(newEvents));
    } catch (error) {
      console.error("Error saving event:", error);
    }
    setModalVisible(false);
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  return (
    <View style={styles.screen}>
            <Text style={styles.title}>DigiCalendar</Text>
    <View style={styles.container}>
      <Calendar 
        onDayPress={handleDayPress}
        markedDates={getMarkedDates()}
        markingType={'multi-dot'}
      />
      <Button title="Add Event" color="#ffa500" onPress={() => setModalVisible(true)} />
      <Button title="Add Arena Fight" color="#ffa500" onPress={() => setModalVisible(true)} />
      <EventList date={selectedDate} events={events} />
      <EventModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleAddEvent}
      />
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#663399', 
  },
});

export default CalendarMain;
