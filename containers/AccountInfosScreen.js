// Tools;
// import React from "react";
// import { Text } from "react-native";

// const AccountInfosScreen = () => {
//   return <Text>AccountInfosScreen</Text>;
// };

// export default AccountInfosScreen;

import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import axios from "axios";
import Constants from "expo-constants";

const windowHeight = Dimensions.get("window").height;
const statusBarHeight = Constants.statusBarHeight;
const scrollViewHeight = windowHeight - statusBarHeight;

function AccountInfosScreen({ userToken, userId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [displayMessage, setDisplayMessage] = useState(null);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(null);
  const [isInfosModified, setIsInfosModified] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://express-airbnb-api.herokuapp.com/user/${userId}`,
        { headers: { Authorization: "Bearer " + userToken } }
      );
      setUserName(response.data.username);
      setEmail(response.data.email);
      setPassword(response.data.password);
      setIsLoading(false);
    } catch (error) {
      setDisplayMessage({ message: "Une erreur s'est produite" });
    }
  };
  const editInformations = async () => {
    setDisplayMessage(false);
    if (isInfosModified) {
      setIsLoading(true);
      if (isInfosModified) {
        try {
          const obj = {};
          obj.email = email;
          obj.username = userName;
          const response = await axios.put(
            `https://express-airbnb-api.herokuapp.com/user/update`,
            obj,
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
      }
      isInfosModified && setIsInfosModified(false);
      setIsLoading(false);
      fetchData();
    } else {
      setDisplayMessage({ message: "Modifier au moins une information" });
    }
  };
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar barStyle="dark-content" />
      {isLoading ? (
        <ActivityIndicator size="large" style={styles.activityIndicator} />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.top}>
            <View style={styles.container}>
              <View style={styles.wrap}>
                <View style={styles.buttonWrap}>
                  <View
                    style={styles.backButton}
                    underlayColor="#0C166D"
                    onPress={() => {}}
                  >
                    <Image
                      source={require("../assets/icon-chevron.png")}
                      style={styles.image}
                      resizeMode={"contain"}
                    />
                    <Text style={styles.backText}>
                      Mes informations personnelles
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <Text style={styles.title}>Prénom</Text>
            <View style={styles.container}>
              <View style={styles.wrap}>
                <TextInput
                  style={styles.textInput}
                  autoCapitalize="none"
                  textContentType="none"
                  value={userName}
                  onChangeText={(text) => {
                    setUserName(text);
                    if (setDisplayMessage) {
                      setDisplayMessage(false);
                    }
                    if (setIsInfosModified) {
                      setIsInfosModified(true);
                    }
                  }}
                />
              </View>
            </View>
            <Text style={styles.title}>Adresse e-mail</Text>
            <View style={styles.container}>
              <View style={styles.wrap}>
                <View style={styles.inputWrap}>
                  <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    textContentType="none"
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text);
                      if (setDisplayMessage) {
                        setDisplayMessage(false);
                      }
                      if (setIsInfosModified) {
                        setIsInfosModified(true);
                      }
                    }}
                  />
                  <TouchableHighlight
                    style={styles.buttonInput}
                    underlayColor="#5f6cd2"
                    onPress={() => {
                      editInformations();
                    }}
                  >
                    <Text style={styles.buttonText}>modifier</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
            <Text style={styles.title}>Mot de passe</Text>
            <View style={styles.container}>
              <View style={styles.wrap}>
                <View style={styles.inputWrap}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="***************"
                    autoCapitalize="none"
                    textContentType="none"
                    value={password}
                    onChangeText={(text) => {
                      setPassword(text);
                      if (setDisplayMessage) {
                        setDisplayMessage(false);
                      }
                      if (setIsInfosModified) {
                        setIsInfosModified(true);
                      }
                    }}
                  />
                  <TouchableHighlight
                    style={styles.buttonInput}
                    underlayColor="#5f6cd2"
                    onPress={() => {
                      editInformations();
                    }}
                  >
                    <Text style={styles.buttonText}>modifier</Text>
                  </TouchableHighlight>
                </View>
                <View style={styles.messageWrap}>
                  {displayMessage && (
                    <Text style={styles.messageText}>
                      {displayMessage.message}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          </View>
          <View style={styles.bottom}>
            <View style={styles.container}>
              <View style={styles.wrap}>
                <TouchableHighlight
                  style={styles.deleteButton}
                  underlayColor="#e24d4d"
                  onPress={() => {}}
                >
                  <Text style={styles.deleteText}>Supprimer mon compte</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
export default AccountInfosScreen;

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: "#F7F7F8",
    width: scrollViewHeight,
    width: "100%",
    flex: 1,
  },

  scrollView: {
    justifyContent: "space-between",
    height: "100%",
    width: "100%",
  },

  top: {
    paddingTop: "10%",
  },

  bottom: {
    paddingBottom: "5%",
  },

  container: {
    justifyContent: "center",
    alignItems: "center",
  },

  wrap: {
    justifyContent: "center",
    width: "90%",
  },

  buttonWrap: {
    flexDirection: "row",
    paddingBottom: "5%",
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
    width: "50%",
  },

  title: {
    paddingLeft: "5%",
    fontWeight: "600",
    paddingBottom: 10,
    paddingTop: 20,
    fontSize: 14,
  },

  inputWrap: {
    alignItems: "flex-end",
  },

  textInput: {
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
  },

  messageWrap: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "10%",
  },

  messageText: {
    color: "#3443B9",
    fontSize: 12,
  },

  deleteButton: {
    backgroundColor: "#CA2121",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 19,
    height: 67,
  },

  deleteText: {
    fontWeight: "600",
    color: "white",
    fontSize: 18,
  },
});
