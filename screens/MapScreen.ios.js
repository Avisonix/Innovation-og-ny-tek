// MapScreen.ios.js
import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { ref, get, child } from "firebase/database";
import { database } from '../firebaseConfig'; // Import your initialized Firebase database
import GlobalStyles from '../globalStyles';

export default function MapScreen() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [discountLocations, setDiscountLocations] = useState([]);

  // Fetch user's current location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    })();
  }, []);

  // Fetch discount locations from Firebase
  useEffect(() => {
    const fetchDiscountLocations = async () => {
      try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, 'discounts')); // Path to your discounts in Firebase
        if (snapshot.exists()) {
          const data = snapshot.val();
          const locations = Object.keys(data).map(key => ({
            id: key,
            title: data[key].description,
            latitude: data[key].latitude,
            longitude: data[key].longitude,
          }));
          setDiscountLocations(locations);
        } else {
          console.log("No discount data available");
        }
      } catch (error) {
        console.error("Error fetching discount locations:", error);
      }
    };

    fetchDiscountLocations();
  }, []);

  if (!currentLocation) {
    return <Text style={GlobalStyles.errorText}>Loading your location...</Text>;
  }

  return (
    <View style={GlobalStyles.container}>
      <MapView
        style={{ flex: 1 }}
        region={currentLocation}
        showsUserLocation={true}
        loadingEnabled={true}
      >
        {discountLocations.map(location => (
          <Marker
            key={location.id}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={location.title}
            description="Discount available here!"
          />
        ))}
      </MapView>
    </View>
  );
}
