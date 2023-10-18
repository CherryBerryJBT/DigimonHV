import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from "@expo/vector-icons";
import { FIREBASE_AUTH } from "./firebase"; // Assuming the path is correct
import { useNavigation } from "@react-navigation/native";
import { verifyPermissions, takeImageHandler } from "../Components/cameraUtil"; // Assuming the path is correct

function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [profileImage, setProfileImage] = useState(require('../assets/dragonballZ.jpg')); // Placeholder image
    const auth = FIREBASE_AUTH;
    const navigation = useNavigation();

    const handleChangePassword = () => {
        // Logic for password change
        console.log('Password change logic goes here.');
    };
    

    // Player's initial information
    const [name, setName] = useState("Kai Takashi");
    const [age, setAge] = useState("28");
    const [hometown, setHometown] = useState("Digital City");
    const [favoriteDigimon, setFavoriteDigimon] = useState("Agumon");
    const [trainerLevel, setTrainerLevel] = useState("Elite");
    const [team, setTeam] = useState("DigiDestined");
    const [achievements, setAchievements] = useState("Saved the Digital World thrice, Champion of the Digi-Tournament");
    const [Bio, setBio] = useState("Kai, a passionate Digimon trainer, started his journey at the age of 10.With his partner Agumon, he has faced numerous challenges and emerged victorious. He's known for his strategic battle techniques and his deep bond with his Digimon.");

    useEffect(() => {
        const loadProfileImage = async () => {
            const savedImageUri = await AsyncStorage.getItem('profileImageUri');
            if (savedImageUri) {
                setProfileImage({ uri: savedImageUri });
            }
        };

        loadProfileImage();
    }, []);

    const handleProfileImagePicking = async () => {
        const imageUri = await takeImageHandler();
        if (imageUri) {
            setProfileImage({ uri: imageUri });
            await AsyncStorage.setItem('profileImageUri', imageUri);
        }
    };

    const handleEditUser = () => {
        navigation.navigate("EditUser");
    };

    const handleEditProfile = () => {
        setIsEditing(true);
    };

    const handleSaveChanges = () => {
        setIsEditing(false);
        // Here, you might want to update the playerInfo state to a server or local storage
    };

    return (
        //{/* Profile Image Section*/}
        <ScrollView style={styles.container}>
            <View style={styles.profileImageSection}>
                <Image source={profileImage} style={styles.profileImage} />
                <Button title="Take Profile Picture" color="#ffa500" onPress={handleProfileImagePicking} />
           </View> 

           {/* Displaying the user's email */}
    <View style={styles.userDetailRow}>
        <Text style={styles.userDetailLabel}>Email: </Text>
        <Text style={styles.userEmail}>{auth.currentUser.email}</Text>
    </View>
    <TouchableOpacity onPress={handleEditUser} style={styles.editButton}>
       <Feather name="edit" size={24} color="black" />
    </TouchableOpacity>

           {/* User Information Section */}   
           <View style={styles.userInfoSection}>    
            <Text style={styles.userNameBold}>{auth.currentUser.displayName}</Text>



                <Text style={styles.userPassword}>{auth.currentUser.password}</Text>
                <TouchableOpacity onPress={handleChangePassword} style={styles.editButton}>
                    <Feather name="edit" size={24} color="black" />
                </TouchableOpacity>

                <View style={styles.space} />

                
            </View>
            <View style={styles.playerInfo}>
                {/* The rest of the player's information display/edit goes here */}
                {/* ... */}
                <Text style={styles.title}>Name</Text>
            {isEditing ? <TextInput style={styles.input} value={name} onChangeText={setName} /> : <Text style={styles.detail}>{name}</Text>}
            
            <Text style={styles.title}>Age</Text>
            {isEditing ? <TextInput style={styles.input} value={age} onChangeText={setAge} /> : <Text style={styles.detail}>{age}</Text>}
            
            <Text style={styles.title}>Hometown</Text>
            {isEditing ? <TextInput style={styles.input} value={hometown} onChangeText={setHometown} /> : <Text style={styles.detail}>{hometown}</Text>}
            
            <Text style={styles.title}>Favorite Digimon</Text>
            {isEditing ? <TextInput style={styles.input} value={favoriteDigimon} onChangeText={setFavoriteDigimon} /> : <Text style={styles.detail}>{favoriteDigimon}</Text>}
            
            <Text style={styles.title}>Trainer Level</Text>
            {isEditing ? <TextInput style={styles.input} value={trainerLevel} onChangeText={setTrainerLevel} /> : <Text style={styles.detail}>{trainerLevel}</Text>}
            
            <Text style={styles.title}>Team</Text>
            {isEditing ? <TextInput style={styles.input} value={team} onChangeText={setTeam} /> : <Text style={styles.detail}>{team}</Text>}
            
            <Text style={styles.title}>Achievements</Text>
            {isEditing ? <TextInput style={styles.input} value={achievements} onChangeText={setAchievements} /> : <Text style={styles.detail}>{achievements}</Text>}
            
            <Text style={styles.title}>Bio</Text>
            {isEditing ? <TextInput style={styles.input} value={Bio} onChangeText={setBio} /> : <Text style={styles.detail}>{Bio}</Text>}
            
                <View style={styles.buttonContainer}>
                    {isEditing ? (
                        <Button title="Save" color="#ffa500" onPress={handleSaveChanges} />
                    ) : (
                        <Button title="Edit Profile" color="#ffa500" onPress={handleEditProfile} />
                    )}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    // ... your existing styles
    profileHeader: {
        // styles for the profile header section
    },
    userName: {
        // styles for the user's name text
    },
    userEmail: {
        // styles for the user's email text
    },
    editButton: {
        // styles for the edit profile button
    },
    playerInfo: {
        // styles for the player information section
    },
    // ... other styles you may need
    profileImageSection: {
        // your styles for the profile image section
    },
    userDetailRow: {
        flexDirection: 'row', // aligns the label and info in one line
        alignItems: 'center', // if you want to vertically center them
        marginVertical: 5, // space between each detail row
    },
    userDetailLabel: {
        fontWeight: 'bold', // makes the label bold
        marginRight: 10, // space between label and info
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 75,
        marginBottom: 50,
        alignSelf: 'center'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    detail: {
        fontSize: 16,
        marginBottom: 20
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 1,
        marginBottom: 20,
        width: '75%',
        //alignSelf: "left"
    },
    buttonContainer: {
        flexDirection: 'row',  
        justifyContent: 'space-between',  
        marginTop: 20,  
        marginBottom: 20 
    },
    userInfoSection: {
        // your styles for the user info section
    },
    userNameBold: {
        fontWeight: 'bold', // making the username text bold
        // ... other styles
    },
    space: {
        marginVertical: 15, // space between sections, adjust as needed
    },
    // ... other styles you may need
});


export default Profile;
