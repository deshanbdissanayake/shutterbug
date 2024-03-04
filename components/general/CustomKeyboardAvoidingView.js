import { KeyboardAvoidingView, ScrollView, StyleSheet, Platform, View } from 'react-native'
import React from 'react'

const CustomKeyboardAvoidingView = ({children}) => {
  return (
    <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        { children }
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default CustomKeyboardAvoidingView

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
})