// MapScreen.web.js
import React from 'react';
import { View, Text } from 'react-native';
import GlobalStyles from '../globalStyles';

export default function MapScreen() {
  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.headerText}>Map is not supported on web</Text>
    </View>
  );
}
