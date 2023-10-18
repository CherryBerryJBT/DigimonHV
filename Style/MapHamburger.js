import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

function MapHamburger({ changeMapType, goToHomePoint, goBackToCoordinates }) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)}>
        <Text style={styles.menuIcon}>☰</Text>
      </TouchableOpacity>

      {/* Dropdown Menu */}
      {showDropdown && (
        <View style={styles.dropdown}>
          <TouchableOpacity onPress={() => {
            changeMapType();
            setShowDropdown(false);
          }}>
            <Text style={styles.dropdownItem}>Toggle Map Type</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            goToHomePoint();
            setShowDropdown(false);
          }}>
            <Text style={styles.dropdownItem}>Go to Home Point</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            goBackToCoordinates();
            setShowDropdown(false);
          }}>
            <Text style={styles.dropdownItem}>Go Back to Coordinates</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 1,
  },
  menuIcon: {
    fontSize: 48,
  },
  dropdown: {
    marginTop: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default MapHamburger;
