import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, Image, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapHamburger from '../Style/MapHamburger';

function DigiMap() {
  const [markers, setMarkers] = useState([]);
  const [markerName, setMarkerName] = useState('');
  const [mapType, setMapType] = useState('standard');
  const mapViewRef = useRef(null);

  const changeMapType = () => {
    setMapType(prevType => prevType === 'standard' ? 'satellite' : 'standard');
  };

  const goToHomePoint = () => {
    mapViewRef.current.animateToRegion({
        latitude: 57.6981,
        longitude: 11.9718,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
  };

  const goBackToCoordinates = () => {
    mapViewRef.current.animateToRegion({
        latitude: 57.7089,
        longitude: 11.9746,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
  };

  const handlePress = (e) => {
    setMarkers([
      ...markers,
      {
        coordinate: e.nativeEvent.coordinate,
        color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
        title: markerName,
      },
    ]);
    setMarkerName(''); 
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapViewRef}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 57.6981,
          longitude: 11.9718,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onLongPress={handlePress}
        mapType={mapType}
      >
        {/* Home Marker */}
        <Marker
          coordinate={{ latitude: 57.6981, longitude: 11.9718 }}
          title="Home"
          description="University of Gothenburg."
        />

        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            title={marker.title}
            pinColor={marker.color}
            draggable
            onPress={() => {
                Alert.alert(
                    "Remove Marker",
                    "Do you want to remove this marker?",
                    [
                        {
                            text: "Cancel",
                            style: "cancel"
                        },
                        {
                            text: "Remove",
                            onPress: () => {
                                const newMarkers = [...markers];
                                newMarkers.splice(index, 1);
                                setMarkers(newMarkers);
                            }
                        }
                    ]
                );
            }}
          />
        ))}
      </MapView>
      <MapHamburger changeMapType={changeMapType} goToHomePoint={goToHomePoint} goBackToCoordinates={goBackToCoordinates} />

      <View style={styles.inputContainer}>
        <TextInput
          value={markerName}
          onChangeText={setMarkerName}
          placeholder="Enter seen Digimon"
          style={styles.input}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
  },
  input: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default DigiMap;
