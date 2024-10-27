// App.js
import React from 'react';
import { Platform, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import DiscountDetailScreen from './screens/DiscountDetailScreen'; // Import DiscountDetailScreen
import SearchScreen from './screens/SearchScreen';
import SettingsScreen from './screens/SettingsScreen';
import MapScreen from './screens/MapScreen';
import GlobalStyles from './globalStyles';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Define HomeStack with HomeScreen and DiscountDetailScreen
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ headerShown: false }} // Hide header for HomeScreen
      />
      <Stack.Screen 
        name="DiscountDetail" 
        component={DiscountDetailScreen} 
        options={{ title: 'Discount Details' }} // Header title for DiscountDetailScreen
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
          component={HomeStack} // Use HomeStack instead of HomeScreen
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('./assets/home-icon.png')}
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
          name="Map"
          component={MapScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('./assets/map-icon.png')}
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
