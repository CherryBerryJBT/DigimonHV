import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { verifyPermissions, takeImageHandler } from "../Components/cameraUtil";

function ProfileCamera(props) {
    const [profileImage, setProfileImage] = useState(null);

    const handleProfileImagePicking = async () => {
        const imageUri = await takeImageHandler();
        console.log(imageUri)
        if (imageUri) {
            setProfileImage(imageUri);
            console.log(profileImage)
            props.onProfileImageTaken && props.onProfileImageTaken(imageUri);
        }
    };

    return (
        <View style={styles.imagePicker}>
            <View style={styles.imagePreview}>
                {!profileImage ? (
                    <Text>No profile image selected</Text>
                ) : (
                    <Image resizeMode="cover" style={styles.image} source={{ uri: profileImage }} />
                )}
            </View>
            <Button title="Edit Profile Picture" color="#ffa500" onPress={handleProfileImagePicking} />
        </View>
    );
}

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center',
        marginBottom: 20,
    },
    imagePreview: {
        width: '100%',
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
});

export default ProfileCamera;
