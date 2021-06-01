import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

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
import axios from "axios";
import RegisterScreen from "./containers/RegisterScreen";

// Useful variables
const serverURL = "http://localhost:3310";
// Local server : "http://localhost:3310"
// Heroku server : "https://vulpi-forest.herokuapp.com"

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(false);

  const [userToken, setUserToken] = useState(
    "KSpUkFnIaPDmIYfzmc24iaWzzlsISjQ2m3mPkdfK8jhshqBUx4ApsLNIMEivqut0"
  );
  const [userId, setUserId] = useState("60b34cdb27fe1e80df064679");

  // State pour gérer l'affichage du Onboarding
  const [firstConnection, setFirstConnection] = useState(true);
  const [firstName, setFirstName] = useState("Lhaoucine");

  // console.log(1, userId);
  // console.log(2, userToken);

  const setToken = async (token, id) => {
    if (token) {
      await AsyncStorage.setItem("userToken", token);
      await AsyncStorage.setItem("userId", id);
    } else {
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("userId");
    }
    setUserToken(token);
    setUserId(id);
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
      console.log("réponse requête modif 1st connection" + response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  // useEffect(() => {
  //   // Fetch the token from storage then navigate to our appropriate place
  //   const bootstrapAsync = async () => {
  //     // We should also handle error for production apps
  //     const userToken = await AsyncStorage.getItem("userToken");
  //     const userId = await AsyncStorage.getItem("userId");
  //     const firstConnection = await AsyncStorage.getItem("firstConnection");
  //     // This will switch to the App screen or Auth screen and this loading
  //     // screen will be unmounted and thrown away.
  //     setUserToken(userToken);
  //     setUserId(userId);
  //     setFirstConnection(firstConnection);
  //     setIsLoading(false);
  //   };

  //   bootstrapAsync();
  // }, []);

  return (
    <NavigationContainer>
      {isLoading ? (
        <LaunchScreen />
      ) : userToken === null ? ( // We haven't finished checking for the token yet
        // No token found, user isn't signed in
        <Stack.Navigator>
          <Stack.Screen name="SignUp" options={{ headerShown: false }}>
            {() => (
              <SignInUpScreen
                userToken={userToken}
                userId={userId}
                setToken={setToken}
                serverURL={serverURL}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="RegisterScreen" options={{ headerShown: false }}>
            {() => (
              <RegisterScreen
                userToken={userToken}
                userId={userId}
                setToken={setToken}
                serverURL={serverURL}
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
                            serverURL={serverURL}
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
                      <Ionicons
                        name={"ios-options"}
                        size={size}
                        color={color}
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
                        {(props) => <FeedbackScreen {...props} />}
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
