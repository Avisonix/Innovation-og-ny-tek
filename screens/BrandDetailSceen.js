// BrandDetailScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import GlobalStyles from '../globalStyles';

export default function BrandDetailScreen({ route }) {
  const { brand } = route.params; // Modtag brand-data fra navigationen

  const renderDiscount = ({ item }) => (
    <View style={styles.discountCard}>
      <Text style={styles.discountTitle}>{item.description}</Text>
      <Text style={styles.discountCondition}>{item.conditions}</Text>
    </View>
  );

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.headerText}>{brand.brandName}</Text>

      <FlatList
        data={brand.discounts}
        renderItem={renderDiscount}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  discountCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  discountTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  discountCondition: {
    fontSize: 14,
    color: '#666',
  },
});
