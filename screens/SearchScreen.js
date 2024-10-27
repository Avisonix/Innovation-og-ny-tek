import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { getDatabase, ref, query, orderByChild, equalTo, get } from "firebase/database"; // Import Firebase database functions
import GlobalStyles from '../globalStyles';
import { database } from '../firebaseConfig'; // Import initialized Firebase database

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Function to fetch discounts based on provider
  const fetchDiscounts = async (provider) => {
    try {
      const discountsRef = ref(database, 'discounts'); // Reference to discounts in the database
      const providerQuery = query(discountsRef, orderByChild('provider'), equalTo(provider)); // Query to filter by provider
      const snapshot = await get(providerQuery);

      if (snapshot.exists()) {
        const data = snapshot.val();
        const results = Object.keys(data).map(key => ({
          id: key,
          title: data[key].description,
          details: data[key].details,
        }));
        setSearchResults(results);
      } else {
        setSearchResults([]);
        Alert.alert("No results found", `No discounts found for provider: ${provider}`);
      }
    } catch (error) {
      console.error("Error fetching discounts:", error);
      Alert.alert("Error", "Failed to fetch discounts. Please try again.");
    }
  };

  return (
    <ScrollView style={GlobalStyles.container}>
      {/* Search Bar */}
      <View style={GlobalStyles.searchBarContainer}>
        <TextInput
          style={GlobalStyles.searchBar}
          placeholder="Search for discounts..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>

      {/* Recent Searches */}
      <View style={GlobalStyles.recentSearchesContainer}>
        <Text style={GlobalStyles.sectionTitle}>Recent Searches</Text>
        <View style={GlobalStyles.recentSearchButtons}>
          <TouchableOpacity style={GlobalStyles.chip} onPress={() => fetchDiscounts("CreditCard")}>
            <Text style={GlobalStyles.chipText}>Credit Card Offers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={GlobalStyles.chip} onPress={() => fetchDiscounts("Workplace")}>
            <Text style={GlobalStyles.chipText}>Workplace Discounts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={GlobalStyles.chip} onPress={() => fetchDiscounts("Profile")}>
            <Text style={GlobalStyles.chipText}>Profile Updates</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Results */}
      <View style={GlobalStyles.searchResultsContainer}>
        <Text style={GlobalStyles.sectionTitle}>Search Results</Text>
        {searchResults.length > 0 ? (
          searchResults.map((result) => (
            <View key={result.id} style={GlobalStyles.resultCard}>
              <Text style={GlobalStyles.resultTitle}>{result.title}</Text>
              <Text style={GlobalStyles.resultDescription}>{result.details}</Text>
            </View>
          ))
        ) : (
          <Text style={GlobalStyles.resultDescription}>No results found</Text>
        )}
      </View>
    </ScrollView>
  );
}
