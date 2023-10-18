import React from 'react';
import { View, Text, FlatList } from 'react-native';

const EventList = ({ date, events }) => {
  const eventsForDate = events.filter((event) => event.date === date);

  return (
    <View style={{ padding: 20 }}>
      <Text>Events for {date}:</Text>
      <FlatList
        data={eventsForDate}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
    </View>
  );
};

export default EventList;
