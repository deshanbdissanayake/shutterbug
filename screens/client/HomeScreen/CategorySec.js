import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Pressable } from 'react-native'
import colors from '../../../assets/colors/colors';

const CategorySec = () => {
  const [selectedType, setSelectedType] = useState('photography');

  const seeAllClick = () => {}

  return (
    <View style={styles.container}>
      <View style={styles.typeSelectWrapper}>

        <Pressable 
          onPress={() => setSelectedType('photography')} 
          style={[styles.typeSelectStyles, selectedType === 'photography' ? styles.selectedItemStyles : null]}
        >
          <Text style={[styles.typeSelectTextStyles, selectedType === 'photography' ? styles.selectedItemTextStyles : null]}>Photography</Text>
        </Pressable>

        <Pressable 
          onPress={() => setSelectedType('videography')} 
          style={[styles.typeSelectStyles, selectedType === 'videography' ? styles.selectedItemStyles : null]}
        >
          <Text style={[styles.typeSelectTextStyles, selectedType === 'videography' ? styles.selectedItemTextStyles : null]}>Videography</Text>
        </Pressable>

      </View>
      <View style={styles.titleWrapper}>
        <Text style={styles.titleTextStyles}>Popular Services</Text>
        <Pressable onPress={seeAllClick}><Text style={styles.seeAllTextStyles}>See all</Text></Pressable>
      </View>
      <View>
        <View>{/* events */}</View>
        <View>{/* categories */}</View>
      </View>
    </View>
  );
}

export default CategorySec

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  typeSelectWrapper: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 10,
  },
  typeSelectStyles: {
    height: 40,
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  typeSelectTextStyles: {
    color: colors.textLight,
  }, 
  selectedItemStyles: {
    backgroundColor: colors.bgLight,
  },
  selectedItemTextStyles: {
    color: colors.textDark,
  },  
  titleWrapper: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  titleTextStyles: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textDark,
  },
  seeAllTextStyles: {
    color: colors.textGraySecondary,
  },

})