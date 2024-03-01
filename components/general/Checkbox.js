import { StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import colors from '../../assets/colors/colors'
import { FontAwesome5 } from '@expo/vector-icons';

export default function Checkbox( { size = 30, borderRadius = 5, iconSize = 15, pressFunc } ) {

  const [isPressed, setIsPressed] = useState(false);
  const minSize = iconSize*2;

  const handlePress = () => {
    pressFunc();
    setIsPressed(!isPressed);
  }

  if(!isPressed){
    return (
      <Pressable style={[styles.checkboxContainer, { backgroundColor: colors.borderGrayExtraLight, borderColor: colors.borderGrayLight, 
          width: size, height: size, minHeight: minSize, minWidth: minSize, borderRadius: borderRadius }]} 
        onPress={() => handlePress()}>
        <FontAwesome5 style={styles.iconStyles} name="check" size={iconSize} color={colors.borderGrayExtraLight} />
      </Pressable>
    )
  }else{
    return (
      <Pressable style={[ styles.checkboxContainer, { backgroundColor: colors.primary, borderColor: colors.primaryDark, 
        width: size, height: size, minHeight: minSize, minWidth: minSize, borderRadius: borderRadius }]} 
        onPress={() => handlePress()}>
          <FontAwesome5 style={styles.iconStyles} name="check" size={iconSize} color={colors.textLight} />
      </Pressable>
    )
  }
}

const styles = StyleSheet.create({
  checkboxContainer: {
    borderWidth: 2,
    paddingHorizontal: 5,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  }
})