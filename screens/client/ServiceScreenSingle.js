import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../assets/colors/colors'

import ImagesSec from './ServiceScreenSingle/imagesSec';
import ProviderSec from './ServiceScreenSingle/providerSec';
import ServiceInfoSec from './ServiceScreenSingle/serviceInfoSec';
import PackagesSec from './ServiceScreenSingle/packagesSec';
import FeedbacksSec from './ServiceScreenSingle/feedbacksSec';
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
    <View style={styles.container}>
      {serviceData && 
        <View>
          <ImagesSec imageArr={serviceData.s_images} />
          <ProviderSec />
          <ServiceInfoSec />
          <PackagesSec />
          <FeedbacksSec />
        </View>
      }
      <View>
        {/* Chat button */}
      </View>
    </View>
  );
};

export default ServiceScreenSingle

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: colors.white,
  }
})