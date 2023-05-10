import React from "react";
import { GestureResponderEvent, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

type Props = {
  title: string
  mode: "text" | "outlined" | "contained" | "elevated" | "contained-tonal";
  handleSubmit: any;
  disabled:boolean
  loading:boolean

};

const CustomButton = (props: Props) => {
  return (
    <Button
      onPress={props.handleSubmit}
      mode={props.mode}
      style={styles.button}
      disabled={props.disabled}
      loading={props.loading}
    >
      {props.title}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
});

export default CustomButton
