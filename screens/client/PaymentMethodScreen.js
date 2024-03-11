import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/app/Header'
import colors from '../../assets/colors/colors'
import { useNavigation, useRoute } from '@react-navigation/native'
import Button from '../../components/general/Button'
import Checkbox from '../../components/general/Checkbox'

const PaymentMethodScreen = ({ job_id }) => {
  const navigation = useNavigation();
  const route = useRoute();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const [selectedMethod, setSelectedMethod] = useState('card');

  const handleNextClick = (paym) => {
    if(paym == 'card'){
      navigation.navigate('Bank Payment', job_id)
    }else{
      navigation.navigate('Paypal Payment', job_id)
    }
  };

  return (
    <View style={styles.container}>
        <Header text={'Payment Methods'} handleGoBack={handleGoBack} />
        <View style={styles.payMethodsWrapper}>
          <View style={styles.payMethodWrapper}>
            <Checkbox
              size={25}
              borderRadius={5}
              iconSize={14}
              pressFunc={() => setSelectedMethod('card')}
              pressed={selectedMethod == 'card'}
            />
            <Text style={styles.payMethodTextStyles}>Card Payment</Text>
          </View>
          <View style={styles.payMethodWrapper}>
            <Checkbox
              size={25}
              borderRadius={5}
              iconSize={14}
              pressFunc={() => setSelectedMethod('paypal')}
              pressed={selectedMethod == 'paypal'}
            />
            <Text style={styles.payMethodTextStyles}>Paypal Payment</Text>
          </View>
        </View>
        <Button
          bgColor={colors.primary}
          content={<Text style={{color: colors.textLight}}>Next</Text>}
          func={() => handleNextClick(selectedMethod)}
        />
    </View>
  )
}

export default PaymentMethodScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      paddingVertical: 10,
      paddingHorizontal: 15,
      justifyContent: 'space-between',
    },
    payMethodsWrapper: {
      alignItems: 'center',
    }, 
    payMethodWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      width: 250,
      paddingVertical: 20,
    },
    payMethodTextStyles: {
      color: colors.textDark,
      fontSize: 16,
      textAlign: 'center',
      marginLeft: 10,
    }
})