import React from "react";
import {
  Image,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Constants from "expo-constants";

const windowHeight = Dimensions.get("window").height;
const statusBarHeight = Constants.statusBarHeight;
const scrollViewHeight = windowHeight - statusBarHeight;

const ExploreScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.wrapper}>
        <Text style={styles.title}>Explorer</Text>
      </View>
      <View style={styles.block}>
        <Image
          source={require("../assets/illustrations/pic-magnifying-glass.png")}
          style={styles.image}
          resizeMode={"contain"}
        />
        <Text style={styles.subTitle}>Les promotions sont en chemin !</Text>
        <Text style={styles.description}>
          Psst : On est toujours en Beta, les promotions seront disponibles dans
          la prochaine version
        </Text>
      </View>
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    backgroundColor: "#F7F7F8",
    height: scrollViewHeight,
    alignItems: "center",
  },

  wrapper: {
    justifyContent: "flex-start",
    backgroundColor: "#FDFDFD",
    paddingBottom: "5%",
    paddingLeft: "5%",
    paddingTop: "20%",
    width: "100%",
  },

  block: {
    justifyContent: "center",
    alignItems: "center",
    height: "70%",
    width: "100%",
  },

  image: {
    width: 175,
  },

  title: {
    fontWeight: "600",
    color: "#232952",
    fontSize: 23,
  },

  subTitle: {
    fontWeight: "600",
    paddingTop: "15%",
    color: "#545560",
    fontSize: 18,
  },

  description: {
    textAlign: "center",
    color: "#545560",
    paddingTop: "5%",
    fontSize: 14,
  },
});
