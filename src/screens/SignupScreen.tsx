import React, {useState} from "react";
import { View, KeyboardAvoidingView } from "react-native";
import { auth } from "../config/firebase";
import { Text } from "react-native-paper";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Formik } from "formik";
import CommonStyles from "./CommonStyles";
import { signupValidationSchema } from "../utils/ValidationSchemas";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";

const SingupScreen = (props: {
  navigation: { navigate: (arg0: string) => void };
}) => {

  const [loading,setLoading] = useState(false)

  const handleSignUp = ({ email, password }: any) => {
    setLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentiails: { user: any }) => {
        setLoading(false)
        const user = userCredentiails.user;
        if (user) {
          props.navigation.navigate("HomeScreen");
        }
      })
      .catch((error: any) => {
        setLoading(false)
        alert(error.message);
      });
  };

  const handleLogin = () => {
    props.navigation.navigate("LoginScreen");
  };

  return (
    <Formik
      initialValues={{ email: "", password: "", confirmPassword: "" }}
      validationSchema={signupValidationSchema}
      onSubmit={handleSignUp}
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
            <Text
              variant="displayLarge"
              style={CommonStyles.heading}
            >
              Sign Up
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
            <CustomInput
              value={values.confirmPassword}
              onChangeText={handleChange("confirmPassword")}
              label="Confirm Password"
              secureTextEntry
              onBlur={() => setFieldTouched("confirmPassword")}
            ></CustomInput>
            {touched.confirmPassword && errors.confirmPassword && (
              <Text>{errors.confirmPassword}</Text>
            )}
          </View>
          <View style={CommonStyles.buttonContainer}>
            <CustomButton
              mode="contained"
              handleSubmit={handleSubmit}
              title="Register"
              disabled={!isValid}
              loading={loading}
            ></CustomButton>
            <CustomButton
              mode="outlined"
              handleSubmit={handleLogin}
              title=" Login"
              disabled={false}
              loading={false}
            ></CustomButton>
          </View>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

export default SingupScreen;
