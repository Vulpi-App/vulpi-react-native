// Tools;
// import React from "react";
// import { Text, View, Button } from "react-native";

// const AccountScreen = ({ navigation }) => {
//   return (
//     <View>
//       <Text>AccountScreen</Text>
//       <Button
//         title="Go to Account Infos Screen"
//         onPress={() => {
//           navigation.navigate("AccountInfos");
//         }}
//       />
//       <Button
//         title="Go to Account Settings Screen"
//         onPress={() => {
//           navigation.navigate("SettingsScreen");
//         }}
//       />
//       <Button
//         title="Go to Account Feedback Screen"
//         onPress={() => {
//           navigation.navigate("FeedbackScreen");
//         }}
//       />
//     </View>
//   );
// };

// export default AccountScreen;

import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";

const windowHeight = Dimensions.get("window").height;
const statusBarHeight = Constants.statusBarHeight;
const scrollViewHeight = windowHeight - statusBarHeight;

function AccountScreen({ userToken, userId, setToken, setId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState(null);
  const [isPictureModified, setIsPictureModified] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get(
      `https://express-airbnb-api.herokuapp.com/user/${userId}`,
      { headers: { Authorization: "Bearer " + userToken } }
    );
    setUserName(response.data.username);
    setEmail(response.data.email);
    if (response.data.photo) {
      setPicture(response.data.photo[0].url);
    }
    setIsLoading(false);
  };

  const editInformations = async () => {
    if (isPictureModified) {
      setIsLoading(true);
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
            `https://express-airbnb-api.herokuapp.com/user/upload_picture`,
            formData,
            { headers: { Authorization: "Bearer " + userToken } }
          );
          if (response.data) {
            setPicture(response.data.photo[0].url);
          }
        } catch (error) {}
      }
      isPictureModified && setIsPictureModified(false);
      setIsLoading(false);
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
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar barStyle="dark-content" />
      {isLoading ? (
        <ActivityIndicator
          color="white"
          size="large"
          style={styles.activityIndicator}
        />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.top}>
            <View style={styles.container}>
              <View style={styles.wrap}>
                <View style={styles.topView}>
                  <TouchableOpacity
                    style={styles.picture}
                    onPress={() => {
                      uploadPicture();
                    }}
                  >
                    <Image
                      source={{ uri: picture }}
                      style={styles.picture}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                  <View style={styles.texts}>
                    <Text style={{ fontSize: 23, marginBottom: "5%" }}>
                      {userName}
                    </Text>
                    <Text style={{ fontSize: 16, color: "#5F616A" }}>
                      {email}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.container}>
              <View style={styles.wrap}>
                <View style={styles.whiteWrap}>
                  <TouchableOpacity style={styles.whiteButton}>
                    <View
                      style={styles.btnWhite}
                      underlayColor="#FFBAC0"
                      onPress={() => {}}
                    >
                      <View style={styles.buttonWrap}>
                        <Text style={styles.textWhite}>
                          👋 Mes informations personnelles
                        </Text>
                        <Image
                          source={require("../assets/chevron-black.png")}
                          style={styles.image}
                          resizeMode={"contain"}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.whiteButton}>
                    <View
                      style={styles.btnWhite}
                      underlayColor="#FFBAC0"
                      onPress={() => {}}
                    >
                      <View style={styles.buttonWrap}>
                        <Text style={styles.textWhite}>🥑 Ma liste</Text>
                        <Image
                          source={require("../assets/chevron-black.png")}
                          style={styles.image}
                          resizeMode={"contain"}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.container}>
              <View style={styles.wrap}>
                <TouchableOpacity style={styles.blueButton}>
                  <View
                    style={styles.btnBlue}
                    underlayColor="#FFBAC0"
                    onPress={() => {}}
                  >
                    <View style={styles.buttonWrap}>
                      <Text style={styles.textBlue}>
                        🚀 J'ai une suggestion pour Vulpi
                      </Text>
                      <Image
                        source={require("../assets/chevron-white.png")}
                        style={styles.image}
                        resizeMode={"contain"}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.bottom}>
            <View style={styles.container}>
              <View style={styles.wrap}>
                <Image
                  source={require("../assets/logout.png")}
                  style={styles.logout}
                  resizeMode={"contain"}
                />
                <TouchableOpacity
                  style={styles.deleteButton}
                  underlayColor="#eaeaf2"
                  onPress={() => {
                    setToken();
                    setId();
                  }}
                >
                  <Text style={styles.deleteText}>Déconnexion</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
export default AccountScreen;
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
  top: { paddingTop: "10%" },
  bottom: { paddingBottom: "5%" },
  whiteButton: { paddingTop: "10%" },
  whiteWrap: { marginTop: "15%" },
  whiteButton: { marginBottom: "3%" },
  blueButton: { marginTop: "25%" },
  container: { justifyContent: "center", alignItems: "center" },
  wrap: { justifyContent: "center", width: "90%" },
  topView: { marginLeft: "5%", alignItems: "center", flexDirection: "row" },
  picture: { height: 85, width: 85, borderRadius: 150, marginRight: 30 },
  image: { width: "5%", height: "100%" },
  logout: {
    width: "5%",
    height: "30%",
    position: "absolute",
    marginLeft: "5%",
    zIndex: 1,
  },
  buttonWrap: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  texts: { fontSize: 23, position: "relative" },
  view: { height: 30 },
  deleteButton: {
    backgroundColor: "#E3E3EE",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 19,
    height: 67,
  },
  deleteText: { fontWeight: "600", color: "#232952", fontSize: 18 },
  btn: {
    height: 58,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: 10,
    paddingLeft: "5%",
    marginBottom: "3%",
    flexDirection: "row",
  },
  text: { color: "#181725", fontWeight: "600", fontSize: 16 },
  btnWhite: {
    height: 58,
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textWhite: { color: "#181725", fontWeight: "600", fontSize: 16 },
  btnBlue: {
    height: 58,
    width: "100%",
    backgroundColor: "#3443B9",
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textBlue: { color: "white", fontWeight: "600", fontSize: 16 },
});
