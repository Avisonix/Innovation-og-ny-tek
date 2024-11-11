// HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { ref, get, child } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';
import { database } from '../firebaseConfig';
import GlobalStyles from '../globalStyles';

export default function HomeScreen() {
  const [brands, setBrands] = useState([]);
  const [newDiscountsCount, setNewDiscountsCount] = useState(0);
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

          const brandData = {};
          let newDiscounts = 0;

          Object.keys(data).forEach((key) => {
            const discount = data[key];
            const brand = discount.brand || 'Unknown';

            if (!brandData[brand]) {
              brandData[brand] = {
                brandName: brand,
                logo: discount.logo || 'https://example.com/default-logo.png',
                discounts: [],
              };
            }

            brandData[brand].discounts.push(discount);

            if (discount.isNew) {
              newDiscounts += 1;
            }
          });

          setBrands(Object.values(brandData));
          setNewDiscountsCount(newDiscounts);
        }
      } catch (error) {
        setError('Failed to load discounts. Please try again later.');
        Alert.alert('Error', 'Failed to load discounts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderBrand = ({ item }) => (
    <TouchableOpacity
      style={GlobalStyles.brandCard}
      onPress={() => navigation.navigate('BrandDetail', { brand: item })}
    >
      <Image source={{ uri: item.logo }} style={GlobalStyles.brandLogo} />
      <Text style={GlobalStyles.brandText}>{item.brandName}</Text>
      <Text style={GlobalStyles.discountCount}>{item.discounts.length} rabatkoder</Text>
    </TouchableOpacity>
  );

  return (
    <View style={GlobalStyles.container}>
      <TouchableOpacity style={GlobalStyles.newDiscountBox}>
        <Text style={GlobalStyles.newDiscountText}>
          NYT! Vi har registreret {newDiscountsCount} nye rabatkoder. Tryk her for at se.
        </Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : error ? (
        <Text style={GlobalStyles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={brands}
          renderItem={renderBrand}
          keyExtractor={(item) => item.brandName}
          numColumns={3}
          contentContainerStyle={GlobalStyles.brandGrid}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
