import { StyleSheet } from 'react-native';

const GlobalStyles = StyleSheet.create({
  // Eksisterende styles
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
    color: '#333',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 20,
  },
  grid: {
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    margin: 10,
    padding: 20,
    width: 140,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF6F00',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 40,
    height: 40,
    tintColor: '#fff',
  },
  cardText: {
    textAlign: 'center',
    color: '#555',
    fontWeight: '600',
    fontSize: 14,
  },

  // SearchScreen styles
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

  // SettingsScreen styles
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  settingsContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    elevation: 2,
    marginBottom: 10,
  },
  settingText: {
    fontSize: 18,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#FF5722',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // HomeScreen styles
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

  // BrandDetailScreen styles
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

  // New styles for App.js tab bar and icons
  tabBarStyle: {
    height: 60,
    paddingBottom: 10,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#dcdcdc',
  },
  iconStyle: {
    width: 30,
    height: 30,
  },
  smallLogo: {
    width: 20,
    height: 20,
    marginRight: 8,
    borderRadius: 5,
  },
  
  
});

export default GlobalStyles;
