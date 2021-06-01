// Tools
import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../assets/colors";
const { buttonFlashBlue } = colors;

const ButtonFeedback = ({ buttonTitle, setFeedbackSent, object, message }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (buttonTitle === "Retour au compte") {
      setFeedbackSent(false);
      navigation.navigate("AccountScreen");
    } else {
      // Add request to save message in DB
      setFeedbackSent(true);
    }
  };
  return (
    <View style={styles.viewButton}>
      <TouchableOpacity
        style={
          buttonTitle === "Retour au compte"
            ? styles.button
            : [styles.button, styles.center]
        }
        onPress={handlePress}
      >
        <Text numberOfLines={1} style={styles.text}>
          {buttonTitle}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  viewButton: {
    position: "absolute",
    bottom: 100,
    alignItems: "center",
    width: "100%",
  },

  button: {
    backgroundColor: buttonFlashBlue,
    paddingHorizontal: 30,
    paddingVertical: 19,
    borderRadius: 10,
  },
  text: {
    color: "white",
  },
  center: {
    left: 30,
  },
});

export default ButtonFeedback;
