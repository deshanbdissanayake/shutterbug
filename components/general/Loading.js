import { StyleSheet, Text, View, ActivityIndicator, Modal } from 'react-native';
import React, { useState } from 'react';

import colors from '../../assets/colors/colors';

const Loading = ({ msg = false , visible }) => {
  return (
    <Modal
      transparent={true} 
      animationType="fade" 
      visible={visible}
      statusBarTranslucent ={true} 
    >
      <View style={styles.modalWrapper}>
        <View style={styles.loadingWrapper}>
          {
            msg && <Text style={styles.loadingTextStyles}>{msg}</Text>
          }
          <ActivityIndicator size={'large'} color={colors.primaryDark} />
        </View>
      </View>
    </Modal>
  );
};

export default Loading;

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loadingWrapper: {
    width: 200,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  loadingTextStyles: {
    fontSize: 16,
    color: colors.primaryDark,
    marginBottom: 10,
  },
});