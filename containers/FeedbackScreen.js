// Tools
import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Platform,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import Constants from "expo-constants";

import colors from "../assets/colors";
const { bgLight, buttonDarkBlue } = colors;

// Components
import FormFeedback from "../components/FormFeedback";
import FeedbackSent from "../components/FeedbackSent";

const FeedbackScreen = ({ userId, userToken, serverURL }) => {
  const [feedbackSent, setFeedbackSent] = useState(false);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("AccountScreen");
        }}
      >
        <View style={styles.backButton}>
          <Image
            source={require("../assets/icon-chevron-left-blue.png")}
            style={styles.image}
            resizeMode={"contain"}
          />
          <Text style={styles.backText}>J'ai une suggestion</Text>
        </View>
      </TouchableOpacity>
      {!feedbackSent ? (
        <FormFeedback
          setFeedbackSent={setFeedbackSent}
          userId={userId}
          userToken={userToken}
          serverURL={serverURL}
        />
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
    marginHorizontal: 20,
    marginTop: 15,
  },

  image: {
    marginRight: 10,
    height: 20,
    marginTop: 3,
    width: 20,
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
