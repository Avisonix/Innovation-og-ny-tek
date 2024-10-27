// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import GlobalStyles from './globalStyles';

// Import your screens
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import SettingsScreen from './screens/SettingsScreen';
import DiscountDetailScreen from './screens/DiscountDetailScreen'; // Import the new screen

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack navigator for Home to include DiscountDetailScreen
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ headerShown: false }} // Hide the header for HomeScreen
      />
      <Stack.Screen 
        name="DiscountDetail" 
        component={DiscountDetailScreen} 
        options={{ title: 'Discount Details' }} // Show header only for DiscountDetailScreen
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: GlobalStyles.tabBarStyle,
        }}
      >
        <Tab.Screen 
          name="HomeTab" 
          component={HomeStack} // Use HomeStack here instead of HomeScreen directly
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('./assets/25694.png')}
                style={[GlobalStyles.iconStyle, { tintColor: focused ? '#007AFF' : '#8e8e93' }]}
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
                source={require('./assets/search-icon.png')}
                style={[GlobalStyles.iconStyle, { tintColor: focused ? '#007AFF' : '#8e8e93' }]}
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
                source={require('./assets/settings-icon.png')}
                style={[GlobalStyles.iconStyle, { tintColor: focused ? '#007AFF' : '#8e8e93' }]}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
