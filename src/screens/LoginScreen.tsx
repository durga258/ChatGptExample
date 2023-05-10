import React, { useState } from "react";
import { View, KeyboardAvoidingView } from "react-native";
import { Text } from "react-native-paper";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Formik } from "formik";
import CommonStyles from "./CommonStyles";
import { loginValidationSchema } from "../utils/ValidationSchemas";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";

const LoginScreen = (props: {
  navigation: { navigate: (arg0: string) => void };
}) => {
  const [loading, setLoading] = useState(false);

  const handleSignUp = () => {
    props.navigation.navigate("SignupScreen");
  };

  const handleLogin = ({ email, password }: any) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentiails: { user: any }) => {
        setLoading(false);
        const user = userCredentiails.user;
        if (user) {
          props.navigation.navigate("AddingKeysScreen");
        }
      })
      .catch((error: any) => {
        setLoading(false);
        alert(error.message);
      });
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={loginValidationSchema}
      onSubmit={handleLogin}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        setFieldTouched,
        isValid,
        handleSubmit,
      }) => (
        <KeyboardAvoidingView style={CommonStyles.container} behavior="padding">
          <View style={CommonStyles.inputContaier}>
            <Text variant="displayLarge" style={CommonStyles.heading}>
              Log in
            </Text>
            <CustomInput
              value={values.email}
              onChangeText={handleChange("email")}
              label="Email"
              secureTextEntry={false}
              onBlur={() => setFieldTouched("email")}
            ></CustomInput>
            {touched.email && errors.email && <Text>{errors.email}</Text>}
            <CustomInput
              value={values.password}
              onChangeText={handleChange("password")}
              label="Password"
              secureTextEntry
              onBlur={() => setFieldTouched("password")}
            ></CustomInput>
            {touched.password && errors.password && (
              <Text>{errors.password}</Text>
            )}
          </View>
          <View style={CommonStyles.buttonContainer}>
            <CustomButton
              mode="contained"
              handleSubmit={handleSubmit}
              title="Login"
              disabled={!isValid}
              loading={loading}
            ></CustomButton>
            <CustomButton
              mode="outlined"
              handleSubmit={handleSignUp}
              title="Register"
              disabled={false}
              loading={false}
            ></CustomButton>
          </View>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

export default LoginScreen;
