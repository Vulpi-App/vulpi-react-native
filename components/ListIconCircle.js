// React & React Native - Imports
import React from "react";
import { View, Image, StyleSheet } from "react-native";

// Ce-dessous en props: {color, source, resizeMode}
const ListIconCircle = ({ color }) => {
  return (
    <View
      style={
        (color === "orange" && [styles.circleIcon, styles.circleIconOrange]) ||
        (color === "blue" && [styles.circleIcon, styles.circleIconBlue])
      }
    >
      <Image style={styles.icon} />
    </View>
  );
};

export default ListIconCircle;

const styles = StyleSheet.create({
  circleIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginLeft: 10,
  },
  circleIconOrange: {
    backgroundColor: "#FF9900",
  },
  circleIconBlue: {
    backgroundColor: "#181D39",
  },
  icon: {
    width: 30,
    height: 30,
  },
});
