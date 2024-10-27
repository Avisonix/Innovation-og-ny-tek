import React, { useEffect, useState } from 'react'; 
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, child } from "firebase/database"; // Import necessary functions
import firebaseConfig from '../firebaseConfig'; // Adjust the path to your Firebase config
import GlobalStyles from '../globalStyles';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app); // Initialize the database

export default function HomeScreen() {
  const [discountData, setDiscountData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset error message before fetching
      try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, 'discounts')); // Assuming 'discounts' is your data path

        if (snapshot.exists()) {
          const data = snapshot.val();
          const mappedData = Object.keys(data).map((key) => ({
            id: key,
            title: data[key].description,
            icon: require('../assets/icon.png'), // Replace with your actual icon path
          }));
          setDiscountData(mappedData);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load discounts. Please try again later.");
        Alert.alert("Error", "Failed to load discounts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={GlobalStyles.card}>
      <View style={GlobalStyles.iconContainer}>
        <Image source={item.icon} style={GlobalStyles.icon} />
      </View>
      <Text style={GlobalStyles.cardText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.headerText}>Oversigt</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : error ? (
        <Text style={GlobalStyles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={discountData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={GlobalStyles.grid}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
