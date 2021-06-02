// Tools
import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Platform,
  SafeAreaView,
} from "react-native";

import colors from "../assets/colors";
const { bgLight, buttonDarkBlue } = colors;

// Components
import FormFeedback from "../components/FormFeedback";
import FeedbackSent from "../components/FeedbackSent";

const FeedbackScreen = () => {
  const [feedbackSent, setFeedbackSent] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backButton}>
        <Image
          source={require("../assets/icon-chevron-left-blue.png")}
          style={styles.image}
          resizeMode={"contain"}
        />
        <Text style={styles.backText}>J'ai une suggestion</Text>
      </View>
      {!feedbackSent ? (
        <FormFeedback setFeedbackSent={setFeedbackSent} />
      ) : (
        <FeedbackSent setFeedbackSent={setFeedbackSent} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    position: "relative",
    flex: 1,
    backgroundColor: bgLight,
  },

  backButton: {
    flexDirection: "row",
    width: "100%",
  },

  image: {
    marginRight: 25,
    height: "30%",
    marginTop: 5,
    width: "5%",
  },

  backText: {
    fontWeight: "600",
    color: buttonDarkBlue,
    fontSize: 23,
    width: "75%",
    fontFamily: "GilroySemiBold",
    lineHeight: 26.95,
  },
});

export default FeedbackScreen;
