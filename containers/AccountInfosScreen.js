import React, { useState } from "react";
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowHeight = Dimensions.get("window").height;
const statusBarHeight = Constants.statusBarHeight;
const scrollViewHeight = windowHeight - statusBarHeight;

function AccountInfosScreen({
  userToken,
  userId,
  serverURL,
  setToken,
  email,
  setEmail,
  firstName,
  setFirstName,
  password,
  setPassword,
  displayMessage,
  setDisplayMessage,
  editInformation,
}) {
  const [isInfosModified, setIsInfosModified] = useState(false);
  const navigation = useNavigation();

  const handleDeleteAccount = async () => {
    try {
      await axios.delete(`${serverURL}/user/delete/${userId}`, {
        headers: { Authorization: "Bearer " + userToken },
      });
      await AsyncStorage.removeItem("onBoarding");
      setToken(null, null, null);
    } catch (error) {
      setDisplayMessage({ message: "Une erreur s'est produite" });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.wrapper}>
        <View>
          <View style={styles.block}>
            <TouchableOpacity
              style={styles.navigation}
              onPress={() => {
                navigation.navigate("AccountScreen");
              }}
            >
              <View style={styles.backButton}>
                <Image
                  source={require("../assets/icon-chevron-left-blue.png")}
                  style={styles.image}
                  resizeMode={"contain"}
                />
                <Text style={styles.backText}>
                  Mes informations personnelles
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>Prénom</Text>
          <View style={styles.block}>
            <View style={styles.inputWrap}>
              <TextInput
                style={styles.textInputButton}
                value={firstName}
                onChangeText={(text) => {
                  setFirstName(text);
                  if (setDisplayMessage) {
                    setDisplayMessage({ message: null });
                  }
                  setIsInfosModified(true);
                }}
              />
              <TouchableOpacity
                style={styles.buttonInput}
                onPress={() => {
                  editInformation("firstName", isInfosModified);
                  setIsInfosModified(false);
                }}
              >
                <Text style={styles.buttonText}>modifier</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.title}>Adresse e-mail</Text>
          <View style={styles.block}>
            <View style={styles.inputWrap}>
              <TextInput
                style={styles.textInputButton}
                autoCapitalize="none"
                textContentType="none"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (setDisplayMessage) {
                    setDisplayMessage({ message: null });
                  }

                  setIsInfosModified(true);
                }}
              />
              <TouchableOpacity
                style={styles.buttonInput}
                onPress={() => {
                  editInformation("email", isInfosModified);
                  setIsInfosModified(false);
                }}
              >
                <Text style={styles.buttonText}>modifier</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.title}>Mot de passe</Text>
          <View style={styles.block}>
            <View style={styles.inputWrap}>
              <TextInput
                style={styles.textInputButton}
                placeholder="••••••••••"
                secureTextEntry={true}
                autoCapitalize="none"
                textContentType="none"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (setDisplayMessage) {
                    setDisplayMessage({ message: null });
                  }
                  setIsInfosModified(true);
                }}
              />
              <TouchableOpacity
                style={styles.buttonInput}
                onPress={() => {
                  editInformation("password", isInfosModified);
                  setIsInfosModified(false);
                }}
              >
                <Text style={styles.buttonText}>modifier</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.messageWrap}>
              <Text>{displayMessage.message}</Text>
            </View>
          </View>
        </View>
        <View style={styles.delete}>
          <View style={styles.block}>
            <TouchableOpacity
              style={styles.deleteButton}
              underlayColor="#e24d4d"
              onPress={handleDeleteAccount}
            >
              <Text style={styles.deleteText}>Supprimer mon compte</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export default AccountInfosScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F7F7F8",
    width: scrollViewHeight,
    width: "100%",
  },

  wrapper: {
    justifyContent: "space-between",
    paddingTop: "20%",
    height: "100%",
    width: "100%",
  },

  block: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  navigation: {
    marginBottom: "10%",
  },

  backButton: {
    flexDirection: "row",
    width: "100%",
  },

  image: {
    marginRight: 25,
    height: "30%",
    marginTop: 5,
    width: "5%",
  },

  backText: {
    fontWeight: "600",
    color: "#232952",
    fontSize: 23,
    width: "75%",
    fontFamily: "GilroySemiBold",
    lineHeight: 26.95,
  },

  title: {
    paddingLeft: "5%",
    fontWeight: "600",
    paddingBottom: 10,
    paddingTop: 20,
    fontSize: 14,
    fontFamily: "GilroySemiBold",
  },

  inputText: {
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: "white",
    borderTopRightRadius: 8,
    borderColor: "#EEEEEE",
    borderTopLeftRadius: 8,
    fontWeight: "600",
    color: "#9A9A9A",
    paddingLeft: 15,
    borderWidth: 1,
    width: "90%",
    fontSize: 16,
    height: 53,
  },

  inputWrap: {
    alignItems: "flex-end",
    width: "90%",
  },

  textInputButton: {
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: "white",
    borderTopRightRadius: 8,
    borderColor: "#EEEEEE",
    borderTopLeftRadius: 8,
    fontWeight: "600",
    color: "#9A9A9A",
    paddingLeft: 15,
    borderWidth: 1,
    width: "100%",
    fontSize: 16,
    height: 53,
  },

  buttonInput: {
    borderBottomRightRadius: 8,
    backgroundColor: "#3443B9",
    borderBottomLeftRadius: 0,
    justifyContent: "center",
    borderTopRightRadius: 8,
    borderTopLeftRadius: 0,
    alignItems: "center",
    position: "absolute",
    height: 53,
    width: 112,
  },

  buttonText: {
    fontWeight: "600",
    color: "white",
    fontSize: 14,
    fontFamily: "GilroySemiBold",
  },

  messageWrap: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "10%",
  },

  messageText: {
    color: "#CA2121",
    fontFamily: "GilroySemiBold",
  },

  delete: {
    paddingBottom: "5%",
  },

  deleteButton: {
    backgroundColor: "#CA2121",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 19,
    height: 67,
    width: "90%",
  },

  deleteText: {
    fontWeight: "600",
    color: "white",
    fontSize: 18,
    fontFamily: "GilroySemiBold",
  },
});
