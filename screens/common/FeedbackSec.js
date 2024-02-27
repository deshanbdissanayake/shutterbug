import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import colors from '../../assets/colors/colors'
import FeedbackSingle from '../../components/app/FeedbackSingle'
import Subtitle from '../../components/app/Subtitle'
import NoData from '../../components/app/NoData'
import ShowAll from '../../components/app/ShowAll'

const FeedbacksSec = ({ feedbacks }) => {
  const maxItemsToShow = 2; // Change this value as desired
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const renderFeedbacks = () => {
    if (!feedbacks || feedbacks.length === 0) {
      return <NoData text='No Feedbacks' />;
    }

    const feedbacksToRender = showAll ? feedbacks : feedbacks.slice(0, maxItemsToShow);

    return feedbacksToRender.map((val) => (
      <FeedbackSingle key={val.f_id} feedback={val} />
    ));
  };

  return (
    <View style={styles.container}>
        <Subtitle text={'Feedbacks'} />
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderFeedbacks()}
        </ScrollView>
        {feedbacks.length > maxItemsToShow && (
          <ShowAll showAll={showAll} setShowAll={setShowAll} />
        )}
    </View>
  )
}

export default FeedbacksSec

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    marginBottom: 20,
  },
})
