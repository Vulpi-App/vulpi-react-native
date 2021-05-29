// React & React Native - Imports
import React from "react";
import { View, Image, StyleSheet } from "react-native";

// Colors - import
import colors from "../assets/colors";
const { orangeNotifications, mainBlueText } = colors;

// Ce-dessous en props: {color, source, resizeMode}
const ListIconCircle = ({ color, source, resizeMode }) => {
  return (
    <View
      // Orange icon still possible in new design? In case, keep it here
      style={
        (color === "orange" && [styles.circleIcon, styles.circleIconOrange]) ||
        (color === "blue" && [styles.circleIcon, styles.circleIconBlue])
      }
    >
      <Image style={styles.icon} source={source} resizeMode={resizeMode} />
    </View>
  );
};

export default ListIconCircle;

const styles = StyleSheet.create({
  circleIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  circleIconOrange: {
    backgroundColor: orangeNotifications,
  },
  circleIconBlue: {
    backgroundColor: mainBlueText,
  },
  icon: {
    width: 20,
    height: 20,
  },
});
