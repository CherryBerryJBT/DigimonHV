import React, { useState, useRef, useEffect } from 'react'; // Import useRef and useEffect
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { verifyPermissions, takeImageHandler } from "../Components/cameraUtil";
import Photos from './photos';


function Camera(props) {;
    const [pickedImage, setPickedImage] = useState(null);
    const photosRef = useRef();

    const handleImagePicking = async () => {
      const imageUri = await takeImageHandler();
        if (imageUri) {
            setPickedImage(imageUri);
            console.log('Adding photo:', imageUri);
            photosRef.current?.addPhoto(imageUri);
        }
    };

    return (
        <View style={styles.container}>
        <View style={styles.screen}>
            <Text style={styles.title}>DigiCam</Text>
        <View style={styles.imagePicker}>
            <View style={styles.imagePreview}>
                {!pickedImage ? (
                    <Text>save the moment</Text>
                ) : (
                    <Image resizeMode="cover" style={styles.image} source={{ uri: pickedImage }} />
                )}
            </View>
            <Button title="Click" color="#ffa500" onPress={handleImagePicking} />
        </View>
        {photosRef.current}
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        width: 250,
    },
    imagePicker: {
        alignItems: 'center',
        marginBottom: 20,
    },
    imagePreview: {
        width: 250,
        height: 200,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        overflow: 'hidden',
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#663399', 
      },
});

export default Camera;
