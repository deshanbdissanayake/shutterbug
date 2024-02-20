import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import colors from '../../../assets/colors/colors'
import FeedbackSingle from '../../../components/app/FeedbackSingle'

const FeedbacksSec = ({ feedbacks }) => {

  return (
    <View style={styles.container}>
      <View style={styles.textWrapper}>
          <Text style={styles.secTitleTextStyles}>Feedbacks</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {feedbacks.length > 0 && feedbacks.map((val) => (
            <FeedbackSingle key={val.f_id} feedback={val} />
          ))}
        </ScrollView>
    </View>
  )
}

export default FeedbacksSec

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  textWrapper: {
    marginBottom: 10,
  },
  secTitleTextStyles: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.textDark,
  },
})