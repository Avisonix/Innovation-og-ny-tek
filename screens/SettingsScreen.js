import React from 'react';
import { View, Text, Switch, ScrollView, TouchableOpacity } from 'react-native';
import GlobalStyles from '../globalStyles';
import { signOut } from 'firebase/auth';
import { auth, database } from '../firebaseConfig'; 


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

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("press")
        alert('Signed Out', 'You have been signed out successfully.');
        // Navigate to the login screen or any other appropriate screen
      })
      .catch((error) => {
        alert('Error', error.message);
      });
  };

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.title}>Settings</Text>
      <ScrollView contentContainerStyle={GlobalStyles.settingsContainer}>
        {/* Account Section */}
        <Text style={GlobalStyles.sectionTitle}>Account</Text>
        <TouchableOpacity style={GlobalStyles.setting}>
          <Text style={GlobalStyles.settingText}>Personal Information</Text>
        </TouchableOpacity>
        <TouchableOpacity style={GlobalStyles.setting}>
          <Text style={GlobalStyles.settingText}>Change Password</Text>
        </TouchableOpacity>

        {/* Notifications Section */}
        <Text style={GlobalStyles.sectionTitle}>Notifications</Text>
        <View style={GlobalStyles.setting}>
          <Text style={GlobalStyles.settingText}>Email</Text>
          <Switch value={notificationsEnabled} onValueChange={handleNotificationsToggle} />
        </View>
        <View style={GlobalStyles.setting}>
          <Text style={GlobalStyles.settingText}>Push Notifications</Text>
          <Switch value={pushNotificationsEnabled} onValueChange={handlePushNotificationsToggle} />
        </View>

        {/* Privacy Section */}
        <Text style={GlobalStyles.sectionTitle}>Privacy</Text>
        <View style={GlobalStyles.setting}>
          <Text style={GlobalStyles.settingText}>Location Services</Text>
          <Switch value={locationServicesEnabled} onValueChange={handleLocationServicesToggle} />
        </View>
        <View style={GlobalStyles.setting}>
          <Text style={GlobalStyles.settingText}>Ad Preferences</Text>
          <Switch value={adPreferencesEnabled} onValueChange={handleAdPreferencesToggle} />
        </View>

        {/* General Section */}
        <Text style={GlobalStyles.sectionTitle}>General</Text>
        <TouchableOpacity style={GlobalStyles.setting}>
          <Text style={GlobalStyles.settingText}>Language</Text>
        </TouchableOpacity>
        <TouchableOpacity style={GlobalStyles.setting}>
          <Text style={GlobalStyles.settingText}>About</Text>
        </TouchableOpacity>

        {/* Save Changes Button */}
        <TouchableOpacity style={GlobalStyles.saveButton} onPress={() => alert('Changes Saved!')}>
          <Text style={GlobalStyles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
        {/*sign out button*/}
        <TouchableOpacity style={GlobalStyles.saveButton} onPress={handleSignOut}>
          <Text style={GlobalStyles.saveButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
