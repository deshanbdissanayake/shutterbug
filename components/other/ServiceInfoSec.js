import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../../assets/colors/colors'

const ServiceInfoSec = ({ info }) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.titleTextStyles}>{info.title}</Text>
      <Text style={styles.catTextStyles}>{info.type} | {info.cat_name}</Text>
      <Pressable onPress={() => setShowAll(!showAll)}>
        <Text style={styles.descTextStyles} numberOfLines={showAll ? undefined : 3}>{info.description}</Text>
      </Pressable>
      <View style={styles.eventsWrapper}>
        {info.events.length > 0 && info.events.map((val)=>(
          <Text style={styles.eventTextStyles} key={val.e_id}>{val.e_name}</Text>
        ))}
      </View>
    </View>
  )
}

export default ServiceInfoSec

const styles = StyleSheet.create({
  container: {
   paddingVertical: 10,
  },
  titleTextStyles: {
    marginTop: 5,
    fontSize: 24,
    fontWeight: '400',
    color: colors.textDark,
  },
  catTextStyles: {
    fontSize: 12,
    color: colors.textGraySecondary,
    textTransform: 'capitalize',
  },
  descTextStyles: {
    marginTop: 10,
    color: colors.textDark,
  },
  eventsWrapper: {
    marginTop: 15,
    flexDirection: 'row',
  },
  eventTextStyles: {
    backgroundColor: colors.bgLight,
    color: colors.textDark,
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 12,
    borderRadius: 5,
  },
})