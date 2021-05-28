import React from "react";
import { Text, Image, StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const ImgOnBoarding = ({ screenNumber }) => {
  const displayImg = (value) => {
    if (value === 0) {
      return (
        <Image
          style={styles.illuList}
          resizeMode="contain"
          source={require("../assets/illustrations/illu_onboarding_list.png")}
        />
      );
    } else if (value === 1) {
      return (
        <Image
          style={styles.illuSquare}
          resizeMode="contain"
          source={require("../assets/illustrations/illu_onboarding_partage.png")}
        />
      );
    } else if (value === 2) {
      return (
        <Image
          style={styles.illuSquare}
          resizeMode="contain"
          source={require("../assets/illustrations/illu_onboarding_pers.png")}
        />
      );
    } else if (value === 3) {
      return (
        <Image
          style={styles.illuPromo}
          resizeMode="contain"
          source={require("../assets/illustrations/illu_onboarding_promos.png")}
        />
      );
    }
  };
  return displayImg(screenNumber);
};

const styles = StyleSheet.create({
  illuList: {
    width: 200,
    height: 250,
  },

  illuSquare: {
    width: screenWidth - 30,
    height: screenWidth - 30,
  },

  illuPromo: {
    width: screenWidth - 70,
    height: screenWidth - 70,
    marginTop: 20,
  },
});

export default ImgOnBoarding;
