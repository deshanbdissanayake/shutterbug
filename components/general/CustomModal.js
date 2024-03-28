import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import React from 'react';
import colors from '../../assets/colors/colors';

const CustomModal = ({
  title,
  content,
  cancelButtonText = null,
  okButtonText,
  pressCancel = '',
  pressOk,
  refresh
}) => {

  return (
    <Modal
        visible={true}
        transparent={true}
    >
        <View style={styles.container}>
        {!refresh ? (
            <>
            <View style={styles.alertWrapper}>
                <View style={styles.headerWrapper}>
                <Text style={styles.titleStyles}>{title}</Text>
                </View>
                <View style={styles.bodyWrapper}>
                <Text style={styles.contentStyles}>{content}</Text>
                </View>
            </View>
            <View style={styles.footerWrapper}>
                {pressCancel !== '' && (
                    <TouchableOpacity onPress={pressCancel} style={styles.cancelBtnStyles}>
                        <Text style={styles.cancelTextStyles}>{cancelButtonText}</Text>
                    </TouchableOpacity>
                )}
                    <TouchableOpacity onPress={pressOk} style={[styles.okBtnStyles, !cancelButtonText && {borderBottomLeftRadius: 10}]}>
                    <Text style={styles.okTextStyles}>{okButtonText}</Text>
                    </TouchableOpacity>
            </View>
            </>
        ) : (
            <View style={styles.loadingWrapper}>
              <ActivityIndicator size={'large'} color={colors.primaryDark} />
            </View>
        )}
        

        </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    margin: 10,
    borderRadius: 10,
    width: 300,
    zIndex: 2,
    alignSelf: 'center',
    top: '25%',
  },
  alertWrapper: {
    padding: 20,
  },
  headerWrapper: {
    marginBottom: 5,
  },
  titleStyles: {
    fontSize: 18,
    color: colors.textDark,
  },
  bodyWrapper: {
    marginBottom: 5,
  },
  contentStyles: {
    fontSize: 14,
    color: colors.textDark,
  },

  footerWrapper: {
    flexDirection: 'row',
  },
  cancelBtnStyles : {
    flex: 1,
    borderBottomLeftRadius: 10,
    backgroundColor: colors.borderGrayExtraLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelTextStyles: {
    fontSize: 12,
    color: colors.textDark,
    padding: 10,
  },
  okBtnStyles : {
    flex: 1,
    borderBottomRightRadius: 10,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  okTextStyles: {
    fontSize: 12,
    color: colors.textLight,
    padding: 10,
  },
  loadingWrapper:{
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
});