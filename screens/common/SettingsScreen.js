import { Pressable, StyleSheet, Text, View, Linking, StatusBar } from 'react-native'
import React, { useState } from 'react'
import colors from '../../assets/colors/colors'
import NavCard from '../../components/app/NavCard'
import { FontAwesome6, FontAwesome5, FontAwesome, MaterialIcons, Foundation } from '@expo/vector-icons'
import MyProfile from '../../components/app/MyProfile'
import { useNavigation } from '@react-navigation/native'
import { useAppContext } from '../../layouts/AppContext'
import CustomModal from '../../components/general/CustomModal'
import { removeAsync } from '../../assets/store/asyncStorage'


const SettingsScreen = () => {
  const version = '1.0.0' // get from the async storage
  const navigation = useNavigation();
  const { isClient, setIsClient, setIsLoggedIn } = useAppContext();

  const [showProfileChangeAlert, setShowProfileChangeAlert] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);

  const handleLinkClick = () => {
    Linking.openURL('https://www.introps.com');
  }

  const handleChangeProfile = () => {
    setShowProfileChangeAlert(false);
    setIsClient(!isClient)
  }

  const handleJobRequest = () => {
    navigation.navigate('Job Request')
  }

  const handleBilling = () => {
    navigation.navigate('Earnings')
  }

  const handleProfile = () => {
    navigation.navigate('Profile Edit')
  }

  const handleCase = () => {
    navigation.navigate('Case List')
  }

  const handleLogout = async () => {
    setShowLogoutAlert(false);
    try {
      await removeAsync("shutterbug-app-login-token");
      setIsLoggedIn(false)
    } catch (error) {
      console.error('error at setting screen logout: ', error)
    }
  }

  const ClientSettings = () => {
    return (
      <>
        <NavCard 
          icon={<FontAwesome5 name="exchange-alt" size={24} color={colors.textDark} />} 
          title={'Change to Provider Profile'}
          func={() => setShowProfileChangeAlert(true)}
        />
        <NavCard 
          icon={<FontAwesome name="briefcase" size={24} color={colors.textDark} />} 
          title={'My Job Requests'}
          func={handleJobRequest}
        />
        <NavCard 
          icon={<FontAwesome6 name="file-invoice" size={24} color={colors.textDark} />} 
          title={'Billing & Payment'}
          func={handleBilling}
        />
        <NavCard 
          icon={<FontAwesome name="user" size={24} color={colors.textDark} />} 
          title={'Profile'}
          func={handleProfile}
        />
        <NavCard 
          icon={<Foundation name="alert" size={24} color={colors.textDark} />} 
          title={'Cases'}
          func={handleCase}
        />
        <NavCard 
          icon={<MaterialIcons name="logout" size={24} color={colors.textDark} />} 
          title={'Logout'}
          func={() => setShowLogoutAlert(true)}
        />
      </>
    )
  }

  const ProviderSettings = () => {
    return (
      <>
        <NavCard 
          icon={<FontAwesome5 name="exchange-alt" size={24} color={colors.textDark} />} 
          title={'Change to Client Profile'}
          func={() => setShowProfileChangeAlert(true)}
        />
        <NavCard 
          icon={<FontAwesome name="briefcase" size={24} color={colors.textDark} />} 
          title={'Job Requests'}
          func={handleJobRequest}
        />
        <NavCard 
          icon={<FontAwesome5 name="money-bill" size={20} color={colors.textDark} />} 
          title={'Earnings'}
          func={handleBilling}
        />
        <NavCard 
          icon={<FontAwesome name="user" size={24} color={colors.textDark} />} 
          title={'Profile'}
          func={handleProfile}
        />
        <NavCard 
          icon={<Foundation name="alert" size={24} color={colors.textDark} />} 
          title={'Cases'}
          func={handleCase}
        />
        <NavCard 
          icon={<MaterialIcons name="logout" size={24} color={colors.textDark} />} 
          title={'Logout'}
          func={() => setShowLogoutAlert(true)}
        />
      </>
    )
  }

  return (
    <View style={styles.container}>
      <View>
        <MyProfile isClient={isClient} />
        {isClient ? <ClientSettings/> : <ProviderSettings/>}
      </View>
      <View style={styles.footerWrapper}>
        <Text style={styles.versionTextStyles}>Shutterbug Version {version}</Text>
        <Pressable onPress={handleLinkClick}>
          <Text style={styles.devTextStyles}>Developed by Introps</Text>
        </Pressable>
      </View>

      {showProfileChangeAlert && (
        <View style={styles.modalsWrapper}>
          <StatusBar backgroundColor={colors.textGraySecondary} barStyle="light-content" />
          <CustomModal
            title={'Are you sure?'}
            content={'Change Profile Type to ' + (isClient ? 'Client' : 'Provider')}
            cancelButtonText={'Cancel'}
            okButtonText={'Confirm'}
            pressCancel={() => setShowProfileChangeAlert(false)}
            pressOk={handleChangeProfile}
          />
        </View>
      )}

      {showLogoutAlert && (
        <View style={styles.modalsWrapper}>
          <StatusBar backgroundColor={colors.textGraySecondary} barStyle="light-content" />
          <CustomModal
            title={'Logout'}
            content={'Are you sure?'}
            cancelButtonText={'Cancel'}
            okButtonText={'Confirm'}
            pressCancel={() => setShowLogoutAlert(false)}
            pressOk={handleLogout}
          />
        </View>
      )}
    </View>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: 'space-between',
    },
    modalsWrapper:{
      flex: 1,
      position: 'absolute',
      alignSelf: 'center',
      backgroundColor: colors.transparentDark,
      width: "100%",
      height: "100%",
    },
    footerWrapper: {
        justifyContent: 'center',
        marginVertical: 15,
    },
    versionTextStyles: {
        textAlign: 'center',
        fontWeight: '300',
        color: colors.textGray,
        fontSize: 12,
        marginRight: 5,
    },
    devTextStyles: {
        textAlign: 'center',
        fontWeight: '300',
        color: colors.textGray,
        fontSize: 12,
        textDecorationLine: 'underline',
    },
})