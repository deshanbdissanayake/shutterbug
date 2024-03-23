import { StyleSheet, View, ScrollView, BackHandler, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../assets/colors/colors'
import { useNavigation, useRoute } from '@react-navigation/native'

import ImagesSec from '../../components/other/ImagesSec';
import ProviderSec from '../../components/other/ProviderSec';
import ServiceInfoSec from '../../components/other/ServiceInfoSec';
import PackagesSec from '../../components/other/PackagesSec'
import FeedbacksSec from '../../components/other/FeedbackSec';
import { getServiceById } from '../../assets/data/service';
import ChatBtnSec from '../../components/other/ChatBtnSec';
import { useAppContext } from '../../layouts/AppContext';
import Button from '../../components/general/Button';

const ServiceScreenSingle = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { s_id } = route.params;

  const { isClient } = useAppContext();

  const [serviceData, setServiceData] = useState(null);

  const handleGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const getData = async () => {
      const data = await getServiceById(s_id);
      setServiceData(data);
    }
    getData();
  }, []);

  const handleEditClick = () => {
    navigation.navigate('Service Create', {s_id})
  }

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {serviceData && 
        <View>
          <ImagesSec imageArr={serviceData.s_images} handleGoBack={handleGoBack} />
          {isClient && (
          <ProviderSec 
            p_id={serviceData.provider_id}
            p_img={serviceData.provider_pro_pic}
            fname={serviceData.provider_name}
            uname={serviceData.provider_username}
          />
          )}
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
            {isClient ? (
              <ChatBtnSec
                p_id={serviceData.provider_id}
                p_img={serviceData.provider_pro_pic}
              />
            ) : (
              <Button
                bgColor={colors.white}
                content={<Text style={{color: colors.primary}}>Edit Service</Text>}
                func={handleEditClick}
                bdr={colors.primary}
              />
            )}
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
    paddingBottom: 20,
  },
})