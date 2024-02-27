import React from 'react';
import { Text, View } from 'react-native';

const ProviderProfileScreen = ({ route }) => {
  console.log('route', route)

  // Now you can use p_id in your component
  return (
    <View>
      <Text>Provider ID:</Text>
    </View>
  );
};

export default ProviderProfileScreen;
