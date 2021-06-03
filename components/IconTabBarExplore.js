import React from "react";
import { Image, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/core";

const IconTabBarExplore = () => {
  const isFocused = useIsFocused();

  return isFocused ? (
    <Image
      source={require("../assets/icon-tab-explore-active.png")}
      resizeMode="contain"
      style={styles.iconsTabBar}
    />
  ) : (
    <Image
      source={require("../assets/icon-tab-explore-inactive.png")}
      resizeMode="contain"
      style={styles.iconsTabBar}
    />
  );
};

const styles = StyleSheet.create({
  iconsTabBar: {
    width: 25,
    height: 25,
  },
});

export default IconTabBarExplore;
