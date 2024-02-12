import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import Button from '../components/common/Button';
import colors from '../assets/colors/colors';

const WelcomeScreen = () => {

    const loadLoginScreen = () => {}

    const loadRegisterScreen = () => {}

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
                    bgColor = {colors.bgLight}
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
        alignItems: 'center',
        justifyContent: 'center',
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
