import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import axios from "axios";
import { useFonts } from "expo-font";
import colors from "./assets/colors";
const { buttonDarkBlue, inactiveTabBar } = colors;

// Containers
import SignInUpScreen from "./containers/SignInUpScreen";
import LaunchScreen from "./containers/LaunchScreen";
import OnboardingScreen from "./containers/OnboardingScreen";
import ExploreScreen from "./containers/ExploreScreen";
import ListsScreen from "./containers/ListsScreen";
import AccountScreen from "./containers/AccountScreen";
import AccountInfosScreen from "./containers/AccountInfosScreen";
import FeedbackScreen from "./containers/FeedbackScreen";
import ListScreen from "./containers/ListScreen";
import RegisterScreen from "./containers/RegisterScreen";
import BarCodeScanner from "./containers/BarCodeScanner";
import EditListScreen from "./containers/EditListScreen";
import IconTabBarAccount from "./components/IconTabBarAccount";
import IconTabBarList from "./components/IconTabBarList";
import IconTabBarExplore from "./components/IconTabBarExplore";

// Disable warnings
import { LogBox } from "react-native";
LogBox.ignoreAllLogs();

// Useful variables
const serverURL = "https://vulpi-forest.herokuapp.com";
// Local server : "http://localhost:3310"
// Heroku server : "https://vulpi-forest.herokuapp.com"

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// ================================================
// ================================================

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [firstConnection, setFirstConnection] = useState(false);
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [displayMessage, setDisplayMessage] = useState("");
  const [reload, setReload] = useState(false);
  const [reloadUser, setReloadUser] = useState(false);
  const [idListActive, setIdListActive] = useState();

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

      // If the user is logged in, get their info from DB
      if (userId) {
        try {
          const response = await axios.get(`${serverURL}/user/${userId}`, {
            headers: {
              Authorization: "Bearer " + userToken,
            },
          });
          setFirstName(response.data.account.firstName);
          setEmail(response.data.email);
          setAvatar(response.data.account.avatar.secure_url);
        } catch (error) {
          console.log(error.message);
        }
      }
      setIsLoading(false);
    };

    bootstrapAsync();
  }, [reloadUser, userToken]);

  // Function used to sign up, log in and log out user
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

  // Function used after the user has seen the onBoarding
  const setOnBoardingDone = async () => {
    try {
      // Set the state firstConnection to false so the onBoarding screen will disappear
      setFirstConnection(false);
      // Save in Local Storage the fact that the user has seen the onBoarding
      await AsyncStorage.setItem("onBoarding", "done");

      // Save in DB the fact that it is not the user's 1st connection
      const formData = new FormData();
      formData.append("firstConnection", false);
      await axios.put(`${serverURL}/user/update/${userId}`, formData, {
        headers: { authorization: `Bearer ${userToken}` },
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  // Function to update user account
  const editInformation = async (data, isInfosModified) => {
    setDisplayMessage(false);
    if (isInfosModified) {
      try {
        const formData = new FormData();
        if (data === "email") {
          formData.append("email", email);
        } else if (data === "password") {
          formData.append("password", password);
        } else if (data === "firstName") {
          formData.append("firstName", firstName);
        } else if (data === "avatar") {
          const uriParts = avatar.split(".");
          const fileType = uriParts[uriParts.length - 1];
          formData.append("avatar", {
            uri: avatar,
            name: `avatar/${userId}`,
            type: `image/${fileType}`,
          });
        }

        const response = await axios.put(
          `${serverURL}/user/update/${userId}`,
          formData,
          { headers: { Authorization: "Bearer " + userToken } }
        );
        if (response.data) {
          setDisplayMessage({ message: "Votre profil a été mis a jour. ✨" });

          setReloadUser(true);
        } else {
          setDisplayMessage({ message: "⛔️ Une erreur s'est produite." });
        }
      } catch (error) {
        if (
          error.response.data.message ===
          "An account already exists with this email"
        ) {
          setDisplayMessage({
            message: "⛔️ Cet email est déjà utilisé sur Vulpi.",
          });
        } else {
          setDisplayMessage({ message: "⛔️ Une erreur s'est produite." });
        }
      }
    } else {
      setDisplayMessage({ message: "Modifiez au moins une information ! ⚡️" });
    }
  };

  // ===============================================
  // ===============================================

  return (
    <NavigationContainer>
      {isLoading && !fontLoaded ? (
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
                  activeTintColor: buttonDarkBlue,
                  inactiveTintColor: inactiveTabBar,
                }}
                initialRouteName="Lists"
              >
                {/* ----------------- */}
                {/* ---- EXPLORE ---- */}
                {/* ----------------- */}

                <Tab.Screen
                  name="Explore"
                  options={{
                    tabBarLabel: "Explorer",
                    tabBarIcon: () => <IconTabBarExplore />,
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
                    tabBarIcon: () => <IconTabBarList />,
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
                            serverURL={serverURL}
                            reload={reload}
                            setReload={setReload}
                            idListActive={idListActive}
                            setIdListActive={setIdListActive}
                          />
                        )}
                      </Stack.Screen>
                      <Stack.Screen
                        name="ListScreen"
                        options={{
                          title: "",
                          headerShown: false,
                        }}
                      >
                        {(props) => <ListScreen {...props} />}
                      </Stack.Screen>
                      <Stack.Screen
                        name="BarCodeScanner"
                        options={{ headerShown: false }}
                      >
                        {(props) => (
                          <BarCodeScanner
                            {...props}
                            reload={reload}
                            setReload={setReload}
                            userToken={userToken}
                            userId={userId}
                            setToken={setToken}
                            serverURL={serverURL}
                            idListActive={idListActive}
                            setIdListActive={setIdListActive}
                          />
                        )}
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
                    tabBarIcon: () => <IconTabBarAccount />,
                  }}
                >
                  {() => (
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                      <Stack.Screen name="AccountScreen">
                        {() => (
                          <AccountScreen
                            setToken={setToken}
                            email={email}
                            firstName={firstName}
                            avatar={avatar}
                            setAvatar={setAvatar}
                            displayMessage={displayMessage}
                            setDisplayMessage={setDisplayMessage}
                            editInformation={editInformation}
                            userToken={userToken}
                            userId={userId}
                            serverURL={serverURL}
                            reload={reload}
                            setReload={setReload}
                            setReloadUser={setReloadUser}
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
                            email={email}
                            setEmail={setEmail}
                            firstName={firstName}
                            setFirstName={setFirstName}
                            password={password}
                            setPassword={setPassword}
                            displayMessage={displayMessage}
                            setDisplayMessage={setDisplayMessage}
                            editInformation={editInformation}
                          />
                        )}
                      </Stack.Screen>
                      <Stack.Screen name="EditListScreen">
                        {(props) => (
                          <EditListScreen
                            {...props}
                            reload={reload}
                            setReload={setReload}
                            serverURL={serverURL}
                            userToken={userToken}
                            userId={userId}
                          />
                        )}
                      </Stack.Screen>
                      <Stack.Screen
                        name="FeedbackScreen"
                        options={{ title: "J'ai une suggestion" }}
                      >
                        {(props) => (
                          <FeedbackScreen
                            {...props}
                            serverURL={serverURL}
                            userId={userId}
                            userToken={userToken}
                          />
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
