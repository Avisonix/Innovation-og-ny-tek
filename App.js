// App.js
import React, { useState, useEffect } from 'react';
import { Platform, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import DiscountDetailScreen from './screens/DiscountDetailScreen';
import BrandDetailScreen from './screens/BrandDetailSceen';
import NewDiscountsScreen from './screens/NewDiscountsSceen';
import SearchScreen from './screens/SearchScreen';
import SettingsScreen from './screens/SettingsScreen';
import MapScreen from './screens/MapScreen';
import AuthScreen from './screens/AuthScreen'; // Tilføjet AuthScreen import
import { auth } from './firebaseConfig'; // Importer auth fra firebaseConfig
import GlobalStyles from './globalStyles';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DiscountDetail"
        component={DiscountDetailScreen}
        options={{ title: 'Discount Details' }}
      />
      <Stack.Screen
        name="BrandDetail"
        component={BrandDetailScreen}
        options={{ title: 'Brand Details' }}
      />
      <Stack.Screen
        name="NewDiscounts"
        component={NewDiscountsScreen}
        options={{ title: 'Nye Rabatter' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsLoggedIn(!!user);
    });
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator
          screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: GlobalStyles.tabBarStyle,
          }}
        >
          <Tab.Screen
            name="HomeTab"
            component={HomeStack}
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
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
