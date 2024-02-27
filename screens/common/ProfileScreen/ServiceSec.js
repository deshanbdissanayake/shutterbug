import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import Subtitle from '../../../components/app/Subtitle'
import ServiceItem from '../../../components/app/ServiceItem'
import NoData from '../../../components/app/NoData'
import ShowAll from '../../../components/app/ShowAll'

const ServiceSec = ({ services }) => {
    const [showAll, setShowAll] = useState(false);
    const maxItemsToShow = 3;

    const handleServiceItemClick = () => {};

    const renderItems = ({ item }) => (
        <ServiceItem
            handleServiceItemClick={handleServiceItemClick}
            s_id={item.s_id}
            s_rating={item.s_rating}
            number_of_reviews={item.number_of_reviews}
            s_name={item.s_name}
            s_type={item.s_type}
            main_pkg_price={item.main_pkg_price}
            main_s_img={item.main_s_img}
        />
    );

    return (
        <View style={styles.container}>
            <Subtitle text={'Services'} />
            <View style={styles.servicesWrapper}>
                {services && services.length > 0 ? (
                    <>
                        {services.slice(0, showAll ? services.length : maxItemsToShow).map((item, index) => (
                            <ServiceItem
                                key={index.toString()}
                                handleServiceItemClick={handleServiceItemClick}
                                s_id={item.s_id}
                                s_rating={item.s_rating}
                                number_of_reviews={item.number_of_reviews}
                                s_name={item.s_name}
                                s_type={item.s_type}
                                main_pkg_price={item.main_pkg_price}
                                main_s_img={item.main_s_img}
                            />
                        ))}
                        {services.length > maxItemsToShow && (
                            <ShowAll showAll={showAll} setShowAll={setShowAll} />
                        )}
                    </>
                ) : (
                    <NoData text={'No Services'} />
                )}
            </View>

        </View>
    )
}

export default ServiceSec

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
})
