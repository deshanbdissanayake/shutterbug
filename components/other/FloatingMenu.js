import { StyleSheet, Text, View, Animated, Easing, Pressable, Platform } from 'react-native'
import React, { useState, useEffect} from 'react'
import colors from '../../assets/colors/colors'
import { useAppContext } from '../../layouts/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FloatingMenu = () => {

    const { setIsLoggedIn } = useAppContext();

    const [fadeAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    }, []);

    const goToFunction = (nav) => {
        if(nav == "logout"){
            AsyncStorage.removeItem("shutterbug-app-login-token");
            setIsLoggedIn(false);
        }else{
            console.log(nav);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.carrot}></View>
            <View style={styles.content}>
                <Animated.View style={{opacity: fadeAnim}}>
                    <Pressable style={styles.link} onPress={() => {goToFunction("profile")}}>
                        <Text style={styles.linkText}>Profile</Text>
                    </Pressable>
                    <Pressable style={styles.link} onPress={() => {goToFunction("location")}}>
                        <Text style={styles.linkText}>Change Location</Text>
                    </Pressable>
                    <Pressable style={styles.link} onPress={() => {goToFunction("logout")}}>
                        <Text style={styles.linkText}>Logout</Text>
                    </Pressable>
                </Animated.View>
            </View>
        </View>
  )
}

export default FloatingMenu

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 70,
        right: 5,
        backgroundColor: colors.white,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
            },
            android: {
                elevation: 10,
            }
        }),
        borderRadius: 3,
    },
    carrot: {
        backgroundColor: colors.white,
        height: 20,
        width: 20,
        transform: 'rotate(45deg)',
        right: 20,
        position: 'absolute',
        top: -5,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
            },
            android: {
                elevation: 10,
            }
        }),
    },
    content: {
        backgroundColor: colors.white,
        borderRadius: 3,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    link: {
        paddingHorizontal: 30,
        paddingVertical: 5,
    },
    linkText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: colors.primary,
    }
})