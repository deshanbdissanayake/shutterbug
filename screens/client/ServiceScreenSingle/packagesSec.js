import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../../../assets/colors/colors'
import PackageSingle from '../../../components/app/PackageSingle'

const packagesSec = ({ packages = [] }) => {
  const [selectedPkg, setSelectedPkg] = useState(0)

  const handlePackageSelect = (pkg_id) => {
    setSelectedPkg(pkg_id)
  }

  return (
    <View style={styles.container}>
      <View style={styles.textWrapper}>
        <Text style={styles.secTitleTextStyles}>Available Packages</Text>
      </View>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
        {
          packages.length > 0 && packages.map((val)=>(
            <PackageSingle key={val.pkg_id} pkg={val} selectedPkg={selectedPkg} handlePackageSelect={handlePackageSelect} />
          ))
        }
      </ScrollView>
    </View>
  )
}

export default packagesSec

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: colors.borderGrayExtraLight,
    borderBottomColor: colors.borderGrayExtraLight,
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