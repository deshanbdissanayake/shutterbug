import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import colors from '../../assets/colors/colors'
import Header from '../../components/app/Header'
import MiniButton from '../../components/general/MiniButton'
import { AntDesign } from '@expo/vector-icons'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { getServicesByUserId } from '../../assets/data/service'
import LoadingScreen from '../LoadingScreen'
import ProviderServiceItem from '../../components/app/ProviderServiceItem'
import NoData from '../../components/app/NoData'

const ServicesListScreen = () => {
  const navigation = useNavigation();

  const handleCreateClick = () => {
    navigation.navigate('Service Create', { s_id: null })
  }

  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState(null);

  const getData = async () => {
    try {
      let data = await getServicesByUserId();
      setServices(data)
    } catch (error) {
      console.error('error at provider service list get data: ', error)
    } finally {
      setLoading(false)
    }
  }

  useFocusEffect(
    useCallback(()=> {
      getData();
    },[])
  )

  const handleItemClick = (s_id) => {
    navigation.navigate('Service Single', { s_id })
  }

  if(loading){
    return <LoadingScreen/>
  }

  return (
    <View style={styles.container}>
      <Header 
        text={'My Services'} 
        component={
          <MiniButton 
            bgColor={colors.primary}
            func={handleCreateClick}
            content={<AntDesign name="plus" size={24} color={colors.white} />}
          />
        } 
      />
      
      {(services && services.length > 0) ? (
        <FlatList
          data={services}
          keyExtractor={(item)=> item.s_id}
          renderItem={({item}) => <ProviderServiceItem serviceData={item} handleItemClick={handleItemClick} />}
        />
      ) : (
        <NoData text={'No Services Yet!'} />
      )}
      
    </View>
  )
}

export default ServicesListScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
})