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
      const response = await axios.get(
        // `http://localhost:3000/user/${userId}`,
        `${serverURL}/user/${userId}`,
        {
          headers: {
            Authorization: "Bearer " + userToken,
          },
        }
      );

      console.log(response.data);
      setFirstName(response.data.account.firstName);
      setEmail(response.data.email);

      if (response.data.photo) {
        setPicture(response.data.photo[0].url);
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
        if (!isPictureModified) {
          setIsPictureModified(true);
        }
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
                  <Image
                    source={{ uri: picture }}
                    style={styles.avatar}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
                <View style={styles.infos}>
                  <Text style={styles.name}>{firstName}</Text>
                  <Text style={styles.email}>{email}</Text>
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
                    👋{"   "}Mes informations personnelles
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
                  <Text style={styles.blueText}>🥑{"   "}Ma liste</Text>
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
    color: "#232952",
    fontSize: 23,
  },

  email: {
    color: "#5F616A",
    fontSize: 16,
  },

  avatar: {
    borderRadius: 150,
    marginRight: 30,
    height: 85,
    width: 85,
  },

  navigation: {
    marginTop: "3%",
  },

  whiteButton: {
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderColor: "#EEEEEE",
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
    color: "#181725",
    fontSize: 16,
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
    backgroundColor: "#3443B9",
    borderColor: "#EEEEEE",
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
  },

  logoutButton: {
    backgroundColor: "#E3E3EE",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 19,
    height: 67,
  },

  logoutText: {
    fontWeight: "600",
    color: "#232952",
    fontSize: 18,
  },

  logoutImage: {
    position: "absolute",
    marginLeft: "5%",
    height: 20,
    zIndex: 1,
    width: 20,
  },
});
