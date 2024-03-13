import { Pressable, StyleSheet, Text, View, Linking } from 'react-native'
import React from 'react'
import colors from '../../assets/colors/colors'
import NavCard from '../../components/app/NavCard'
import { FontAwesome6, FontAwesome5, FontAwesome, MaterialIcons } from '@expo/vector-icons'
import MyProfile from '../../components/app/MyProfile'
import { useNavigation } from '@react-navigation/native'


const SettingsScreen = () => {
  const version = '1.0.0' // get from the async storage
  const isClient = false 
  const navigation = useNavigation();

  const handleLinkClick = () => {
    Linking.openURL('https://www.introps.com');
  }

  const handleChangeProfile = () => {}
  const handleJobRequest = () => {
    navigation.navigate('Job Request')
  }
  const handleBilling = () => {}
  const handleProfile = () => {}
  const handleLogout = () => {}

  const ClientSettings = () => {
    return (
      <>
        <NavCard 
          icon={<FontAwesome5 name="exchange-alt" size={24} color={colors.textDark} />} 
          title={'Change to Provider Profile'}
          func={handleChangeProfile}
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
          icon={<MaterialIcons name="logout" size={24} color={colors.textDark} />} 
          title={'Logout'}
          func={handleLogout}
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
          func={handleChangeProfile}
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
          icon={<MaterialIcons name="logout" size={24} color={colors.textDark} />} 
          title={'Logout'}
          func={handleLogout}
        />
      </>
    )
  }

  return (
    <View style={styles.container}>
      <View>
        <MyProfile/>
        {isClient ? <ClientSettings/> : <ProviderSettings/>}
      </View>
      <View style={styles.footerWrapper}>
        <Text style={styles.versionTextStyles}>Shutterbug Version {version}</Text>
        <Pressable onPress={handleLinkClick}>
          <Text style={styles.devTextStyles}>Developed by Introps</Text>
        </Pressable>
      </View>
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