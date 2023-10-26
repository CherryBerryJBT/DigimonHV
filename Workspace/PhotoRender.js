import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Camera from '../Components/camera'; 
import Photos from '../Components/photos';

const PhotoRender = () => {
    const [photos, setPhotos] = useState([]);

    const handleNewPhoto = (newPhotoUri) => {
        const newPhoto = { id: Math.random().toString(), uri: newPhotoUri };
        setPhotos((currentPhotos) => [...currentPhotos, newPhoto]);
    };

    return (
        <View style={{ flex: 1 }}>
            {/* Pass the handleNewPhoto function directly */}
            <Camera onPhotoTaken={handleNewPhoto} />
            <Photos photos={photos} />
        </View>
    );
}

export default PhotoRender;
