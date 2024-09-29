import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

// Importer dine skærme
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import SettingsScreen from './screens/SettingsScreen';

// Opret en Bottom Tab Navigator
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false, // Skjuler tekstlabel
          tabBarStyle: { height: 60, paddingBottom: 10 }, // Tilpasning af tab-bar
        }}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('./assets/25694.png')} // Udskift med din home-ikon
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
                source={require('./assets/search-icon.png')} // Udskift med din search-ikon
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
                source={require('./assets/settings-icon.png')} // Udskift med din settings-ikon
                style={{ width: 30, height: 30, tintColor: focused ? '#007AFF' : '#8e8e93' }}
              />  
            ),
          }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}