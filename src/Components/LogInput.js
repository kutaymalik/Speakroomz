import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import tw from "tailwind-react-native-classnames";
export default function LogInput({
  isPassword = false,
  onSubmitEditing,
  placeholder,
  onChangeText,
}) {
  return (
    <TextInput
      onSubmitEditing={onSubmitEditing}
      onChangeText={onChangeText}
      placeholder={placeholder}
      selectionColor="white"
      placeholderTextColor="#a1a1a1"
      secureTextEntry={isPassword}
      style={styles.input_container}
    />
  );
}

const styles = StyleSheet.create({
  input_container: {
    width: 300,
    borderBottomWidth: 1,
    padding: 10,
    margin: 10,
    fontSize: 18,
    paddingLeft: 0,
    paddingBottom: 2,
    borderColor: 'white',
    placeholderTextColor: 'white',
    color: 'white',
    fontWeight: '500'
  }
});