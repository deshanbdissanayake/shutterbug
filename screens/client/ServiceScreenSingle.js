import { StyleSheet, View, ScrollView, Image, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../assets/colors/colors'

import ImagesSec from './ServiceScreenSingle/ImagesSec';
import ProviderSec from './ServiceScreenSingle/ProviderSec';
import ServiceInfoSec from './ServiceScreenSingle/ServiceInfoSec';
import PackagesSec from './ServiceScreenSingle/PackagesSec';
import FeedbacksSec from './ServiceScreenSingle/FeedbacksSec';
import { getServiceById } from '../../assets/data/client/service';

const ServiceScreenSingle = ({ s_id = 1 }) => {
  const [serviceData, setServiceData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      //const data = await getServiceById(s_id);
      const data = getServiceById;
      setServiceData(data);
    }
    fetchData();
  }, []);

  const handleChatPress = () => {
    console.log('handle chat press')
  }

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {serviceData && 
        <View>
          <ImagesSec imageArr={serviceData.s_images} />
          <ProviderSec provider={{ 
            id : serviceData.provider_id, 
            username: serviceData.provider_username, 
            fullname: serviceData.provider_name, 
            pro_pic: serviceData.provider_pro_pic
          }} />
          <ServiceInfoSec info={{
            title: serviceData.s_name,
            type: serviceData.s_type,
            description: serviceData.s_desc,
            events : serviceData.events,
            cat_id: serviceData.cat_id,
            cat_name: serviceData.cat_name,
          }} />
          <PackagesSec packages={serviceData.packages} />
          <FeedbacksSec feedbacks={serviceData.feedbacks} />

          <TouchableOpacity onPress={handleChatPress} style={styles.chatTextWrapper}>
              <Image source={{ uri: serviceData.provider_pro_pic }} style={styles.chatImageStyles} />
              <Text style={styles.chatTextStyles }>Chat</Text>
          </TouchableOpacity>

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
  sectionWrapper: {
    paddingHorizontal: 15,
  },
  chatTextWrapper: {
    zIndex: 5,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingVertical: 5,
    paddingLeft: 5,
    paddingRight: 10,
    marginHorizontal: 20,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  chatImageStyles: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
    borderRadius: 50,
    marginRight: 10,
  },
  chatTextStyles: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.textDark,
  },
})