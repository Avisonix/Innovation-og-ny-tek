import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import firebaseConfig from './firebaseConfig'; // Import your Firebase config

// Import your screens
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import SettingsScreen from './screens/SettingsScreen';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app); // Initialize the database

// Create a Bottom Tab Navigator
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false, // Hide text labels
          tabBarStyle: { height: 60, paddingBottom: 10 }, // Customize tab bar
        }}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('./assets/25694.png')} // Replace with your home icon
                style={{ width: 30, height: 30, tintColor: focused ? '#007AFF' : '#8e8e93' }}
              />
            ),
          }} 
        />
        <Tab.Screen 
          name="Search" 
          component={SearchScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('./assets/search-icon.png')} // Replace with your search icon
                style={{ width: 30, height: 30, tintColor: focused ? '#007AFF' : '#8e8e93' }}
              />
            ),
          }} 
        />
        <Tab.Screen 
          name="Settings" 
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('./assets/settings-icon.png')} // Replace with your settings icon
                style={{ width: 30, height: 30, tintColor: focused ? '#007AFF' : '#8e8e93' }}
              />  
            ),
          }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
