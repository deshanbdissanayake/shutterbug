import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons/build/Icons';
import colors from '../../assets/colors/colors';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SearchSec = () => {
  const navigation = useNavigation();

  const searchBtnClick = () => {
    navigation.navigate('Search Item');
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={searchBtnClick} style={styles.searchWrapper}>
        <View style={styles.searchIconStyles}><Ionicons name='search' size={20} color={colors.textLight} /></View>
        <Text style={styles.searchTextStyles}>Search services near you</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SearchSec

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchWrapper: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.borderGrayLight,
  },
  searchIconStyles: {
    backgroundColor: colors.primary,
    padding: 5,
    borderRadius: 50
  },
  searchTextStyles: {
    marginLeft: 20,
    color: colors.textGraySecondary,
  }
})