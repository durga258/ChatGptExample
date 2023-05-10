import React, { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
} from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { List } from "react-native-paper";

const AddingKeysScreen = (props: {
  navigation: { navigate: (arg0: string) => void };
}) => {
  const [apiKey, setApiKey] = useState("");
  const [listOfApiKeys, setListOfApiKeys] = useState<string[]>([]);

  const navigateToHomeScreen = () => {
    if (listOfApiKeys.length) {
      props.navigation.navigate("HomeScreen", { apiKey: listOfApiKeys[0] });
    } else {
      alert("Please add atleast one Openai API key");
    }
  };

  const AddApiKey = () => {
    if (apiKey.trim()) {
      const listOfApiKeysCopy: string[] = [...listOfApiKeys];
      listOfApiKeysCopy.unshift(apiKey);
      setListOfApiKeys(listOfApiKeysCopy);
      setApiKey("");
    } else {
      alert("Please enter the API key");
    }
  };

  const DeleteApiKey = (index: number) => {
    const listOfApiKeysCopy = [...listOfApiKeys];
    listOfApiKeysCopy.splice(index, 1);
    setListOfApiKeys(listOfApiKeysCopy);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContaier}>
        <CustomInput
          value={apiKey}
          onChangeText={setApiKey}
          label="Api key"
          secureTextEntry={false}
          onBlur={() => {}}
        ></CustomInput>

        {listOfApiKeys.map((item, index) => {
          return (
            <View style={styles.listContainer}>
              <View style={{ flex: 1 }}>
                <List.Item
                  title={item}
                  left={(props) => <List.Icon {...props} icon="key" />}
                />
              </View>
              <TouchableOpacity onPress={() => DeleteApiKey(index)}>
                <Text>Remove</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          mode="contained"
          handleSubmit={AddApiKey}
          title="Add Key"
          disabled={false}
          loading={false}
        ></CustomButton>
        <CustomButton
          mode="outlined"
          handleSubmit={navigateToHomeScreen}
          title="Try Chatbot"
          disabled={false}
          loading={false}
        ></CustomButton>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContaier: {
    width: "80%",
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  listContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AddingKeysScreen;
