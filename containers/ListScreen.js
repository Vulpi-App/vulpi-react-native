// Tools
import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  ScrollView,
  SafeAreaView,
  Platform,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

// Components - import
import ListModalButton from "../components/ListModalButton";

// Colors - import
import colors from "../assets/colors";
const { bgLight } = colors;

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

const ListScreen = () => {
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

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView style={styles.scrollView}>
        <StatusBar style="dark" />
        <View style={[styles.wrapper, styles.buttonWrap]}>
          <View>
            <ListModalButton
              name="👋🏻 Je vais faire les courses !"
              color="blue"
            />
          </View>

          <TouchableOpacity
            onPress={async () => {
              await sendPushNotification(expoPushToken);
            }}
          >
            <Text>👋🏻 Je vais faire les courses !</Text>
          </TouchableOpacity>
          <Text style={styles.asterisk}>
            * Prévenez les autres que vous allez faire les courses
          </Text>
        </View>

        <View>
          <View>
            <Text>👏🏻</Text>
          </View>
          <View>
            <Text>Mattéo a ajouté "Belin Croutille" à la liste</Text>
            <Text>"Courses maison"</Text>
          </View>
        </View>
        <Text>Hier à 12:20</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: bgLight,
    flex: 1,
  },
  scrollView: {
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    paddingTop: 20,
  },
  wrapper: {
    width: "94%",
    marginTop: 0,
    marginBottom: 20,
    marginLeft: "auto",
    marginRight: "auto",
  },
  buttonWrap: {
    flexDirection: "row",
  },
  asterisk: {
    width: "35%",
    marginLeft: 15,
    fontSize: 11,
  },
});
