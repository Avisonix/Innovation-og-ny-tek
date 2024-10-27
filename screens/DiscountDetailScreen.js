// DiscountDetailScreen.js
import React from 'react';
import { View, Text, Button, Linking, Alert } from 'react-native';
import GlobalStyles from '../globalStyles';

export default function DiscountDetailScreen({ route }) {
  const { discount } = route.params; // Retrieve discount data passed from HomeScreen

  const openLink = () => {
    Linking.openURL(discount.link).catch(() =>
      Alert.alert("Error", "Unable to open the link.")
    );
  };

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.headerText}>{discount.title}</Text>
      <Text style={GlobalStyles.resultDescription}>{discount.description}</Text>
      
      <Text style={[GlobalStyles.sectionTitle, { marginTop: 20 }]}>Conditions</Text>
      <Text style={GlobalStyles.resultDescription}>{discount.conditions}</Text>

      <Button title="View Offer" onPress={openLink} />
    </View>
  );
}
