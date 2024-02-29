import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../assets/colors/colors'
import PackageSingle from '../app/PackageSingle'
import Subtitle from '../app/Subtitle';

const PackagesSec = ({ packages = [] }) => {
  const [selectedPkg, setSelectedPkg] = useState(1);

  useEffect(() => {
    const mainPackage = packages.find((pkg) => pkg.is_main === 1);
    if (mainPackage) {
      setSelectedPkg(mainPackage.pkg_id);
    }
  }, [packages]);

  const handlePackageSelect = (pkg_id) => {
    setSelectedPkg(pkg_id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.secWrapper}>
        <Subtitle text={'Available Package'} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {packages.length > 0 && packages.map((val) => (
            <PackageSingle
              key={val.pkg_id}
              pkg={val}
              selectedPkg={selectedPkg}
              handlePackageSelect={handlePackageSelect}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default PackagesSec

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 15,
  },
  secWrapper: {
    paddingTop: 15,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: colors.borderGrayExtraLight,
    borderBottomColor: colors.borderGrayExtraLight,
  },
})