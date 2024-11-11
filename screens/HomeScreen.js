import React, { useEffect, useState } from 'react'; 
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { ref, get, child } from "firebase/database";
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

          // Group discounts by brand
          const brandData = {};
          let newDiscounts = 0;

          Object.keys(data).forEach(key => {
            const discount = data[key];
            const brand = discount.brand || "Unknown";

            if (!brandData[brand]) {
              brandData[brand] = {
                brandName: brand,
                logo: discount.logo || null, // Expecting "logo" in database
                discounts: [],
              };
            }

            brandData[brand].discounts.push(discount);

            // Example logic to count "new" discounts
            if (discount.isNew) {
              newDiscounts += 1;
            }
          });

          setBrands(Object.values(brandData)); // Convert grouped data to an array
          setNewDiscountsCount(newDiscounts);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load discounts. Please try again later.");
        Alert.alert("Error", "Failed to load discounts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderBrand = ({ item }) => (
    <TouchableOpacity 
      style={styles.brandCard}
      onPress={() => navigation.navigate("BrandDetail", { brand: item })} // Pass brand data to BrandDetailScreen
    >
      <Image source={{ uri: item.logo }} style={styles.brandLogo} />
      <Text style={styles.brandText}>{item.brandName}</Text>
      <Text style={styles.discountCount}>{item.discounts.length} rabatkoder</Text>
    </TouchableOpacity>
  );

  return (
    <View style={GlobalStyles.container}>

      {/* New Discounts Notification */}
      <TouchableOpacity style={styles.newDiscountBox}>
        <Text style={styles.newDiscountText}>
          NYT! Vi har registreret {newDiscountsCount} nye rabatkoder. Tryk her for at se.
        </Text>
      </TouchableOpacity>

      {/* Brand List */}
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
          contentContainerStyle={styles.brandGrid}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  newDiscountBox: {
    backgroundColor: '#FFFBCC',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  newDiscountText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  brandGrid: {
    justifyContent: 'space-between',
  },
  brandCard: {
    width: 100,
    alignItems: 'center',
    margin: 10,
  },
  brandLogo: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 5,
  },
  brandText: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  discountCount: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
});
