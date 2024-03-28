import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../../assets/colors/colors'
import Button from '../general/Button'
import { useNavigation } from '@react-navigation/native'
import ShowAll from './ShowAll'

const CaseItem = ({caseData}) => {
  const navigation = useNavigation();

  const [showAll, setShowAll] = useState(false);

  return (
    <View style={styles.container}>
          <View style={styles.tableStyles}>
            <View style={styles.tableRowStyles}>
              <Text style={styles.tableHeaderStyles}>Case ID</Text>
              <Text style={styles.tableDataStyles}>#{caseData.case_token}</Text>
            </View>
            <View style={styles.tableRowStyles}>
              <Text style={styles.tableHeaderStyles}>Job ID</Text>
              <Text style={styles.tableDataStyles}>#{caseData.job_token}</Text>
            </View>
            <View style={styles.tableRowStyles}>
              <Text style={styles.tableHeaderStyles}>Case Status</Text>
              <Text style={[styles.tableDataStyles, {textTransform: 'capitalize'}]}>{caseData.status}</Text>
            </View>
            <View style={styles.tableRowStyles}>
              <Text style={styles.tableHeaderStyles}>Service</Text>
              <Text style={styles.tableDataStyles}>{caseData.service_name}</Text>
            </View>
            <View style={styles.tableRowStyles}>
              <Text style={styles.tableHeaderStyles}>Package</Text>
              <Text style={styles.tableDataStyles}>{caseData.pkg_name}</Text>
            </View>
            <View style={styles.tableRowStyles}>
              <Text style={styles.tableHeaderStyles}>Case By</Text>
              <Text style={styles.tableDataStyles}>{caseData.client_name}</Text>
            </View>
            <View style={styles.tableRowStyles}>
              <Text style={styles.tableHeaderStyles}>Case To</Text>
              <Text style={styles.tableDataStyles}>{caseData.provider_name}</Text>
            </View>
            <View style={styles.tableRowStyles}>
              <Text style={styles.tableHeaderStyles}>Case Type</Text>
              <Text style={styles.tableDataStyles}>{caseData.case_type}</Text>
            </View>
            <View style={styles.tableRowStyles}>
              <Text style={styles.tableHeaderStyles}>Case Description</Text>
              <View style={styles.tableDataStyles}>
                <Text style={styles.tableDataStyles} numberOfLines={!showAll ? 3 : null}>{caseData.case_desc}</Text>
                <ShowAll showAll={showAll} setShowAll={setShowAll}/>
              </View>
            </View>
          </View>

          <View style={styles.btnsWrapper}>
            <View style={styles.btnWrapper}>
              <Button
                bgColor={colors.white}
                bdr={colors.primary}
                content={<Text style={{color: colors.primary}}>View Offer</Text>}
                func={() => navigation.navigate('Offer View', { offer_id: caseData.job_offer_id })}
              />
            </View>
            <View style={styles.btnWrapper}>
              <Button
                bgColor={colors.white}
                bdr={colors.primary}
                content={<Text style={{color: colors.primary}}>View Chat</Text>}
                func={() => navigation.navigate('Chat Single', { chat_id: caseData.chat_id })}
              />
            </View>
          </View>

    </View>
  )
}

export default CaseItem

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.primary,
    },
    tableStyles: {

    },
    tableRowStyles: {
      flexDirection: 'row',
      paddingVertical: 5,
      borderBottomWidth: 1,
      borderBottomColor: colors.borderGrayExtraLight,
    },
    tableHeaderStyles: {
      flex: 1,
      fontWeight: '400',
      color: colors.textDark,
    },
    tableDataStyles: {
      flex: 2,
      fontWeight: '300',
      color: colors.textDark,
    },
    btnsWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flex: 1,
      marginTop: 10,
    },
    btnWrapper: {
      flex: 1,
      paddingHorizontal: 5,
    },
})