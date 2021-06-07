// Tools
import React, { useState, useEffect, useRef } from "react";
import {
  ScrollView,
  SafeAreaView,
  Platform,
  Text,
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

// Colors - import
import colors from "../assets/colors";
const { bgLight, mainLightGrey, buttonDarkBlue, buttonFlashBlue, white } =
  colors;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/notifications
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Mattéo est en route pour faire les courses 🥑",
    body: "Profitez-en pour ajouter un article à la liste de courses ! 🛒",
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

const ListScreen = ({ navigation }) => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const handleSubmit = async () => {
    await sendPushNotification(expoPushToken);
  };

  return (
    <View style={styles.screen}>
      <ScrollView style={[styles.wrapper, styles.scrollView]}>
        <SafeAreaView>
          <StatusBar style="dark" />

          <View style={styles.container}>
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack("ListsScreen");
                }}
              >
                <View style={styles.backButton}>
                  <Image
                    source={require("../assets/icon-chevron-left-blue.png")}
                    style={styles.image}
                    resizeMode={"contain"}
                  />
                  <Text style={styles.backText}>Notifications</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* <TouchableOpacity onPress={async () => {
              await sendPushNotification(expoPushToken);
            }}>

              <Text>Notifications</Text>
            </TouchableOpacity> */}

            <View style={styles.buttonWrap}>
              <View>
                <TouchableOpacity
                  style={styles.buttonBlue}
                  onPress={handleSubmit}
                >
                  <Text style={styles.buttonTextBlue}>
                    "👋 Je vais faire les courses !"
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.asterisk}>
                * Prévenez les autres que vous allez faire les courses
              </Text>
            </View>

            <View style={styles.cardWrap}>
              <View>
                <Text style={styles.emoji}>🛒</Text>
              </View>
              <View>
                <Text>
                  <Text style={styles.bold}>Pauline</Text> part faire les
                  courses !
                </Text>
                <Text>"Courses maison"</Text>
                <Text style={styles.date}>Aujourd'hui à 18:10</Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: bgLight,
    flex: 1,
  },
  scrollView: {
    paddingTop: 20,
  },
  wrapper: {
    width: "94%",
    marginTop: 0,
    marginBottom: 20,
    marginLeft: "auto",
    marginRight: "auto",
  },
  container: {
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    paddingTop: 20,
  },
  bold: {
    fontWeight: "bold",
  },
  backButton: {
    flexDirection: "row",
    width: "100%",
  },
  image: {
    marginRight: 25,
    height: "50%",
    marginTop: 5,
    width: "5%",
  },
  backText: {
    color: buttonDarkBlue,
    fontSize: 23,
    width: "75%",
    fontFamily: "GilroySemiBold",
    lineHeight: 26.95,
  },
  buttonWrap: {
    flexDirection: "row",
    marginBottom: 80,
    marginTop: 30,
  },
  buttonBlue: {
    backgroundColor: buttonFlashBlue,
    borderRadius: 8,
    padding: 15,
    textAlign: "center",
    shadowColor: buttonFlashBlue,
    shadowOpacity: 1,
    shadowOffset: { height: 1 },
  },
  buttonTextBlue: {
    color: white,
    textAlign: "center",
    fontFamily: "GilroyBold",
  },
  asterisk: {
    width: "35%",
    marginLeft: 15,
    fontSize: 11,
  },
  cardWrap: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    paddingRight: 50,
    paddingLeft: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  emoji: {
    fontSize: 26,
  },
  date: {
    marginTop: 10,
    textAlign: "right",
    fontSize: 13,
    marginRight: -30,
    color: mainLightGrey,
  },
});
