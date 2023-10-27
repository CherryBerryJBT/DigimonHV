import React, {useState, useContext}from "react";
import { View, Text, Button, Styles, Switch, Modal, Platform, StyleSheet, Image, TouchableOpacity } from "react-native";
import { FIREBASE_AUTH } from "./firebase";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

const Settings = ({ onClose }) => { 
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Settings</Text>
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text>Date: {new Date().toLocaleDateString()}</Text>
                <Text>App Version: 6.3.4</Text>

                <View style={styles.spacer} />
                {/* FIREBASE_AUTH has a method named signOut for signing out the user. */}
                <Button title="Sign Out" color="#ff4500" onPress={() => FIREBASE_AUTH.signOut()} />
                <View style={{ marginTop: 20 }}>
                </View>
            </View>
        </View>
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "white",
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#663399', 
      },
    spacer: {
        height: 40,
    },
});

export default Settings;