import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { Image, StyleSheet } from "react-native";
import { useFonts } from "expo-font";

// Containers
import SignInUpScreen from "./containers/SignInUpScreen";
import LaunchScreen from "./containers/LaunchScreen";
import OnboardingScreen from "./containers/OnboardingScreen";
import ExploreScreen from "./containers/ExploreScreen";
import ListsScreen from "./containers/ListsScreen";
import AccountScreen from "./containers/AccountScreen";
import AccountInfosScreen from "./containers/AccountInfosScreen";
import SettingsScreen from "./containers/SettingsScreen";
import FeedbackScreen from "./containers/FeedbackScreen";
import ListScreen from "./containers/ListScreen";
import RegisterScreen from "./containers/RegisterScreen";

// Useful variables
const serverURL = "http://localhost:3310";
// Local server : "http://localhost:3310"
// Heroku server : "https://vulpi-forest.herokuapp.com"

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  // Création d'un state temporaire/fictif à revoir par la suite

  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);

  // State pour gérer l'affichage du Onboarding
  const [firstConnection, setFirstConnection] = useState(true);
  const [firstName, setFirstName] = useState("");

  // Loading of font GILROY
  const [fontLoaded] = useFonts({
    GilroyBlack: require("./assets/fonts/Gilroy-Black.ttf"),
    GilroyBlackItalic: require("./assets/fonts/Gilroy-BlackItalic.ttf"),
    GilroyBold: require("./assets/fonts/Gilroy-Bold.ttf"),
    GilroyBoldItalic: require("./assets/fonts/Gilroy-BoldItalic.ttf"),
    GilroyExtraBold: require("./assets/fonts/Gilroy-ExtraBold.ttf"),
    GilroyExtraBoldItalic: require("./assets/fonts/Gilroy-ExtraBoldItalic.ttf"),
    GilroyHeavy: require("./assets/fonts/Gilroy-Heavy.ttf"),
    GilroyHeavyItalic: require("./assets/fonts/Gilroy-HeavyItalic.ttf"),
    GilroyLight: require("./assets/fonts/Gilroy-Light.ttf"),
    GilroyLightItalic: require("./assets/fonts/Gilroy-LightItalic.ttf"),
    GilroyMedium: require("./assets/fonts/Gilroy-Medium.ttf"),
    GilroyMediumItalic: require("./assets/fonts/Gilroy-MediumItalic.ttf"),
    GilroyRegular: require("./assets/fonts/Gilroy-Regular.ttf"),
    GilroyRegularItalic: require("./assets/fonts/Gilroy-RegularItalic.ttf"),
    GilroySemiBold: require("./assets/fonts/Gilroy-SemiBold.ttf"),
    GilroySemiBoldItalic: require("./assets/fonts/Gilroy-SemiBoldItalic.ttf"),
    GilroyThin: require("./assets/fonts/Gilroy-Thin.ttf"),
    GilroyThinItalic: require("./assets/fonts/Gilroy-ThinItalic.ttf"),
    GilroyUltraLight: require("./assets/fonts/Gilroy-UltraLight.ttf"),
    GilroyUltraLightItalic: require("./assets/fonts/Gilroy-UltraLightItalic.ttf"),
  });

  const setToken = async (token, id, firstName) => {
    if (token) {
      await AsyncStorage.setItem("userToken", token);
      await AsyncStorage.setItem("userId", id);
    } else {
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("userId");
    }
    setUserToken(token);
    setUserId(id);
    setFirstName(firstName);
  };

  const setOnBoardingDone = async () => {
    try {
      // Set the state firstConnection to false so the onBoarding screen will disappear
      setFirstConnection(false);
      // Save in Local Storage the fact that the user has seen the onBoarding
      await AsyncStorage.setItem("onBoarding", "done");

      // Save in DB the fact that it is not the user's 1st connection
      const formData = new FormData();
      formData.append("firstConnection", false);
      const response = await axios.put(
        `${serverURL}/user/update/${userId}`,
        formData,
        {
          headers: { authorization: `Bearer ${userToken}` },
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");
      const userId = await AsyncStorage.getItem("userId");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setUserToken(userToken);
      setUserId(userId);

      // Check if the user has already seen the on-Boarding
      const onBoarding = await AsyncStorage.getItem("onBoarding");
      if (onBoarding === "done") {
        setFirstConnection(false);
      } else {
        setFirstConnection(true);
      }
      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  return (
    <NavigationContainer>
      {isLoading || !fontLoaded ? (
        <LaunchScreen />
      ) : userToken === null ? ( // We haven't finished checking for the token yet
        // No token found, user isn't signed in
        <Stack.Navigator>
          <Stack.Screen name="SignUp" options={{ headerShown: false }}>
            {() => <SignInUpScreen setToken={setToken} serverURL={serverURL} />}
          </Stack.Screen>
          <Stack.Screen name="RegisterScreen" options={{ headerShown: false }}>
            {() => (
              <RegisterScreen
                setToken={setToken}
                serverURL={serverURL}
                setFirstConnection={setFirstConnection}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      ) : firstConnection ? (
        <OnboardingScreen
          setOnBoardingDone={setOnBoardingDone}
          firstName={firstName}
        />
      ) : (
        // User is signed in
        <Stack.Navigator>
          <Stack.Screen name="Tab" options={{ headerShown: false }}>
            {() => (
              <Tab.Navigator
                tabBarOptions={{
                  activeTintColor: "tomato",
                  inactiveTintColor: "gray",
                }}
              >
                {/* ----------------- */}
                {/* ---- EXPLORE ---- */}
                {/* ----------------- */}

                <Tab.Screen
                  name="Explore"
                  options={{
                    tabBarLabel: "Explorer",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name={"ios-home"} size={size} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                      <Stack.Screen
                        name="ExploreScreen"
                        options={{
                          title: "Explore Screen",
                          headerStyle: { backgroundColor: "red" },
                          headerTitleStyle: { color: "white" },
                        }}
                      >
                        {(props) => (
                          <ExploreScreen
                            {...props}
                            userToken={userToken}
                            userId={userId}
                          />
                        )}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>

                {/* ----------------- */}
                {/* ---- LISTS ---- */}
                {/* ----------------- */}

                <Tab.Screen
                  name="Lists"
                  options={{
                    tabBarLabel: "Liste",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons
                        name={"ios-options"}
                        size={size}
                        color={color}
                      />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator
                      screenOptions={{
                        headerStyle: {
                          height: 0,
                        },
                      }}
                    >
                      <Stack.Screen
                        name="ShoppingScreen"
                        options={{ title: "" }}
                      >
                        {(props) => (
                          <ListsScreen
                            {...props}
                            userToken={userToken}
                            userId={userId}
                            setToken={setToken}
                          />
                        )}
                      </Stack.Screen>
                      <Stack.Screen
                        name="ListScreen"
                        options={{ headerShown: false }}
                      >
                        {(props) => <ListScreen {...props} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>

                {/* ----------------- */}
                {/* ---- ACCOUNT ---- */}
                {/* ----------------- */}

                <Tab.Screen
                  name="Account"
                  options={{
                    tabBarLabel: "Compte",
                    tabBarIcon: ({ color, size }) => (
                      // <Ionicons
                      //   name={"ios-options"}
                      //   size={size}
                      //   color={color}
                      // />
                      <Image
                        source={require("./assets/chevron-black.png")}
                        style={styles.iconsTabBar}
                      />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                      <Stack.Screen name="AccountScreen">
                        {() => (
                          <AccountScreen
                            userToken={userToken}
                            userId={userId}
                            setToken={setToken}
                            serverURL={serverURL}
                          />
                        )}
                      </Stack.Screen>
                      <Stack.Screen
                        name="AccountInfosScreen"
                        options={{ headerShown: false }}
                      >
                        {() => (
                          <AccountInfosScreen
                            userToken={userToken}
                            userId={userId}
                            setToken={setToken}
                            serverURL={serverURL}
                          />
                        )}
                      </Stack.Screen>
                      <Stack.Screen
                        name="SettingsScreen"
                        options={{ title: "Paramètres" }}
                      >
                        {(props) => <SettingsScreen {...props} />}
                      </Stack.Screen>
                      <Stack.Screen
                        name="FeedbackScreen"
                        options={{ title: "J'ai une suggestion" }}
                      >
                        {(props) => (
                          <FeedbackScreen {...props} serverURL={serverURL} />
                        )}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  iconsTabBar: {
    width: 20,
    height: 30,
  },
});
