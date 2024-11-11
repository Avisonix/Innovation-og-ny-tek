// BrandDetailScreen.js
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import GlobalStyles from '../globalStyles';

export default function BrandDetailScreen({ route }) {
  const { brand } = route.params;

  const renderDiscount = ({ item }) => (
    <View style={GlobalStyles.discountCard}>
      <Text style={GlobalStyles.discountTitle}>{item.description}</Text>
      <Text style={GlobalStyles.discountCondition}>{item.conditions}</Text>
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
