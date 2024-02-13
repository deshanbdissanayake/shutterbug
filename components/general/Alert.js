import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import colors from '../../assets/colors/colors';

const Alert = ({ type, msg, visible, onClose }) => {
    let icon = null;
    let bgColor = '';

    switch (type) {
        case 'success':
            icon = <AntDesign name="checkcircleo" size={64} color={colors.success} />;
            bgColor = colors.successLight;
            break;
        case 'danger':
            icon = <AntDesign name="closecircleo" size={64} color={colors.danger} />;
            bgColor = colors.dangerLight;
            break;
        case 'warning':
            icon = <AntDesign name="warning" size={64} color={colors.warning} />;
            bgColor = colors.warningLight;
            break;
        case 'info':
            icon = <AntDesign name="infocirlceo" size={64} color={colors.info} />;
            bgColor = colors.infoLight;
            break;
        default:
            break;
    }

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                <View style={[styles.modalWrapper, { backgroundColor: bgColor }]}>
                    <View style={{ marginBottom: 20 }}>{icon}</View>
                    <View>
                        <Text style={styles.msgTextStyles}>{msg}</Text>
                    </View>
                    <TouchableOpacity onPress={onClose} style={styles.closeButtonWrapper}>
                        <AntDesign name="close" size={24} color={colors.textDark} />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default Alert;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    modalWrapper: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderRadius: 15,
    },
    msgTextStyles: {
        fontSize: 16,
        color: colors.textDark,
        textAlign: 'center',
    },
    closeButtonWrapper: {
        position: 'absolute',
        top: 5,
        right: 5,
        padding: 10,
    },
});