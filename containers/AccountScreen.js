import React, { useState, useEffect } from "react";
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  FlatList,
} from "react-native";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/core";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";

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

import AddAvatarModal from "../components/AddAvatarModal";

const windowHeight = Dimensions.get("window").height;
const statusBarHeight = Constants.statusBarHeight;
const scrollViewHeight = windowHeight - statusBarHeight;

function AccountScreen({
  setToken,
  email,
  firstName,
  avatar,
  setAvatar,
  displayMessage,
  setDisplayMessage,
  editInformation,
  serverURL,
  userToken,
  userId,
  reload,
  setReload,
  setReloadUser,
}) {
  const [userLists, setUserLists] = useState([]);
  const [userListsVisible, setUserListsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [modalPictureVisible, setModalPictureVisible] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${serverURL}/lists/${userId}`, {
          headers: { Authorization: "Bearer " + userToken },
        });
        setUserLists(response.data);
        setReload(false);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [reload]);

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
                    setModalPictureVisible(true);
                  }}
                >
                  {avatar ? (
                    <Image
                      source={{
                        uri: avatar,
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
                  setDisplayMessage({ message: null });
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
                  setUserListsVisible(!userListsVisible);
                }}
              >
                <View style={styles.whiteButton}>
                  <Text style={styles.blueText}>🗒 Mes listes</Text>
                  {isLoading ? (
                    <ActivityIndicator />
                  ) : !userListsVisible ? (
                    <Image
                      source={require("../assets/icon-chevron-right-blue.png")}
                      resizeMode={"contain"}
                      style={styles.icon}
                    />
                  ) : (
                    <AntDesign
                      name="down"
                      size={18}
                      color={mainBlueText}
                      style={styles.icon}
                    />
                  )}
                </View>
              </TouchableOpacity>
              {userListsVisible && (
                <View style={styles.flatListView}>
                  <FlatList
                    data={userLists.lists}
                    keyExtractor={(item) => String(item._id)}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={[styles.whiteButton, styles.listView]}
                        onPress={() => {
                          navigation.navigate("EditListScreen", {
                            id: item._id,
                          });
                        }}
                      >
                        <Text style={styles.blueText} numberOfLines={1}>
                          {item.emoji} {item.title}
                        </Text>
                        <Image
                          source={require("../assets/icon-chevron-right-blue.png")}
                          resizeMode={"contain"}
                          style={styles.listIcon}
                        />
                      </TouchableOpacity>
                    )}
                  />
                </View>
              )}
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
          <Text style={styles.withLove}>Made with ❤️ in Paris</Text>
        </View>
      </View>
      <AddAvatarModal
        avatar={avatar}
        setAvatar={setAvatar}
        setModalPictureVisible={setModalPictureVisible}
        editInformation={editInformation}
        modalPictureVisible={modalPictureVisible}
      />
    </View>
  );
}

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: bgLight,
    height: "100%",
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
    paddingRight: "3%",
  },

  flatListView: {
    maxHeight: 130,
  },

  listView: {
    width: "90%",
    height: 50,
  },

  blueText: {
    fontWeight: "600",
    marginLeft: "5%",
    color: mainBlueText,
    fontSize: 16,
    fontFamily: "GilroySemiBold",
    maxWidth: "80%",
  },

  icon: {
    height: 15,
    width: 15,
  },

  listIcon: {
    height: 10,
    width: 10,
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
    paddingRight: "3%",
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
  withLove: {
    marginTop: "5%",
    color: "#3C3C3C",
    fontWeight: "600",
    fontSize: 15,
    position: "relative",
    fontFamily: "GilroySemiBold",
  },
});
