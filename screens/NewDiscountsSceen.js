import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, Button } from 'react-native';
import GlobalStyles from '../globalStyles';

export default function NewDiscountsScreen({ route }) {
  const { discounts } = route.params; // Hent rabatter fra navigationen

  const renderDiscount = ({ item }) => (
    <View style={GlobalStyles.discountCard}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={{ uri: item.logo }} style={GlobalStyles.smallLogo} />
        <Text style={GlobalStyles.discountTitle}>{item.description}</Text>
      </View>
      <Text style={GlobalStyles.discountCondition}>{item.conditions}</Text>
      {item.link && (
        <Button title="Se Tilbud" onPress={() => Linking.openURL(item.link)} />
      )}
    </View>
  );

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.headerText}>Nye Rabatter</Text>

      <FlatList
        data={discounts}
        renderItem={renderDiscount}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
