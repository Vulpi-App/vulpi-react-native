// Tools
import React, { useState } from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  View,
} from "react-native";
import Constants from "expo-constants";

// Components
import ScreenNumberIndicator from "../components/ScreenNumberIndicator";
import TitleOnBoarding from "../components/TitleOnBoarding";
import ImgOnBoarding from "../components/ImgOnBoarding";
import DescriptionOnBoarding from "../components/DescriptionOnBoarding";
import ButtonOnBoarding from "../components/ButtonOnBoarding";

import colors from "../assets/colors";
const {
  bgLight,
  mainLightGrey,
  mainBlueText,
  bgLightText,
  midGreyText,
  darkGreyText,
  buttonFlashBlue,
  buttonDarkBlue,
  buttonDisconnect,
  buttonNewList,
  radioBg,
  radioBorder,
  inputBg,
  deleteRed,
  productAdd,
  orangeNotifications,
  orangeTotalPrice,
  productDetails,
  darkGreyFutur,
  white,
  dark,
} = colors;

const OnboardingScreen = ({ setOnBoardingDone, firstName }) => {
  const [screenNumber, setScreenNumber] = useState(0);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar barStyle="light-content" />
      {/* To do : rendre dynamique le prénom */}
      <Text style={styles.mainTitle}>Bonjour {firstName}</Text>
      <ScreenNumberIndicator screenNumber={screenNumber} />
      <TitleOnBoarding screenNumber={screenNumber} />
      <ImgOnBoarding screenNumber={screenNumber} />
      <DescriptionOnBoarding screenNumber={screenNumber} />
      <View
        style={
          screenNumber > 0
            ? styles.buttonView
            : [styles.buttonView, styles.flexEnd]
        }
      >
        {screenNumber > 0 && (
          <ButtonOnBoarding
            screenNumber={screenNumber}
            setScreenNumber={setScreenNumber}
            side="left"
          />
        )}

        <ButtonOnBoarding
          screenNumber={screenNumber}
          setScreenNumber={setScreenNumber}
          side="right"
          setOnBoardingDone={setOnBoardingDone}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: buttonDarkBlue,
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    alignItems: "center",
  },
  mainTitle: {
    color: "white",
    textAlign: "center",
    fontSize: 24,
    marginTop: 10,
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    width: "100%",
    position: "absolute",
    bottom: 25,
  },

  flexEnd: {
    justifyContent: "flex-end",
  },
});

export default OnboardingScreen;
