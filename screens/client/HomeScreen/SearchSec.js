import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Input from '../../../components/general/Input'
import { Feather, Ionicons } from '@expo/vector-icons/build/Icons';
import { Pressable } from 'react-native';
import colors from '../../../assets/colors/colors';
import Button from '../../../components/general/Button';
import { TouchableOpacity } from 'react-native';

const SearchSec = () => {

  const searchBtnClick = () => {}

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={searchBtnClick} style={styles.searchWrapper}>
        <View style={styles.searchIconStyles}><Ionicons name='search' size={24} color={colors.textLight} /></View>
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
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: colors.bgLight,
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