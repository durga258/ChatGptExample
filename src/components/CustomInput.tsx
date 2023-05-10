import React from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

type Props = {
  value: string;
  label: string;
  secureTextEntry : boolean ;
  onChangeText: ((text: string) => void) & Function;
  onBlur:(args: any) => void
};

const CustomInput = (props: Props) => {
  return <TextInput {...props} style={styles.input}></TextInput>;
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    margin: 5,
  },
});

export default CustomInput;
