import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import GlobalStyles from '../globalStyles';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');

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
          <TouchableOpacity style={GlobalStyles.chip}>
            <Text style={GlobalStyles.chipText}>Credit Card Offers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={GlobalStyles.chip}>
            <Text style={GlobalStyles.chipText}>Workplace Discounts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={GlobalStyles.chip}>
            <Text style={GlobalStyles.chipText}>Profile Updates</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Results */}
      <View style={GlobalStyles.searchResultsContainer}>
        <Text style={GlobalStyles.sectionTitle}>Search Results</Text>
        {/* Sample Search Results */}
        <View style={GlobalStyles.resultCard}>
          <Text style={GlobalStyles.resultTitle}>Discount on Electronics</Text>
          <Text style={GlobalStyles.resultDescription}>
            Get up to 20% off on electronics at participating stores.
          </Text>
        </View>
        <View style={GlobalStyles.resultCard}>
          <Text style={GlobalStyles.resultTitle}>Clothing Discounts</Text>
          <Text style={GlobalStyles.resultDescription}>
            Exclusive offers on clothing brands for members.
          </Text>
        </View>
        <View style={GlobalStyles.resultCard}>
          <Text style={GlobalStyles.resultTitle}>Travel Deals</Text>
          <Text style={GlobalStyles.resultDescription}>
            Special discounts on travel packages for work and leisure.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
