import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { Pressable } from 'react-native'
import colors from '../../../assets/colors/colors';
import { getEvents, getCategories } from '../../../assets/data/client/category';
import CategoryItem from '../../../components/app/CategoryItem';

const CategorySec = () => {
  const [selectedType, setSelectedType] = useState('photography');
  const [selectedEvent, setSelectedEvent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [eventList, setEventList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  
  const seeAllClick = () => {}
  
  const handleCategoryClick = (clickedCatId) => {
      console.log(clickedCatId)
  }
  
  const categoryListOriginal = useRef([]);
  
  useEffect(() => {
      async function fetchData() {
          const categories = getCategories; //make this await function
          categoryListOriginal.current = categories;
          const events = getEvents; //make this await function
          setEventList(events);
      }
      fetchData();
  }, []);
  
  useEffect(() => {
      const filteredList = categoryListOriginal.current.filter(cat => (
          cat.type === selectedType && (selectedEvent === 0 || cat.events.includes(selectedEvent))
      ));
      setCategoryList(filteredList);
  }, [selectedType, selectedEvent]);
  
  return (
    <View style={styles.container} >

      {/* type select */}
      <View style={styles.typeSelectWrapper}>
        <Pressable 
          onPress={() => setSelectedType('photography')} 
          style={[styles.typeSelectStyles, selectedType === 'photography' ? {backgroundColor: colors.bgLight} : null]}
        >
          <Text style={[styles.typeSelectTextStyles, selectedType === 'photography' ? {color: colors.textDark} : null]}>Photography</Text>
        </Pressable>

        <Pressable 
          onPress={() => setSelectedType('videography')} 
          style={[styles.typeSelectStyles, selectedType === 'videography' ? {backgroundColor: colors.bgLight} : null]}
        >
          <Text style={[styles.typeSelectTextStyles, selectedType === 'videography' ? {color: colors.textDark} : null]}>Videography</Text>
        </Pressable>
      </View>

      <View style={styles.titleWrapper}>
        <Text style={styles.titleTextStyles}>Popular Services</Text>
        <Pressable onPress={seeAllClick}><Text style={styles.seeAllTextStyles}>See all</Text></Pressable>
      </View>

      {/* events and categories */}
      <View style={styles.eventCatWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Pressable
            style={[ styles.eventItemStyles, selectedEvent === 0 ? {backgroundColor: colors.primary} : null]}
            onPress={() => setSelectedEvent(0)}
          >
            <Text style={[ styles.eventItemTextStyles, selectedEvent === 0 ? {color: colors.textLight} : null]}>
              All
            </Text>
          </Pressable>

          {eventList.length > 0 && eventList.map((ev) => (
            <Pressable 
              key={ev.id}
              style={[
                styles.eventItemStyles,
                selectedEvent === ev.id ? {backgroundColor: colors.primary} : null,
              ]}
              onPress={() => setSelectedEvent(ev.id)}
            >
              <Text style={[ styles.eventItemTextStyles, selectedEvent === ev.id ? {color: colors.textLight} : null ]}>
                {ev.name}
              </Text>
            </Pressable>
          ))}

        </ScrollView>

        <View style={styles.categoryItemsWrapper}>
        {categoryList.length > 0 && categoryList.map((cat) => (
          <View key={cat.id} style={styles.categoryItemStyles}>
            <CategoryItem cat={cat} handleCategoryClick={handleCategoryClick} />
          </View>
        ))}
        </View>
      </View>

    </View>
  );
}

export default CategorySec

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  typeSelectWrapper: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 10,
  },
  typeSelectStyles: {
    height: 40,
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  typeSelectTextStyles: {
    color: colors.textLight,
  }, 
  titleWrapper: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  titleTextStyles: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textDark,
  },
  seeAllTextStyles: {
    color: colors.textGraySecondary,
  },
  eventCatWrapper: {
    marginTop: 20,
  },
  eventItemStyles: {
    backgroundColor: colors.bgLight,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
  },
  eventItemTextStyles: {
    color: colors.primary,
  },
  categoryItemsWrapper: {
    marginTop: 20,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  categoryItemStyles: {
    width: '30%',
    marginBottom: 15,
    marginHorizontal: '1.66%',
  },
})