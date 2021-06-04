import React, { useState } from "react";
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import axios from "axios";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";

import colors from "../assets/colors";
const {
  bgLight,
  buttonDarkBlue,
  buttonFlashBlue,
  deleteRed,
  darkGreyFutur,
  bgLightText,
} = colors;

import ModalDeleteAccount from "../components/ModalDeleteAccount";

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
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    try {
      await axios.delete(`${serverURL}/user/delete/${userId}`, {
        headers: { Authorization: "Bearer " + userToken },
      });
      await AsyncStorage.removeItem("onBoarding");
      setToken(null, null, null);
      setIsLoading(true);
    } catch (error) {
      setDisplayMessage({ message: "Une erreur s'est produite" });
      setIsLoading(true);
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
                secureTextEntry={!passwordVisible ? true : false}
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
              <TouchableWithoutFeedback
                onPress={() => {
                  setPasswordVisible(!passwordVisible);
                }}
              >
                <Image
                  source={
                    !passwordVisible
                      ? require("../assets/icon-eye.png")
                      : require("../assets/icon-eye-inactive.png")
                  }
                  style={styles.icon}
                  resizeMode={"contain"}
                />
              </TouchableWithoutFeedback>
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
              underlayColor={deleteRed}
              onPress={() => {
                Haptics.selectionAsync();
                setModalDeleteVisible(true);
              }}
            >
              <Text style={styles.deleteText}>Supprimer mon compte</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ModalDeleteAccount
        modalDeleteVisible={modalDeleteVisible}
        setModalDeleteVisible={setModalDeleteVisible}
        handleDeleteAccount={handleDeleteAccount}
        isLoading={isLoading}
      />
    </View>
  );
}

export default AccountInfosScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: bgLight,
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
    color: buttonDarkBlue,
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

  inputWrap: {
    alignItems: "flex-end",
    width: "90%",
  },

  textInputButton: {
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: "white",
    borderTopRightRadius: 8,
    borderColor: bgLightText,
    borderTopLeftRadius: 8,
    fontWeight: "600",
    color: buttonDarkBlue,
    paddingLeft: 15,
    borderWidth: 1,
    width: "100%",
    fontSize: 16,
    height: 53,
  },

  buttonInput: {
    borderBottomRightRadius: 8,
    backgroundColor: buttonFlashBlue,
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
    color: deleteRed,
    fontFamily: "GilroySemiBold",
  },

  delete: {
    paddingBottom: "5%",
  },

  deleteButton: {
    backgroundColor: deleteRed,
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

  icon: {
    width: 25,
    height: 25,
    position: "absolute",
    bottom: 15,
    right: 118,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: darkGreyFutur,
  },

  viewModal: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 25,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },

  iconClose: {
    alignSelf: "flex-end",
  },
});
