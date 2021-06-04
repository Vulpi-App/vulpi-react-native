import React, { useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/core";

import * as AppleAuthentication from "expo-apple-authentication";

import SignInput from "../components/SignInput";

const windowHeight = Dimensions.get("window").height;
const statusBarHeight = Constants.statusBarHeight;
const scrollViewHeight = windowHeight - statusBarHeight;

function SetUpProfilScreen({ userToken, setToken, userId, serverURL }) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (email && password) {
      if (errorMessage !== null) {
        setErrorMessage(null);
      }

      try {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        console.log(formData);
        const response = await axios.post(`${serverURL}/user/login`, formData);

        if (response.data.token && response.data._id) {
          const token = response.data.token;
          const id = response.data._id;
          console.log(id);
          console.log(token);
          setToken(token, id);
        } else {
          setErrorMessage("Une erreur s'est produite");
        }
      } catch (error) {
        if (error.response.status === 401) {
          setErrorMessage("Identifiants incorrects");
        } else {
          setErrorMessage("Une erreur s'est produite");
        }
      }
    } else {
      setErrorMessage("Merci de compléter tous les champs");
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={["#1E2C79", "#232952"]} style={styles.background}>
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <Image
              source={require("../assets/logo-vulpi.png")}
              style={styles.logo}
              resizeMode={"contain"}
            />
            <Text style={styles.brand}>Vulpi</Text>
            <Text style={styles.title}>Fais tes courses autrement</Text>
          </View>

          <View style={styles.wrapper}>
            <View style={styles.inputWrap}>
              <SignInput
                style={styles.inputText}
                setFunction={setEmail}
                keyboardType={"email-address"}
                placeholder={"Email"}
              />
              <View style={{ height: 1, backgroundColor: "#EEEEEE" }} />
              <SignInput
                setFunction={setPassword}
                secureTextEntry={true}
                placeholder={"Mot de passe"}
              />
              <TouchableOpacity
                style={styles.test}
                underlayColor="#EEEEEE"
                onPress={() => {}}
              >
                <Image
                  source={require("../assets/icon-eye.png")}
                  style={styles.icon}
                  resizeMode={"contain"}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.messageWrap}>
            <View style={styles.errorWrap}>
              {errorMessage !== null && (
                <Text style={styles.errorText}>{errorMessage}</Text>
              )}
            </View>
          </View>

          <View style={styles.wrapper}>
            <TouchableHighlight
              style={styles.buttonSign}
              underlayColor="#EEEEEE"
              onPress={() => {
                handleSubmit();
              }}
            >
              <Text style={styles.textSign}>CONNEXION</Text>
            </TouchableHighlight>
          </View>

          <View style={styles.wrapperRight}>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.textLost}>Mot de passe oublié</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.wrapper}>
            <View style={styles.lineWrap}>
              <View style={styles.line} />
              <View>
                <Text style={styles.textLine}>ou</Text>
              </View>
              <View style={styles.line} />
            </View>
          </View>

          <View style={styles.wrapper}>
            <View style={styles.buttonWrap}>
              <AppleAuthentication.AppleAuthenticationButton
                buttonType={
                  AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
                }
                buttonStyle={
                  AppleAuthentication.AppleAuthenticationButtonStyle.WHITE
                }
                cornerRadius={5}
                style={{ width: "100%", height: 49 }}
                onPress={async () => {
                  try {
                    const credential = await AppleAuthentication.signInAsync({
                      requestedScopes: [
                        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                        AppleAuthentication.AppleAuthenticationScope.EMAIL,
                      ],
                    });
                    const formData = new FormData();
                    formData.append("appleId", credential.user);
                    formData.append("email", credential.email);
                    formData.append("firstName", credential.fullName.givenName);
                    formData.append("lastName", credential.fullName.familyName);
                  } catch (e) {
                    if (e.code === "ERR_CANCELED") {
                      // handle that the user canceled the sign-in flow
                    } else {
                      // handle other errors
                    }
                  }
                }}
              />

              <TouchableHighlight
                style={styles.buttonTier}
                underlayColor="#EEEEEE"
                onPress={() => {}}
              >
                <View style={styles.buttonView}>
                  <Image
                    source={require("../assets/logo-google.png")}
                    style={styles.logos}
                    resizeMode={"contain"}
                  />
                  <Text style={styles.textTier}>Continuer avec Google</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.buttonTier}
                underlayColor="#EEEEEE"
                onPress={() => {}}
              >
                <View style={styles.buttonView}>
                  <Image
                    source={require("../assets/logo-facebook.png")}
                    style={styles.logos}
                    resizeMode={"contain"}
                  />
                  <Text style={styles.textTier}>Continuer avec Facebook</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
          <Text style={styles.withLove}>Made with ❤️ in Paris</Text>
          <View style={styles.block}>
            <TouchableOpacity
              style={styles.signUp}
              onPress={() => {
                navigation.navigate("RegisterScreen");
              }}
            >
              <Text style={styles.textSignUp}>Tu n'as pas de compte ? </Text>
              <Text style={styles.textUnderline}>Crées en un</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

export default SetUpProfilScreen;

const styles = StyleSheet.create({
  screen: { backgroundColor: "#1E2C79" },

  container: {
    height: scrollViewHeight,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
  },

  wrapperRight: {
    justifyContent: "center",
    alignItems: "flex-end",
    width: "90%",
  },

  logo: {
    marginTop: "15%",
    height: 32.4,
  },

  brand: {
    fontWeight: "600",
    color: "white",
    fontSize: 35,
    marginTop: "3%",
    fontFamily: "GilroyBold",
  },

  title: {
    fontWeight: "600",
    color: "white",
    fontSize: 15,
    marginTop: "1%",
    fontFamily: "GilroySemiBold",
  },

  messageWrap: {
    justifyContent: "center",
    backgroundColor: "green",
    alignItems: "center",
    height: "3%",
  },

  errorWrap: {
    position: "absolute",
  },

  icon: {
    width: 15,
  },

  test: {
    position: "absolute",
    marginTop: 40,
    marginLeft: 310,
  },

  errorText: {
    color: "white",
    fontFamily: "GilroySemiBold",
  },

  inputText: {
    color: "#CA2121",
  },

  inputWrap: {
    width: "100%",
    backgroundColor: "white",
    marginTop: "15%",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },

  buttonSign: {
    height: 49,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    backgroundColor: "white",
    borderWidth: 3,
    borderRadius: 8,
  },

  textSign: {
    color: "#0C166D",
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "GilroyExtraBold",
  },

  textLost: {
    color: "white",
    fontWeight: "500",
    fontSize: 14,
    textDecorationLine: "underline",
    marginTop: "2%",
    fontFamily: "GilroySemiBold",
  },

  textSignUp: {
    color: "#232952",
    fontWeight: "500",
    fontSize: 14,
    fontFamily: "GilroySemiBold",
  },

  textUnderline: {
    color: "#232952",
    fontWeight: "500",
    fontSize: 14,
    textDecorationLine: "underline",
    fontFamily: "GilroySemiBold",
  },

  lineWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "5%",
  },

  signUp: {
    flexDirection: "row",
    alignItems: "center",
  },

  line: {
    flex: 1,
    height: 2,
    backgroundColor: "white",
  },

  textLine: {
    width: 100,
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "GilroySemiBold",
  },

  buttonWrap: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: "5%",
  },

  choose: {
    alignItems: "center",
    justifyContent: "space-between",

    flexDirection: "row",
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

  buttonTier: {
    height: 49,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    backgroundColor: "white",
    borderWidth: 3,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    marginTop: "2%",
  },

  buttonView: {
    flexDirection: "row",
  },

  textTier: {
    color: "black",
    fontWeight: "600",
    fontSize: 18,
    position: "relative",
  },

  logos: {
    width: 15,
    position: "relative",
    marginRight: 7,
  },

  block: {
    height: 100,
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: "row",
    marginTop: "5%",
    paddingTop: "5%",
  },

  withLove: {
    marginTop: "15%",
    color: "white",
    fontWeight: "600",
    fontSize: 15,
    position: "relative",
    fontFamily: "GilroySemiBold",
  },
});
