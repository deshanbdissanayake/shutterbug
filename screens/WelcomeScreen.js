import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import Button from '../components/general/Button';
import colors from '../assets/colors/colors';

const WelcomeScreen = ({ navigation }) => {

    const loadLoginScreen = () => {
        navigation.navigate('Sign In');
    }

    const loadRegisterScreen = () => {
        navigation.navigate('Sign Up');
    }

    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/common/logo.png')} style={styles.gifImageStyles}/>
            <View style={styles.btnWrapper}>
                <Button
                    bgColor = {colors.primary}
                    content = {<Text style={{color: colors.textLight}}>Create an Account</Text>}
                    func = {loadRegisterScreen}
                    bdr = {colors.primary}
                />
                <Button
                    content = {<Text style={{color: colors.primary}}>Sign In</Text>}
                    func = {loadLoginScreen}
                    bdr = {colors.primary}
                />
            </View>
        </View>
    );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
    },
    gifImageStyles: {
        flex: 2,
        width: 250,
        resizeMode: 'contain',
    },
    btnWrapper: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
    },
});
