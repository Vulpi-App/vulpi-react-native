// Tools
import React from "react";
import { Text, Image, StyleSheet } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

const LaunchScreen = () => {
  return (
    <LinearGradient colors={["#1E2C79", "#232952"]} style={styles.background}>
      <Image
        source={require("../assets/logo-vulpi.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.text}>Vulpi</Text>
    </LinearGradient>
  );
};

export default LaunchScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 15,
  },
  text: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
});
