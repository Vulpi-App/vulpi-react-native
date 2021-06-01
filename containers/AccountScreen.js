import React, { useState, useEffect } from "react";
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/core";

import colors from "../assets/colors";
const {
  buttonFlashBlue,
  bgLight,
  buttonDarkBlue,
  buttonDisconnect,
  midGreyText,
  mainBlueText,
  bgLightText,
} = colors;

const windowHeight = Dimensions.get("window").height;
const statusBarHeight = Constants.statusBarHeight;
const scrollViewHeight = windowHeight - statusBarHeight;

function AccountScreen({ userToken, userId, setToken, serverURL }) {
  const [isLoading, setIsLoading] = useState(true);
  const [displayMessage, setDisplayMessage] = useState(null);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [picture, setPicture] = useState(null);
  const [isPictureModified, setIsPictureModified] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${serverURL}/user/${userId}`, {
        headers: {
          Authorization: "Bearer " + userToken,
        },
      });

      setFirstName(response.data.account.firstName);
      setEmail(response.data.email);

      if (response.data.account.avatar.secure_url) {
        setPicture(response.data.account.avatar.secure_url);
      }

      setIsLoading(false);
    } catch (error) {
      setDisplayMessage({
        message: "An error occurred",
        color: "error",
      });
    }
  };

  const editInformations = async () => {
    if (isPictureModified) {
      if (isPictureModified) {
        try {
          const uri = picture;
          const uriParts = uri.split(".");
          const fileType = uriParts[1];
          const formData = new FormData();
          formData.append("photo", {
            uri,
            name: `userPicture`,
            type: `image/${fileType}`,
          });
          const response = await axios.put(
            `http://localhost:3310/lists/${userId}`,
            formData,
            { headers: { Authorization: "Bearer " + userToken } }
          );
          if (response.data) {
            setPicture(response.data.photo[0].url);
          }
        } catch (error) {}
      }
      isPictureModified && setIsPictureModified(false);

      fetchData();
    } else {
    }
  };

  const uploadPicture = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.cancelled) {
        setPicture(result.uri);
        const formData = new FormData();
        formData.append("avatar", result.uri);
        const response = await axios.put(
          `${serverURL}/user/update/${userId}`,
          formData,
          { headers: { Authorization: "Bearer " + userToken } }
        );
        console.log(response.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.wrapper}>
        <View>
          <View style={styles.block}>
            <View style={styles.wrap}>
              <View style={styles.account}>
                <TouchableOpacity
                  onPress={() => {
                    uploadPicture();
                  }}
                >
                  {picture ? (
                    <Image
                      source={{
                        uri: picture,
                      }}
                      style={styles.avatar}
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={[styles.avatar, styles.viewAvatar]} />
                  )}
                </TouchableOpacity>
                <View style={styles.infos}>
                  <Text style={styles.name}>{firstName}</Text>
                  <Text style={styles.email} numberOfLines={1}>
                    {email}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.block}>
            <View style={styles.wrap}>
              <TouchableOpacity
                style={styles.navigation}
                onPress={() => {
                  navigation.navigate("AccountInfosScreen");
                }}
              >
                <View style={styles.whiteButton}>
                  <Text style={styles.blueText}>
                    👋 Mes informations personnelles
                  </Text>
                  <Image
                    source={require("../assets/icon-chevron-right-blue.png")}
                    style={styles.icon}
                    resizeMode={"contain"}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.navigation}
                onPress={() => {
                  navigation.navigate("Lists");
                }}
              >
                <View style={styles.whiteButton}>
                  <Text style={styles.blueText}>🥑{"   "}Mes listes</Text>
                  <Image
                    source={require("../assets/icon-chevron-right-blue.png")}
                    resizeMode={"contain"}
                    style={styles.icon}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.block}>
            <View style={styles.wrap}>
              <TouchableOpacity
                style={styles.feedbackButton}
                onPress={() => {
                  navigation.navigate("FeedbackScreen");
                }}
              >
                <View style={styles.blueButton}>
                  <Text style={styles.whiteText}>
                    🚀{"   "}J'ai une suggestion pour Vulpi
                  </Text>
                  <Image
                    source={require("../assets/icon-chevron-right-white.png")}
                    resizeMode={"contain"}
                    style={styles.icon}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.block}>
          <View style={styles.wrap}>
            <Image
              source={require("../assets/icon-logout.png")}
              style={styles.logoutImage}
              resizeMode={"contain"}
            />
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => {
                setToken(null, null);
              }}
            >
              <Text style={styles.logoutText}>Déconnexion</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export default AccountScreen;

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

  account: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: "10%",
    marginLeft: "5%",
  },

  block: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "5%",
  },

  wrap: {
    justifyContent: "center",
    width: "90%",
  },

  name: {
    marginBottom: "5%",
    fontWeight: "600",
    color: buttonDarkBlue,
    fontSize: 23,
    fontFamily: "GilroySemiBold",
  },

  email: {
    color: midGreyText,
    fontSize: 16,
    width: 200,
    fontFamily: "GilroyRegular",
  },

  avatar: {
    borderRadius: 150,
    marginRight: 30,
    height: 85,
    width: 85,
  },

  viewAvatar: {
    backgroundColor: buttonFlashBlue,
  },

  navigation: {
    marginTop: "3%",
  },

  whiteButton: {
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderColor: bgLightText,
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 10,
    borderWidth: 1,
    width: "100%",
    height: 58,
  },

  blueText: {
    fontWeight: "600",
    marginLeft: "5%",
    color: mainBlueText,
    fontSize: 16,
    fontFamily: "GilroySemiBold",
  },

  icon: {
    marginRight: "3%",
    height: 15,
    width: 15,
  },

  feedbackButton: {
    marginTop: "15%",
  },

  blueButton: {
    justifyContent: "space-between",
    backgroundColor: buttonFlashBlue,
    borderColor: bgLightText,
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 10,
    borderWidth: 1,
    width: "100%",
    height: 58,
  },

  whiteText: {
    fontWeight: "600",
    marginLeft: "5%",
    color: "white",
    fontSize: 16,
    fontFamily: "GilroySemiBold",
  },

  logoutButton: {
    backgroundColor: buttonDisconnect,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 19,
    height: 67,
  },

  logoutText: {
    fontWeight: "600",
    color: buttonDarkBlue,
    fontSize: 18,
    fontFamily: "GilroySemiBold",
  },

  logoutImage: {
    position: "absolute",
    marginLeft: "5%",
    height: 20,
    zIndex: 1,
    width: 20,
  },
});
