import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useRef } from "react";
import colors from "../../assets/colors/colors";

const Input = ({keyboardType, value, onChangeText, placeholder, secureTextEntry, icon, editable, multiline, textArea, maxLength, disabled, borderColor = colors.border, capitalize='sentences'}) => {
    const inputRef = useRef(null);useRef

    const handleInputWrapperClick = () => {
        if (textArea && inputRef.current) {
            inputRef.current.focus();
        }
    };
    
  
    return (
    <View 
        style={[
            styles.inputWrapper, 
            textArea ? { height: 120, alignItems: 'flex-start' } : {alignItems:'center'},
            disabled && { backgroundColor: colors.disabled} ,
            {borderColor: borderColor}
        ]}
        onTouchStart={handleInputWrapperClick}
    >
        {icon}
        <TextInput
            keyboardType={keyboardType}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            style={[
                styles.inputTextStyles, 
                disabled && { color: colors.textGraySecondary } 
            ]}
            editable={editable}
            multiline={multiline}
            maxLength={maxLength}
            ref={inputRef}
            autoCapitalize={capitalize}
        />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
    inputWrapper: {
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        overflow: 'scroll',
    },
    inputTextStyles: {
        fontSize: 14,
        color: colors.textGraySecondary,
        marginLeft: 10,
    },
});