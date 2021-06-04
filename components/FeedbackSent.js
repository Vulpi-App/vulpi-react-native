import React from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import colors from "../assets/colors";
const { buttonDarkBlue, bgLight } = colors;

// Components
import ButtonFeedback from "../components/ButtonFeedback";

const FeedbackSent = ({ setFeedbackSent }) => {
  return (
    <View style={styles.mainView}>
      <View style={styles.imgView}>
        <Image
          style={styles.img}
          source={require("../assets/illustrations/illu_envoisuggestion.png")}
        />
      </View>
      <Text style={[styles.title, styles.color]}>Bien reçu !</Text>
      <Text style={[styles.message, styles.color]}>
        Merci pour votre aide, on va étudier à 100% votre demande !
      </Text>
      <ButtonFeedback
        buttonTitle={"Retour au compte"}
        setFeedbackSent={setFeedbackSent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    alignItems: "center",
    position: "relative",
    flex: 1,
    backgroundColor: bgLight,
  },

  imgView: {
    alignItems: "flex-end",
    width: "100%",
  },

  img: {
    marginTop: 170,
    marginBottom: 40,
  },

  color: {
    color: buttonDarkBlue,
  },

  title: {
    fontSize: 23,
    marginBottom: 10,
    fontFamily: "GilroySemiBold",
  },

  message: {
    marginHorizontal: 50,
    textAlign: "center",
    fontSize: 16,
    lineHeight: 18.75,
    fontFamily: "GilroyMedium",
  },
});

export default FeedbackSent;
