// DiscountDetailScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, Alert, Linking } from 'react-native';
import { ref, get, child } from 'firebase/database';
import { database } from '../firebaseConfig';
import GlobalStyles from '../globalStyles';

export default function DiscountDetailScreen({ route }) {
  const { discountId } = route.params;
  const [discount, setDiscount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDiscountDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, `discounts/${discountId}`));
        if (snapshot.exists()) {
          setDiscount(snapshot.val());
        } else {
          setError("Discount data not found.");
        }
      } catch (err) {
        setError("Error fetching discount details.");
        Alert.alert("Error", "Failed to load discount details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDiscountDetails();
  }, [discountId]);

  if (loading) {
    return (
      <View style={GlobalStyles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={GlobalStyles.container}>
        <Text style={GlobalStyles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.headerText}>{discount.description}</Text>
      <Text style={GlobalStyles.resultDescription}>{discount.long_description}</Text>

      <Text style={[GlobalStyles.sectionTitle, { marginTop: 20 }]}>Betingelser</Text>
      <Text style={GlobalStyles.resultDescription}>{discount.conditions}</Text>

      {discount.link && (
        <Button title="Se Tilbud" onPress={() => Linking.openURL(discount.link)} />
      )}
    </View>
  );
}
