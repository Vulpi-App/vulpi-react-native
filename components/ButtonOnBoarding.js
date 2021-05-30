import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const ButtonOnBoarding = ({ side, screenNumber, setScreenNumber }) => {
  let iconName;
  if (side === "left") {
    iconName = "arrowleft";
  } else {
    iconName = "arrowright";
  }

  const handlePress = () => {
    if (side === "left") {
      setScreenNumber(screenNumber - 1);
    } else if (side === "right" && screenNumber < 3) {
      setScreenNumber(screenNumber + 1);
    } else if (side === "right" && screenNumber === 3) {
      // Set in local storage onBoarding has been seen
      // Change in DB firstConnection to false
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      {screenNumber === 3 && side === "right" && (
        <Text style={styles.text}>Terminer</Text>
      )}
      <AntDesign name={iconName} size={24} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 40,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "white",
    marginRight: 5,
  },
});

export default ButtonOnBoarding;
