import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import colors from '../../assets/colors/colors';

const Alert = ({ type, title = "", msg, visible, onClose }) => {
    let icon = null;
    let bgColor = '';

    switch (type) {
        case 'success':
            icon = <AntDesign name="checkcircleo" size={64} color={colors.success} />;
            bgColor = colors.white;
            break;
        case 'error':
            icon = <AntDesign name="closecircleo" size={64} color={colors.danger} />;
            bgColor = colors.white;
            break;
        case 'warning':
            icon = <AntDesign name="warning" size={64} color={colors.warning} />;
            bgColor = colors.white;
            break;
        case 'info':
            icon = <AntDesign name="infocirlceo" size={64} color={colors.info} />;
            bgColor = colors.white;
            break;
        default:
            break;
    }

    return (
        <Modal
            visible={visible}
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                <View style={[styles.modalWrapper, { backgroundColor: bgColor }]}>
                    <View style={{ marginBottom: 5 }}>{icon}</View>
                    <View style={{ marginBottom: 5 }}>
                        {(title !== "") ? (
                            <Text style={styles.titleTextStyles}>{title}</Text>
                        ) : (null)}
                    </View>
                    <View>
                        <Text style={styles.msgTextStyles}>{msg}</Text>
                    </View>
                    <TouchableOpacity onPress={onClose} style={styles.closeButtonWrapper}>
                        <AntDesign name="close" size={18} color={colors.textDark} />
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
        borderRadius: 5,
    },
    titleTextStyles: {
        fontSize: 18,
        color: colors.textDark,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    msgTextStyles: {
        fontSize: 15,
        color: colors.textDark,
        textAlign: 'center',
    },
    closeButtonWrapper: {
        position: 'absolute',
        top: 5,
        right: 5,
        padding: 3,
        backgroundColor: colors.disabled,
        borderRadius: 2,
    },
});