import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { Configuration, OpenAIApi } from "openai";
import { TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/AntDesign";

const HomeScreen = (props: {
  route: any;
  navigation: { navigate: (arg0: string) => void };
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [botResponses, setBotResponses] = useState<
    { query: string; answer: string | undefined }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const configuration = new Configuration({
    apiKey: props.route.params.apiKey,
  });

  const openai = new OpenAIApi(configuration);

  const res = async () => {
    setLoading(true);
    let prompt = searchQuery;
    let req = {
      model: "text-davinci-003",
      temperature: 0.5,
      max_tokens: 4000,
    };

    let obj = { ...req, prompt };
    const response = await openai.createCompletion(obj);
    const botResponsesCopy: { query: string; answer: string | undefined }[] = [
      ...botResponses,
    ];
    let mObj: { query: string; answer: string | undefined } = {
      query: "",
      answer: "",
    };
    mObj.query = searchQuery;
    mObj.answer = response.data.choices[0].text;
    botResponsesCopy.unshift(mObj);
    setBotResponses(botResponsesCopy);
    setSearchQuery("");
    setLoading(false);
  };

  const logout = async () => {
    await signOut(auth);
    props.navigation.navigate("SignupScreen");
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <SafeAreaView style={{ flex: 1, width: "100%" }}>
        <View style={styles.searchContainer}>
          <View style={styles.inputContaier}>
            <View style={styles.searchTextContainer}>
              <TextInput
                value={searchQuery}
                label="Ask your query"
                secureTextEntry={false}
                onChangeText={setSearchQuery}
                style={styles.searchTextInput}
              ></TextInput>
              {loading ? (
                <ActivityIndicator size={"small"} />
              ) : (
                <Icon name="search1" onPress={res} size={23} />
              )}
            </View>
          </View>
        </View>
        <ScrollView style={{ padding: 30, marginTop: 10 }}>
          {botResponses.map((item) => {
            return (
              <View style={{ marginTop: 20 }}>
                <Text style={styles.queryText}>{item.query}</Text>
                <Text style={styles.answerText}>{item.answer}</Text>
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.iconContainer}>
          <Icon name="poweroff" onPress={logout} size={23} />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: "100%",
  },
  inputContaier: {
    width: "80%",
    flexDirection: "row",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  queryText: {
    color: "red",
    fontWeight: "bold",
  },
  answerText: {
    marginTop: 10,
    marginLeft: 10,
  },
  iconContainer: {
    position: "absolute",
    right: 0,
    alignSelf: "center",
    padding: 20,
  },
  searchContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  searchTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  searchTextInput: {
    backgroundColor: "white",
    flex: 1,
    paddingHorizontal: 15,
    borderRadius: 10,
    margin: 5,
  },
});

export default HomeScreen;
