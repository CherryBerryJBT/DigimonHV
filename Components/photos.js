import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { styles } from '../Style/Stylesheet';
import { getStorage, ref, listAll, getDownloadURL, deleteObject } from "firebase/storage";

const Photos = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const imageRefs = [];
      const storage = getStorage();
      const imagesFolderRef = ref(storage, 'gs://jbtdevelopementprojectsum200.appspot.com'); 

      const imageFolderContents = await listAll(imagesFolderRef);

      for (const itemRef of imageFolderContents.items) {
        const downloadUrl = await getDownloadURL(itemRef);
        imageRefs.push({ uri: downloadUrl, id: itemRef.name }); 
      }

      setPhotos(imageRefs);
    } catch (error) {
      console.error("Error fetching images: ", error);
    }
  };

  const handleDelete = async (imageId) => {
    try {
      const storage = getStorage();
      const imageRef = ref(storage, `gs://jbtdevelopementprojectsum200.appspot.com/${imageId}`);

      await deleteObject(imageRef);

      fetchImages();
    } catch (error) {
      console.error("Error deleting image: ", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Image source={{ uri: item.uri }} style={styles.image} />
      <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
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
};

export default Photos;
