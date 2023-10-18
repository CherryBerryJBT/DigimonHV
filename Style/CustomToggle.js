import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomToggle = ({ onToggle, initialState = false }) => {
  const [isSelected, setSelection] = useState(initialState);

  const toggleSelection = () => {
    const newState = !isSelected;
    setSelection(newState);
    onToggle(newState);
  };

  return (
    <TouchableOpacity
      style={[styles.toggleBase, isSelected ? styles.toggleSelected : styles.toggleUnselected]}
      onPress={toggleSelection}
    >
      <Text style={styles.toggleText}>{isSelected ? '✔' : ''}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  toggleBase: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5, // Optional: for rounded corners
  },
  toggleSelected: {
    backgroundColor: 'blue', // Or any color representing the selected state
  },
  toggleUnselected: {
    backgroundColor: 'white', // Or any color representing the unselected state
  },
  toggleText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CustomToggle;
