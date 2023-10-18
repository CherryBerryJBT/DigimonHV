import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../Style/Stylesheet';

const Photos = forwardRef((props, ref) => {
  const [photos, setPhotos] = useState([]);
  useImperativeHandle(ref, () => ({
    addPhoto,
  }));

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const storedPhotos = await AsyncStorage.getItem('photos');
        if (storedPhotos) {
            console.log('Loaded photos:', storedPhotos);
          setPhotos(JSON.parse(storedPhotos));
        }
      } catch (error) {
        console.error('Failed to load photos.', error);
      }
    };

    loadPhotos();
  }, []);

  const savePhotos = async (newPhotos) => {
    try {
      await AsyncStorage.setItem('photos', JSON.stringify(newPhotos));
      console.log('Photos saved:', newPhotos);
    } catch (error) {
        console.error('Failed to save photos.', error);
    }
  };

  const addPhoto = (photoUri) => {
    const newPhotos = [...photos, { id: Math.random().toString(), uri: photoUri }];
    savePhotos(newPhotos);
    setPhotos(newPhotos);
  };

  const deletePhoto = (photoId) => {
    const newPhotos = photos.filter(photo => photo.id !== photoId);
    console.log('Adding to state:', newPhotos);
    savePhotos(newPhotos);
    setPhotos(newPhotos);
  };

  // Expose the addPhoto method to parent components
  React.useImperativeHandle(ref, () => ({
    addPhoto,
  }));

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Image source={{ uri: item.uri }} style={styles.image} />
      <TouchableOpacity onPress={() => deletePhoto(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>DigiAlbum</Text>
      <FlatList
        data={photos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.listContainer}
      />
    </View>
  );
});

export default Photos;
