import { StyleSheet, View, ScrollView, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../assets/colors/colors'
import { useNavigation } from '@react-navigation/native'

import ImagesSec from '../../components/other/ImagesSec';
import ProviderSec from '../../components/other/ProviderSec';
import ServiceInfoSec from '../../components/other/ServiceInfoSec';
import PackagesSec from '../../components/other/PackagesSec'
import FeedbacksSec from '../../components/other/FeedbackSec';
import { getServiceById } from '../../assets/data/service';
import ChatBtnSec from '../../components/other/ChatBtnSec';
import { useTabBarVisibility } from '../../layouts/TabBarContext'

const ServiceScreenSingle = ({ s_id }) => {
  const navigation = useNavigation();
  const [serviceData, setServiceData] = useState(null);

  /*========================================================================= */
  // hide tab bar
  const { setTabBarVisible } = useTabBarVisibility()
  useEffect(() => {
    setTabBarVisible(false);
    
    const backAction = () => {
      setTabBarVisible(true);
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [])

  const handleGoBack = () => {
    setTabBarVisible(true);
    navigation.goBack();
  };
  /*========================================================================= */

  useEffect(() => {
    const getData = async () => {
      const data = await getServiceById(s_id);
      setServiceData(data);
    }
    getData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {serviceData && 
        <View>
          <ImagesSec imageArr={serviceData.s_images} handleGoBack={handleGoBack} />
          <ProviderSec 
            p_id={serviceData.provider_id}
            p_img={serviceData.provider_pro_pic}
            fname={serviceData.provider_name}
            uname={serviceData.provider_username}
          />
          <View style={styles.paddingStyles}>
            <ServiceInfoSec info={{
              title: serviceData.s_name,
              type: serviceData.s_type,
              description: serviceData.s_desc,
              events : serviceData.events,
              cat_id: serviceData.cat_id,
              cat_name: serviceData.cat_name,
            }} />
          </View>
          <View style={styles.paddingStyles}>
            <PackagesSec packages={serviceData.packages} />

          </View>
          <View style={styles.paddingStyles}>
            <FeedbacksSec feedbacks={serviceData.feedbacks} />
          </View>
          <View style={styles.paddingStyles}>
            <ChatBtnSec
              p_id={serviceData.provider_id}
              p_img={serviceData.provider_pro_pic}
            />
          </View>
        </View>
      }
    </ScrollView>
  );
};

export default ServiceScreenSingle

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.white,
  },
  paddingStyles: {
    paddingHorizontal: 15,
  },
})