import React, { useEffect, useState } from "react";
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

function AccountInfosScreen({ userToken, userId, serverURL, setToken }) {
  const [displayMessage, setDisplayMessage] = useState(null);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(null);
  const [isInfosModified, setIsInfosModified] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${serverURL}/user/${userId}`, {
        headers: { Authorization: "Bearer " + userToken },
      });
      setUserName(response.data.account.firstName);
      setEmail(response.data.email);
      setPassword(response.data.password);
    } catch (error) {
      setDisplayMessage({ message: "Une erreur s'est produite" });
    }
  };

  const editInformations = async (data) => {
    setDisplayMessage(false);
    if (isInfosModified) {
      try {
        const formData = new FormData();
        if (data === "email") {
          formData.append("email", email);
        } else if (data === "password") {
          formData.append("password", password);
        } else if (data === "userName") {
          formData.append("firstName", userName);
        }

        const response = await axios.put(
          `${serverURL}/user/update/${userId}`,
          formData,
          { headers: { Authorization: "Bearer " + userToken } }
        );
        if (response.data) {
          setUserName(response.data.username);
          setEmail(response.data.email);
          setDisplayMessage({ message: "Votre profil a été mis a jour." });
        } else {
          setDisplayMessage({ message: "Une erreur s'est produite" });
        }
      } catch (error) {
        setDisplayMessage({ message: error.response.data.error });
      }

      isInfosModified && setIsInfosModified(false);

      fetchData();
    } else {
      setDisplayMessage({ message: "Modifier au moins une information" });
    }
  };

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
                value={userName}
                onChangeText={(text) => {
                  setUserName(text);
                  if (setDisplayMessage) {
                    setDisplayMessage(false);
                  }

                  setIsInfosModified(true);
                }}
              />
              <TouchableOpacity
                style={styles.buttonInput}
                onPress={() => {
                  editInformations("userName");
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
                    setDisplayMessage(false);
                  }

                  setIsInfosModified(true);
                }}
              />
              <TouchableOpacity
                style={styles.buttonInput}
                onPress={() => {
                  editInformations("email");
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
                    setDisplayMessage(false);
                  }
                  setIsInfosModified(true);
                }}
              />
              <TouchableOpacity
                style={styles.buttonInput}
                onPress={() => {
                  editInformations("password");
                }}
              >
                <Text style={styles.buttonText}>modifier</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.messageWrap}>
              {displayMessage && (
                <Text style={styles.messageText}>{displayMessage.message}</Text>
              )}
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
