import { StyleSheet, View, ScrollView } from 'react-native'
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
          <FeedbacksSec />
        </View>
      }
      <View>
        {/* Chat button */}
      </View>
    </ScrollView>
  );
};

export default ServiceScreenSingle

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  sectionWrapper: {
    paddingHorizontal: 15,
  }
})