import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet } from 'react-native';

import DigiviceScreen from './screens/Digivice';
import DigiDexScreen from "./screens/DigiDex";
import DigiMapScreen from './screens/DigiMap';
import Login from './Login/Login';
import Digivice from "./screens/Digivice"


import { FIREBASE_AUTH, FIRESTORE_DB } from './Login/firebase';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();


export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = FIREBASE_AUTH.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });

    return unsubscribe;
  }, []);

  // Main app screens within the Tab navigator
  const MainAppScreens = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Digivice') {
              iconName = focused ? 'artstation' : 'artstation';
            } else if (route.name === 'DigiDex') {
              iconName = focused ? 'spa' : 'spa';
            } else if (route.name === 'DigiMap') {
              iconName = focused ? 'magnify' : 'magnify';
            }
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
        })}
        activeColor="#00CED1"
        inactiveColor="#FFD700"
        barStyle={{ backgroundColor: '#F8F8FF' }}
      >
        <Tab.Screen name="Digivice" component={DigiviceScreen} />
        <Tab.Screen name="DigiDex" component={DigiDexScreen} />
        <Tab.Screen name="DigiMap" component={DigiMapScreen} />
      </Tab.Navigator>
    );
  };

  // Conditional rendering of screens based on authentication state
  return (
    <NavigationContainer>
      {isAuthenticated ? (
        // User is signed in, show the main app
        <MainAppScreens />
      ) : (
        // User is NOT signed in, show login screen
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Digivice" component={Digivice} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
