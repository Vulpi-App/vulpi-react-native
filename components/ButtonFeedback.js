// Tools
import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../assets/colors";
const { buttonFlashBlue } = colors;

// const handlePress = () => {
//   if (buttonTitle === "Retour au compte") {
//   } else {
//     setFeedbackSent(true);
//   }
// };

const ButtonFeedback = ({ buttonTitle, setFeedbackSent, object, message }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (buttonTitle === "Retour au compte") {
      navigation.navigate("AccountScreen");
    } else {
      // Add request to DB to save message in DB
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
    bottom: 130,
    right: 30,
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
    marginHorizontal: "auto",
  },
});

export default ButtonFeedback;
