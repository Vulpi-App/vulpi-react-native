// Tools
// import React from "react";
// import { Text } from "react-native";

// const SignInUpScreen = () => {
//   return <Text>SignInUpScreen</Text>;
// };

// export default SignInUpScreen;

import React, { useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
  StyleSheet,
  TouchableHighlight,
  Component,
  View,
  Text,
} from "react-native";
import axios from "axios";
import Constants from "expo-constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { LinearGradient } from "expo-linear-gradient";

import Message from "./components/Message";
import SignInput from "./components/SignInput";
import ModalExample from "./components/Modal";
import LostPassword from "./components/LostPassword";

const windowHeight = Dimensions.get("window").height;
const statusBarHeight = Constants.statusBarHeight;
const scrollViewHeight = windowHeight - statusBarHeight;

function SignInUpScreen({ setToken, setId }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async () => {
    if (email && password) {
      if (errorMessage !== null) {
        setErrorMessage(null);
      }

      try {
        const response = await axios.post(
          `https://express-airbnb-api.herokuapp.com/user/log_in`,
          {
            email,
            password,
          }
        );

        if (response.data.token && response.data.id) {
          const token = response.data.token;
          const id = response.data.id;
          setToken(token);
          setId(id);
        } else {
          setErrorMessage("An error occurred");
        }
      } catch (error) {
        if (error.response.status === 401) {
          setErrorMessage("Incorrect credentials");
        } else {
          setErrorMessage("An error occurred");
        }
      }
    } else {
      setErrorMessage("Please fill all fields");
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={["#1E2C79", "#232952"]} style={styles.background}>
        <KeyboardAwareScrollView>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.container}>
              <View style={styles.wrap}>
                <Image
                  source={require("../assets/logo-vulpi.png")}
                  style={styles.logo}
                  resizeMode={"contain"}
                />
                <Text style={styles.brand}>Vulpi</Text>
                <Text style={styles.subTitle}>Fais tes courses autrement</Text>
              </View>

              <View style={styles.wrap}>
                <SignInput
                  setFunction={setEmail}
                  keyboardType={"email-address"}
                  placeholder={"email"}
                />
                <SignInput
                  setFunction={setPassword}
                  secureTextEntry={true}
                  placeholder={"password"}
                />
                <Message message={errorMessage} color="error" />
              </View>

              <View style={styles.lost}>
                <LostPassword />
              </View>
              <View style={styles.wrap}>
                <TouchableHighlight
                  style={styles.btnSignIn}
                  underlayColor="#EEEEEE"
                  onPress={() => {
                    handleSubmit();
                  }}
                >
                  <Text style={styles.textSignIn}>CONNEXION</Text>
                </TouchableHighlight>
              </View>

              <View style={styles.choose}>
                <View
                  style={{
                    borderBottomColor: "white",
                    borderBottomWidth: 5,
                    width: 134,
                  }}
                />
                <Text style={styles.text}>OU</Text>
                <View
                  style={{
                    borderBottomColor: "white",
                    borderBottomWidth: 5,
                    width: 134,
                  }}
                />
              </View>

              <View style={styles.wrap}>
                <View style={styles.buttonWrap}>
                  <Image
                    source={require("../assets/logo-apple.png")}
                    style={styles.logos}
                    resizeMode={"contain"}
                  />
                  <Text style={styles.textTier}>Continuer avec Apple</Text>
                </View>
                <View style={styles.buttonWrap}>
                  <Image
                    source={require("../assets/logo-google.png")}
                    style={styles.logos}
                    resizeMode={"contain"}
                  />
                  <Text style={styles.textTier}>Continuer avec Google</Text>
                </View>
                <View style={styles.buttonWrap}>
                  <Image
                    source={require("../assets/logo-facebook.png")}
                    style={styles.logos}
                    resizeMode={"contain"}
                  />
                  <Text style={styles.textTier}>Continuer avec Facebook</Text>
                </View>
                <View style={styles.modal}>
                  <ModalExample />
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

export default SignInUpScreen;

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: "#1E2C79",
    width: scrollViewHeight,
    width: "100%",
    flex: 1,
  },

  scrollView: {
    justifyContent: "space-between",
    height: scrollViewHeight,
    width: "100%",
  },

  container: {
    justifyContent: "center",
    alignItems: "center",
    height: scrollViewHeight,
  },

  wrap: {
    justifyContent: "center",
    alignItems: "center",

    width: "90%",
  },

  text: {
    color: "white",
  },
  brand: {
    color: "white",
    fontWeight: "600",
    fontSize: 35,
    marginBottom: 30,
  },
  choose: {
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
    padding: "5%",
  },
  modal: {
    backgroundColor: "white",
    marginTop: "10%",
    width: "100%",
    height: "8%",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    justifyContent: "center",
    flexDirection: "row",
  },

  btnSignIn: {
    height: 49,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    backgroundColor: "white",
    borderWidth: 3,
    borderRadius: 8,
    marginTop: 20,
  },

  textSignIn: {
    color: "black",
    fontWeight: "500",
    fontSize: 18,
  },
  logo: {
    height: 32.4,
  },
  buttonWrap: {
    height: 49,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    backgroundColor: "white",
    borderWidth: 3,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
  },

  textTier: {
    color: "black",
    fontWeight: "500",
    fontSize: 18,
    position: "relative",
  },
  logos: {
    width: 20,
    position: "relative",
    marginRight: 10,
  },
  subTitle: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
    marginBottom: 30,
  },
});
