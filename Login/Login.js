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
    
            // Optionally, you can sign out the user until they verify their email
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
                // Here you can add additional logic when the keyboard is shown
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                console.log('Keyboard is hidden');
                // Here you can add additional logic when the keyboard is hidden
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
                resizeMode="cover" // This ensures your image covers the whole area
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
                    placeholderTextColor="#adb4bc"  // making placeholder text lighter
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#adb4bc"  // making placeholder text lighter
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>
            {loading ? (
                <ActivityIndicator size="large" color="#5A67F2" />  // using a custom color for the loader
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
        flex: 1, // This will make sure the image covers the whole screen area
        width: '100%', // Full width
        height: '100%', // Full height
        justifyContent: "center", // Align children components to the center
        alignItems: "center",
    },
    headerContainer: {
        alignItems: 'center',
        marginTop: 60,  // space for the header
        marginBottom: 30,  // space between header and inputs
    },
    logo: {
        width: 350,  // or your desired logo size
        height: 100,  // or your desired logo size
        marginTop: -160,
    },
    headerText: {
        fontSize: 26,
        fontWeight: '700',
        color: '#333',  // dark text color for the header
        marginTop: -10,
    },
    inputContainer: {
        paddingHorizontal: 35,  // more horizontal padding for the inputs
    },
    input: {
        height: 50,  // taller inputs
        backgroundColor: '#fff',  // white background for the inputs
        marginBottom: 20,  // space between inputs
        paddingHorizontal: 60,  // inner horizontal padding
        borderRadius: 25,  // rounded borders
        borderWidth: 1,  // define border
        borderColor: '#ddd',  // light border color
        fontSize: 16,  // slightly larger font size
    },
    buttonContainer: {
        width: '60%', // makes the container take the full width available
        paddingHorizontal: 15, // you might want to keep some padding around the buttons
        alignItems: 'center', // to align the buttons to the center
    },
    button: {
        width: '90%', // makes the button take up 90% of the container width, you can adjust as you prefer
        backgroundColor: "#2980b9", // your choice of color
        paddingVertical: 15, // padding inside the button, increases height
        paddingHorizontal: 10, // padding on the sides of the text inside, increases width
        borderRadius: 5, // if you want rounded corners
        marginBottom: 10, // space between this button and the next item (if you have one below)
        alignItems: 'center', // makes sure the text inside the button is centered
    },
    buttonText: {
        color: "#FFF", // text color, usually contrasting the button color
        fontWeight: "700", // makes text bold
        fontSize: 16, // or another size to make the text bigger or smaller
        textAlign: 'center', // centers the text, useful if the button is wider than the text
    },
    buttonOutline: {
        backgroundColor: 'transparent',  // no background color
        borderColor: '#5A67F2',  // border matching the other button
        borderWidth: 1,  // thicker border
    },
    buttonOutlineText: {
        color: '#5A67F2',  // text color matching the border
    },
});

export default Login;
