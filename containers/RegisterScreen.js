import React, { useState } from "react";
import {
  Dimensions,
  Image,
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Constants from "expo-constants";
import axios from "axios";

const windowHeight = Dimensions.get("window").height;
const statusBarHeight = Constants.statusBarHeight;
const scrollViewHeight = windowHeight - statusBarHeight;

function RegisterScreen({ setToken, serverURL }) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (email && firstName && password) {
      if (errorMessage !== null) {
        setErrorMessage(null);
      }

      try {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        formData.append("firstName", firstName);

        const response = await axios.post(`${serverURL}/user/signup`, formData);
        formData;

        if (response.data.token && response.data._id) {
          const token = response.data.token;
          const id = response.data._id;
          setToken(token, id);
        } else {
          setErrorMessage("An error occurred");
        }
      } catch (error) {
        console.log(error.message);
        const errorMessage = error.response.data.error;
        if (
          errorMessage === "This email already has an account." ||
          errorMessage === "This username already has an account."
        ) {
          setErrorMessage(errorMessage);
        } else {
          setErrorMessage("An error occurred");
        }
      }
    } else {
      setErrorMessage("Please fill all fields");
    }
  };

  const handleSteps = () => {
    if (step <= 4) {
      setStep(step + 1);
    }
  };
  const removeStep = () => {
    setStep(step - 1);
  };

  return (
    <>
      <ImageBackground
        source={require("../assets/bg.png")}
        style={styles.ImageBackground}
      >
        {step === 1 && (
          <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
              <View style={styles.block}>
                <View style={styles.progressWrap}>
                  <View style={styles.wrap}>
                    <Image
                      source={require("../assets/icon-loading-1.png")}
                      style={styles.logos}
                      resizeMode={"contain"}
                    />
                    <Text style={styles.counter}>1 sur 3</Text>
                  </View>
                  <View style={styles.progressText}>
                    <Text style={styles.text1}>Inscription</Text>
                    <Text style={styles.text2}>Pr??nom</Text>
                  </View>
                </View>
              </View>

              <View style={styles.block}>
                <View style={styles.textWrap}>
                  <Text style={styles.emoji}>????</Text>
                  <Text style={styles.title1}>Comment vous appelez vous ?</Text>
                </View>
              </View>

              <View style={styles.block}>
                <View style={styles.inputWrap}>
                  <View style={styles.onBoard}>
                    <TextInput
                      style={styles.input}
                      placeholder="Pr??nom"
                      autoCapitalize="words"
                      autoCorrect={false}
                      onChangeText={(text) => {
                        setFirstName(text);
                      }}
                      value={firstName}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.block}>
                <View style={styles.buttonWrap}>
                  {step < 4 ? (
                    <TouchableOpacity
                      style={styles.buttonNext}
                      onPress={handleSteps}
                    >
                      <View style={styles.nextWrap}>
                        <Text style={styles.nextText}>Suivant</Text>
                        <Image
                          source={require("../assets/icon-arrow-right-white.png")}
                          resizeMode={"contain"}
                          style={styles.buttonIcon}
                        />
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <Text>S'inscrire</Text>
                  )}
                </View>
              </View>
            </View>
          </SafeAreaView>
        )}
        {step === 2 && (
          <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
              <View style={styles.block}>
                <View style={styles.progressWrap}>
                  <View style={styles.wrap}>
                    <Image
                      source={require("../assets/icon-loading-2.png")}
                      style={styles.logos}
                      resizeMode={"contain"}
                    />
                    <Text style={styles.counter}>2 sur 3</Text>
                  </View>
                  <View style={styles.progressText}>
                    <Text style={styles.text1}>Inscription</Text>
                    <Text style={styles.text2}>Adresse mail</Text>
                  </View>
                </View>
              </View>

              <View style={styles.block}>
                <View style={styles.textWrap}>
                  <Text style={styles.emoji}>??????</Text>
                  <Text style={styles.title4}>
                    Quelle adresse e-mail voulez-vous utiliser ?
                  </Text>
                </View>
              </View>

              <View style={styles.block}>
                <View style={styles.inputWrap}>
                  <View style={styles.onBoard}>
                    <TextInput
                      style={styles.input}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      placeholder="Adresse e-mail"
                      onChangeText={(text) => {
                        setEmail(text);
                      }}
                      value={email}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.block}>
                <View style={styles.buttonWrap}>
                  <View style={styles.steps}>
                    {step < 4 ? (
                      <TouchableOpacity
                        style={styles.buttonBack}
                        onPress={removeStep}
                      >
                        <View style={styles.backWrap}>
                          <Image
                            source={require("../assets/icon-arrow-left-blue.png")}
                            style={styles.buttonIcon}
                            resizeMode={"contain"}
                          />
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <Text>S'inscrire</Text>
                    )}
                    {step < 4 ? (
                      <TouchableOpacity
                        style={styles.buttonNext}
                        onPress={handleSteps}
                      >
                        <View style={styles.nextWrap}>
                          <Text style={styles.nextText}>Suivant</Text>
                          <Image
                            source={require("../assets/icon-arrow-right-white.png")}
                            resizeMode={"contain"}
                            style={styles.buttonIcon}
                          />
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <Text>S'inscrire</Text>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </SafeAreaView>
        )}
        {step === 3 && (
          <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
              <View style={styles.block}>
                <View style={styles.progressWrap}>
                  <View style={styles.wrap}>
                    <Image
                      source={require("../assets/icon-loading-3.png")}
                      style={styles.logos}
                      resizeMode={"contain"}
                    />
                    <Text style={styles.counter}>3 sur 3</Text>
                  </View>
                  <View style={styles.progressText}>
                    <Text style={styles.text1}>Inscription</Text>
                    <Text style={styles.text2}>Mot de passe</Text>
                  </View>
                </View>
              </View>

              <View style={styles.block}>
                <View style={styles.textWrap}>
                  <Text style={styles.emoji}>????</Text>
                  <Text style={styles.title4}>Choisissez un mot de passe</Text>
                </View>
              </View>

              <View style={styles.block}>
                <View style={styles.inputWrap}>
                  <View style={styles.onBoard}>
                    <TextInput
                      style={styles.input}
                      secureTextEntry={true}
                      autoCapitalize="none"
                      autoCorrect={false}
                      placeholder="Mot de passe"
                      onChangeText={(text) => {
                        setPassword(text);
                      }}
                      value={password}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.block}>
                <View style={styles.buttonWrap}>
                  <View style={styles.steps}>
                    {step < 4 ? (
                      <TouchableOpacity
                        style={styles.buttonBack}
                        onPress={removeStep}
                      >
                        <View style={styles.backWrap}>
                          <Image
                            source={require("../assets/icon-arrow-left-blue.png")}
                            style={styles.buttonIcon}
                            resizeMode={"contain"}
                          />
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <Text>S'inscrire</Text>
                    )}
                    {step < 4 ? (
                      <TouchableOpacity
                        style={styles.validateButton}
                        onPress={() => {
                          handleSubmit();
                          handleSteps();
                        }}
                      >
                        <View style={styles.validateWrap}>
                          <Text style={styles.validateText}>
                            Valider et terminer
                          </Text>
                          <Image
                            style={styles.buttonIcon}
                            source={require("../assets/icon-check.png")}
                            resizeMode={"contain"}
                          />
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <Text>S'inscrire</Text>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </SafeAreaView>
        )}
        {/* {step === 4 && (
          <View style={styles.lastContainer}>
            <View style={styles.block}>
              <View style={styles.textWrap}>
                <Text style={styles.title3}>...V??rifiez vos e-mails</Text>
                <Text style={styles.title2}>
                  Vous allez recevoir un e-mail de confirmation Veuillez cliquer
                  sur le lien pour valider votre compte
                </Text>
              </View>
            </View>
          </View>
        )} */}
      </ImageBackground>
    </>
  );
}

export default RegisterScreen;

const styles = StyleSheet.create({
  ImageBackground: {
    width: "100%",
    height: "100%",
  },

  container: {
    justifyContent: "flex-start",
    height: scrollViewHeight,
    alignItems: "center",
  },

  wrapper: {
    justifyContent: "flex-start",
    alignItems: "center",
    height: "100%",
    width: "90%",
  },

  block: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  progressWrap: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "10%",
    width: "100%",
    height: 100,
  },

  wrap: {
    alignItems: "center",
    justifyContent: "center",
  },

  counter: {
    fontWeight: "600",
    color: "white",
    fontSize: 11,
    fontFamily: "GilroyBold",
  },

  logos: {
    position: "absolute",
    width: 75,
  },

  progressText: {
    marginLeft: 35,
  },

  text1: {
    fontWeight: "600",
    color: "white",
    fontSize: 19,
    fontFamily: "GilroySemiBold",
  },

  text2: {
    color: "white",
    fontSize: 11,
    fontFamily: "GilroySemiBold",
  },

  textWrap: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 200,
  },

  emoji: {
    fontSize: 53,
    marginTop: "10%",
  },

  title1: {
    textAlign: "center",
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    marginTop: "5%",
    width: "100%",
    fontFamily: "GilroyBold",
  },

  inputWrap: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "15%",
    width: "100%",
  },

  onBoard: {
    width: "100%",
  },

  input: {
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomColor: "black",
    backgroundColor: "white",
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    borderBottomWidth: 0,
    fontWeight: "bold",
    paddingLeft: 15,
    color: "black",
    width: "100%",
    fontSize: 16,
    height: 53,
    fontFamily: "GilroySemiBold",
  },

  buttonWrap: {
    justifyContent: "center",
    alignItems: "flex-end",
    marginTop: "15%",
    width: "100%",
  },

  steps: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },

  buttonNext: {
    backgroundColor: "#3443B9",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 8,
    width: 127,
    height: 47,
  },

  nextWrap: {
    justifyContent: "space-evenly",
    alignContent: "center",
    flexDirection: "row",
    width: "100%",
  },

  nextText: {
    marginTop: 1,
    fontWeight: "bold",
    color: "white",
    fontSize: 16,
    fontFamily: "GilroyBold",
  },

  buttonIcon: {
    height: 20,
    width: 20,
  },

  title4: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    width: "90%",
    fontSize: 24,
    fontFamily: "GilroyBold",
  },

  buttonBack: {
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 8,
    height: 47,
    width: 47,
  },

  backWrap: {
    justifyContent: "space-around",
    alignContent: "center",
    flexDirection: "row",
    width: "100%",
  },

  validateButton: {
    backgroundColor: "#3443B9",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 8,
    width: 209,
    height: 47,
  },

  validateWrap: {
    justifyContent: "space-evenly",
    alignContent: "center",
    flexDirection: "row",
    width: "100%",
  },

  validateText: {
    marginTop: 1,
    fontWeight: "bold",
    color: "white",
    fontSize: 16,
    fontFamily: "GilroyBold",
  },

  lastContainer: {
    height: scrollViewHeight,
    justifyContent: "center",
    alignItems: "center",
  },

  title3: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    fontSize: 24,
    width: "86%",
    fontFamily: "GilroyBold",
  },

  title2: {
    textAlign: "center",
    marginTop: "5%",
    color: "white",
    width: "70%",
    fontSize: 13,
    fontFamily: "GilroyMedium",
  },
});
