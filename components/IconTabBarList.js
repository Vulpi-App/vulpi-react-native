import React from "react";
import { Image, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/core";

const IconTabBarList = () => {
  const isFocused = useIsFocused();

  return isFocused ? (
    <Image
      source={require("../assets/icon-tab-list-active.png")}
      resizeMode="contain"
      style={styles.iconsTabBar}
    />
  ) : (
    <Image
      source={require("../assets/icon-tab-list-inactive.png")}
      resizeMode="contain"
      style={styles.iconsTabBar}
    />
  );
};

const styles = StyleSheet.create({
  iconsTabBar: {
    width: 20,
    height: 20,
  },
});

export default IconTabBarList;
