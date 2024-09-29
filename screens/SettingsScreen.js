import React from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity } from 'react-native';

export default function SettingsScreen({ navigation }) {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);
  const [pushNotificationsEnabled, setPushNotificationsEnabled] = React.useState(false);
  const [locationServicesEnabled, setLocationServicesEnabled] = React.useState(false);
  const [adPreferencesEnabled, setAdPreferencesEnabled] = React.useState(false);

  const handleNotificationsToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handlePushNotificationsToggle = () => {
    setPushNotificationsEnabled(!pushNotificationsEnabled);
  };

  const handleLocationServicesToggle = () => {
    setLocationServicesEnabled(!locationServicesEnabled);
  };

  const handleAdPreferencesToggle = () => {
    setAdPreferencesEnabled(!adPreferencesEnabled);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <ScrollView contentContainerStyle={styles.settingsContainer}>
        {/* Account Section */}
        <Text style={styles.sectionTitle}>Account</Text>
        <TouchableOpacity style={styles.setting}>
          <Text style={styles.settingText}>Personal Information</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.setting}>
          <Text style={styles.settingText}>Change Password</Text>
        </TouchableOpacity>

        {/* Notifications Section */}
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.setting}>
          <Text style={styles.settingText}>Email</Text>
          <Switch value={notificationsEnabled} onValueChange={handleNotificationsToggle} />
        </View>
        <View style={styles.setting}>
          <Text style={styles.settingText}>Push Notifications</Text>
          <Switch value={pushNotificationsEnabled} onValueChange={handlePushNotificationsToggle} />
        </View>

        {/* Privacy Section */}
        <Text style={styles.sectionTitle}>Privacy</Text>
        <View style={styles.setting}>
          <Text style={styles.settingText}>Location Services</Text>
          <Switch value={locationServicesEnabled} onValueChange={handleLocationServicesToggle} />
        </View>
        <View style={styles.setting}>
          <Text style={styles.settingText}>Ad Preferences</Text>
          <Switch value={adPreferencesEnabled} onValueChange={handleAdPreferencesToggle} />
        </View>

        {/* General Section */}
        <Text style={styles.sectionTitle}>General</Text>
        <TouchableOpacity style={styles.setting}>
          <Text style={styles.settingText}>Language</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.setting}>
          <Text style={styles.settingText}>About</Text>
        </TouchableOpacity>

        {/* Save Changes Button */}
        <TouchableOpacity style={styles.saveButton} onPress={() => alert('Changes Saved!')}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Light background color
    padding: 20,
  },
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
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#333', // Darker text color
  },
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff', // White background for each setting
    padding: 15,
    borderRadius: 8,
    elevation: 2, // Shadow effect on Android
    marginBottom: 10,
  },
  settingText: {
    fontSize: 18,
    color: '#333', // Darker text color for better readability
  },
  saveButton: {
    backgroundColor: '#FF5722', // A distinct color for the button
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff', // White text for contrast
    fontSize: 18,
    fontWeight: 'bold',
  },
});