import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ScrollView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search for discounts..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>

      {/* Recent Searches */}
      <View style={styles.recentSearchesContainer}>
        <Text style={styles.sectionTitle}>Recent Searches</Text>
        <View style={styles.recentSearchButtons}>
          <TouchableOpacity style={styles.chip}>
            <Text style={styles.chipText}>Credit Card Offers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chip}>
            <Text style={styles.chipText}>Workplace Discounts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chip}>
            <Text style={styles.chipText}>Profile Updates</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Results */}
      <View style={styles.searchResultsContainer}>
        <Text style={styles.sectionTitle}>Search Results</Text>
        {/* Sample Search Results */}
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>Discount on Electronics</Text>
          <Text style={styles.resultDescription}>
            Get up to 20% off on electronics at participating stores.
          </Text>
        </View>
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>Clothing Discounts</Text>
          <Text style={styles.resultDescription}>
            Exclusive offers on clothing brands for members.
          </Text>
        </View>
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>Travel Deals</Text>
          <Text style={styles.resultDescription}>
            Special discounts on travel packages for work and leisure.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  searchBarContainer: {
    marginBottom: 20,
  },
  searchBar: {
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#ffffff',
    borderColor: '#ddd',
    borderWidth: 1,
    fontSize: 16,
  },
  recentSearchesContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#FF6F00',
  },
  recentSearchButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    backgroundColor: '#FF6F00',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom: 10,
  },
  chipText: {
    color: '#fff',
    fontSize: 14,
  },
  searchResultsContainer: {
    marginBottom: 20,
  },
  resultCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#FF6F00',
  },
  resultDescription: {
    fontSize: 14,
    color: '#666',
  },
});