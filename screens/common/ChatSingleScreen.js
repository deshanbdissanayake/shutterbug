import React from 'react';
import { Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native'

const ProviderProfileScreen = () => {
  let route = useRoute();
  let p_id = route.params === undefined ? '' : route.params.p_id;

  // Now you can use p_id in your component
  return (
    <View>
      <Text>Provider ID: {p_id}</Text>
    </View>
  );
};

export default ProviderProfileScreen;
