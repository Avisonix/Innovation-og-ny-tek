import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, FlatList, Image } from 'react-native';
import { getDatabase, ref, query, orderByChild, equalTo, get } from "firebase/database";
import GlobalStyles from '../globalStyles';
import { database } from '../firebaseConfig';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState(''); // For brand search
  const [filterType, setFilterType] = useState(''); // For type filtering
  const [discountAmount, setDiscountAmount] = useState(''); // For discount amount filtering
  const [searchResults, setSearchResults] = useState([]);

  // Function to fetch discounts based on criteria
  const fetchDiscounts = async () => {
    try {
      const discountsRef = ref(database, 'discounts');
      let filteredQuery = discountsRef;

      // Determine the search criteria
      if (searchQuery) {
        filteredQuery = query(discountsRef, orderByChild('brand'), equalTo(searchQuery));
      } else if (filterType) {
        filteredQuery = query(discountsRef, orderByChild('type'), equalTo(filterType));
      } else if (discountAmount) {
        filteredQuery = query(discountsRef, orderByChild('discount_amount'), equalTo(Number(discountAmount)));
      } else {
        Alert.alert('Error', 'Please enter at least one search criteria.');
        return;
      }

      const snapshot = await get(filteredQuery);

      if (snapshot.exists()) {
        const data = snapshot.val();
        const results = Object.keys(data).map(key => ({
          id: key,
          ...data[key], // Spread the data fields (brand, description, etc.)
        }));
        setSearchResults(results);
      } else {
        setSearchResults([]);
        Alert.alert("No results found", "No discounts match your criteria.");
      }
    } catch (error) {
      console.error("Error fetching discounts:", error);
      Alert.alert("Error", "Failed to fetch discounts. Please try again.");
    }
  };

  const renderDiscount = ({ item }) => (
    <View style={GlobalStyles.resultCard}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={{ uri: item.logo }} style={GlobalStyles.smallLogo} />
        <Text style={GlobalStyles.resultTitle}>{item.description}</Text>
      </View>
      <Text style={GlobalStyles.resultDescription}>Brand: {item.brand}</Text>
      <Text style={GlobalStyles.resultDescription}>Type: {item.type}</Text>
      <Text style={GlobalStyles.resultDescription}>Discount: {item.discount_amount}%</Text>
      <Text style={GlobalStyles.resultDescription}>{item.conditions}</Text>
    </View>
  );

  return (
    <ScrollView style={GlobalStyles.container}>
      {/* Search by Brand */}
      <View style={GlobalStyles.searchBarContainer}>
        <TextInput
          style={GlobalStyles.searchBar}
          placeholder="Search by brand (e.g., Netflix)..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>

      {/* Filter by Type */}
      <View style={GlobalStyles.searchBarContainer}>
        <TextInput
          style={GlobalStyles.searchBar}
          placeholder="Filter by type (e.g., health, electronics)..."
          value={filterType}
          onChangeText={(text) => setFilterType(text)}
        />
      </View>

      {/* Filter by Discount Amount */}
      <View style={GlobalStyles.searchBarContainer}>
        <TextInput
          style={GlobalStyles.searchBar}
          placeholder="Filter by discount amount (e.g., 10, 25)..."
          value={discountAmount}
          keyboardType="numeric"
          onChangeText={(text) => setDiscountAmount(text)}
        />
      </View>

      {/* Search Button */}
      <TouchableOpacity style={GlobalStyles.saveButton} onPress={fetchDiscounts}>
        <Text style={GlobalStyles.saveButtonText}>Search</Text>
      </TouchableOpacity>

      {/* Search Results */}
      <View style={GlobalStyles.searchResultsContainer}>
        <Text style={GlobalStyles.sectionTitle}>Search Results</Text>
        {searchResults.length > 0 ? (
          <FlatList
            data={searchResults}
            renderItem={renderDiscount}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <Text style={GlobalStyles.resultDescription}>No results found</Text>
        )}
      </View>
    </ScrollView>
  );
}
// Error fetching discounts: Error: Index not defined, add ".indexOn": "brand", for path "/discounts", to the rules
// at C:\Users\nicol\OneDrive\Desktop\Projekt Prototype CHI\Innovation-og-ny-tek\node_modules\@firebase\database\dist\index.esm2017.js:11058:31
// at async fetchDiscounts (C:\Users\nicol\OneDrive\Desktop\Projekt Prototype CHI\Innovation-og-ny-tek\screens\SearchScreen.js:31:24)