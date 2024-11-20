import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { ref, get, child,update } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';
import { auth,database } from '../firebaseConfig';
import GlobalStyles from '../globalStyles';
import userHandler from '../dataHandlers/userHandler'; // Importer userHandler funktionerne

export default function HomeScreen() {
  const [brands, setBrands] = useState([]);
  const [newDiscounts, setNewDiscounts] = useState([]); // Nye rabatter
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const dbRef = ref(database);
        const uid = await userHandler.getUID(auth).then((uid) => {return uid}); // Hent UID
        // Hent bruger fra realtime databasen
        const user = await userHandler.getUserByUid({get, child, dbRef, uid}).then((user) => {return user});
        const snapshot = await get(child(dbRef, 'discounts'));
        if (snapshot.exists()) {
          const data = snapshot.val();

          const brandData = {};
          const newDiscountList = [];

          Object.keys(data).forEach((key) => {
            const discount = data[key];
            const brand = discount.brand || 'Unknown';

            if (!brandData[brand]) {
              brandData[brand] = {
                brandName: brand,
                logo: discount.logo || 'https://example.com/default-logo.png', // Standard logo
                discounts: [],
              };
            }

            brandData[brand].discounts.push(discount);

            // Hvis isNew er sand, tilføj til "nye rabatter"
            if (discount.isNew) {
              newDiscountList.push({ ...discount, logo: brandData[brand].logo });
            }
          });

          setBrands(Object.values(brandData)); // Lav en liste af brands
          setNewDiscounts(newDiscountList); // Gem listen af nye rabatter
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

  const renderNewDiscount = ({ item }) => (
    <View style={GlobalStyles.discountCard}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={{ uri: item.logo }} style={GlobalStyles.smallLogo} />
        <Text style={GlobalStyles.discountTitle}>{item.description}</Text>
      </View>
      <Text style={GlobalStyles.discountCondition}>{item.conditions}</Text>
    </View>
  );

  return (
    <View style={GlobalStyles.container}>
      {/* Boks med nye rabatter */}
      <TouchableOpacity
        style={GlobalStyles.newDiscountBox}
        onPress={() => navigation.navigate('NewDiscounts', { discounts: newDiscounts })} // Naviger til NewDiscountsScreen
      >
        <Text style={GlobalStyles.newDiscountText}>
          NYT! Vi har registreret {newDiscounts.length} nye rabatkoder. Tryk her for at se.
        </Text>
      </TouchableOpacity>

      {/* Liste over brands */}
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
