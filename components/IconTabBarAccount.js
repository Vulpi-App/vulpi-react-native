import React from "react";
import { Image, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/core";

const IconTabBarAccount = () => {
  const isFocused = useIsFocused();

  return isFocused ? (
    <Image
      source={require("../assets/icon-tab-account-active.png")}
      resizeMode="contain"
      style={styles.iconsTabBar}
    />
  ) : (
    <Image
      source={require("../assets/icon-tab-account-inactive.png")}
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

export default IconTabBarAccount;
