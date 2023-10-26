import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { pickImageHandler, takeNewPhoto } from "../Components/cameraUtil";

function Camera({ onPhotoTaken }) {
    const [pickedImage, setPickedImage] = useState(null);

    const handleImagePicking = async () => {
        try {
            const imageUri = await pickImageHandler();
            if (imageUri) {
                setPickedImage(imageUri);
                onPhotoTaken(imageUri);
            }
        } catch (error) {  
            console.error('An error occurred while picking the image:', error);
        
        }
    };
    
const handleNewPhoto = async () => {
    try {
        console.log("Attempting to take a new photo...");
        const imageUri = await takeNewPhoto();
        if (imageUri) {
            console.log("New photo taken:", imageUri);
            setPickedImage(imageUri);
            console.log("onPhotoTaken function type:", typeof onPhotoTaken); 
            onPhotoTaken(imageUri);
        }
    } catch (error) {
        console.error('An error occurred while taking a new photo:', error);
    }
};

    return (
        <View style={styles.container}>
            <Text style={styles.title}>DigiCam</Text>
            <View style={styles.imagePicker}>
                <View style={styles.imagePreview}>
                    {!pickedImage ? (
                        <Text>save the moment</Text>
                    ) : (
                        <Image style={styles.image} source={{ uri: pickedImage }} />
                    )}
                </View>
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title="Pick Image" color="#ffa500" onPress={handleImagePicking} />
                    </View>
                    <View style={styles.button}>
                        <Button title="Take Photo" color="#4CAF50" onPress={handleNewPhoto} />
                    </View>
                </View>
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%',
    },
    button: {
        margin: 10,
    },
});

export default Camera;
