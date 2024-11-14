// AuthScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import SignUpForm from '../components/SignUpComponent';
import LoginForm from '../components/LogInComponent';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.componentsBox}>
        {isLogin ? <LoginForm /> : <SignUpForm />}
      </View>
      <View style={styles.toggleBox}>
        <Text style={styles.toggleText}>
          {isLogin ? "Har du ikke en konto?" : "Har du allerede en konto?"}
        </Text>
        <TouchableOpacity onPress={toggleForm}>
          <Text style={styles.toggleLink}>
            {isLogin ? "Opret bruger" : "Log ind"}
          </Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  componentsBox: {
    width: '80%',
    padding: 20,
  },
  toggleBox: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
  },
  toggleText: {
    fontSize: 16,
    color: '#333',
  },
  toggleLink: {
    fontSize: 16,
    color: '#007AFF',
    marginLeft: 5,
  },
});
