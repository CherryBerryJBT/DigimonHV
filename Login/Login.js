import {
    KeyboardAvoidingView,
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    ImageBackground,
    Dimensions,
    Platform,
    Keyboard
} from "react-native";
import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "./firebase";
import firebase from 'firebase/app';
import 'firebase/auth';
import { useNavigation } from "@react-navigation/native";
import { sendEmailVerification } from "firebase/auth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;
    const navigation = useNavigation();

    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert("Successfully logged in.");
            navigation.navigate("Digivice");
        } catch (error) {
            console.log(error);
            alert("Sign in failed: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const signUp = async () => {
        setLoading(true);
        try {
            // Create the user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
    
            // Send email verification to the user
            await sendEmailVerification(user);
    
            console.log("Verification email sent.");
            alert("Registration successful! Please verify your email address.");
            
            // await signOut(auth);
        } catch (error) {
            console.log(error);
            alert("Sign up failed: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                console.log('Keyboard is shown');
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                console.log('Keyboard is hidden');
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    return (
        <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjust behavior depending on the platform
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20} // Optional: adjust the offset based on your view setup
        >
            <ImageBackground 
                source={require("../assets/DigimonLandscape.png")}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
            <View style={styles.headerContainer}>
                {/* Place Logo here */}
                <Image 
                    style={styles.logo}
                    source={require("../assets/DigimonLogo.png")}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    placeholderTextColor="#adb4bc"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#adb4bc"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>
            {loading ? (
                <ActivityIndicator size="large" color="#5A67F2" /> 
            ) : (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={signIn} style={[styles.button, styles.buttonOutline]}>
                        <Text style={styles.buttonOutlineText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={signUp} style={[styles.button, styles.buttonOutline]}>
                        <Text style={styles.buttonOutlineText}>SignUp</Text>
                    </TouchableOpacity>
                </View>
            )}
            </ImageBackground>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    backgroundImage: {
        flex: 1,
        width: '100%', 
        height: '100%', 
        justifyContent: "center", 
        alignItems: "center",
    },
    headerContainer: {
        alignItems: 'center',
        marginTop: 60,  
        marginBottom: 30,  
    },
    logo: {
        width: 350,  
        height: 100,  
        marginTop: -160,
    },
    headerText: {
        fontSize: 26,
        fontWeight: '700',
        color: '#333',  
        marginTop: -10,
    },
    inputContainer: {
        paddingHorizontal: 35,
    },
    input: {
        height: 50,  
        backgroundColor: '#fff',  
        marginBottom: 20,  
        paddingHorizontal: 60,  
        borderRadius: 25,  
        borderWidth: 1,  
        borderColor: '#ddd',  
        fontSize: 16,  
    },
    buttonContainer: {
        width: '60%', 
        paddingHorizontal: 15, 
        alignItems: 'center', 
    },
    button: {
        width: '90%', 
        backgroundColor: "#2980b9", 
        paddingVertical: 15, 
        paddingHorizontal: 10, 
        borderRadius: 5,
        marginBottom: 10, 
        alignItems: 'center', 
    },
    buttonText: {
        color: "#FFF", 
        fontWeight: "700", 
        fontSize: 16, 
        textAlign: 'center', 
    },
    buttonOutline: {
        backgroundColor: 'transparent',  
        borderColor: '#5A67F2',  
        borderWidth: 1,  
    },
    buttonOutlineText: {
        color: '#5A67F2', 
    },
});

export default Login;
