import React, { useState } from 'react';
import { Modal, View, TextInput, Button, StyleSheet } from 'react-native';

const EventModal = ({ isVisible, onClose, onSave }) => {
  const [title, setTitle] = useState('');

  const handleSave = () => {
    if (title) {
      onSave({ id: Date.now(), title });
      setTitle('');
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={{ padding: 20 }}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="What's it gonna be"
        />
        <Button title="Save" color="#ffa500" onPress={handleSave} />
        <Button title="Close" color="#ffa500" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-end",
      padding: 100,
      //marginTop: 100, 
    },
  });

export default EventModal;