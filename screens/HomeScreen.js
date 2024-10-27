// HomeScreen.js
import React, { useEffect, useState } from 'react'; 
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { ref, get, child } from "firebase/database";
import { useNavigation } from '@react-navigation/native';
import { database } from '../firebaseConfig';
import GlobalStyles from '../globalStyles';

export default function HomeScreen() {
  const [discountData, setDiscountData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, 'discounts'));

        if (snapshot.exists()) {
          const data = snapshot.val();
          const mappedData = Object.keys(data).map((key) => ({
            id: key,
            title: data[key].description, // Use description as title
            icon: require('../assets/icon.png'), // Path to your icon
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
    <TouchableOpacity 
      style={GlobalStyles.card} 
      onPress={() => navigation.navigate("DiscountDetail", { discountId: item.id })} // Pass only the discountId
    >
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
