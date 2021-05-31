import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const ScreenNumberIndicator = ({ screenNumber }) => {
  const displayIndicator = (value) => {
    const tab = [];
    for (let i = 0; i < 4; i++) {
      if (i <= value) {
        tab.push(
          <View
            key={i}
            style={
              i < 3
                ? [styles.indicator, styles.marginRight]
                : [styles.indicator]
            }
          ></View>
        );
      } else {
        tab.push(
          <View
            key={i}
            style={
              i < 3
                ? [
                    styles.indicator,
                    styles.inactiveIndicator,
                    styles.marginRight,
                  ]
                : [styles.indicator, styles.inactiveIndicator]
            }
          ></View>
        );
      }
    }
    return tab;
  };
  return <View style={styles.mainView}>{displayIndicator(screenNumber)}</View>;
};

const styles = StyleSheet.create({
  mainView: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginVertical: 25,
  },

  indicator: {
    height: 6,
    width: screenWidth / 4 - 15,
    backgroundColor: "white",
    borderRadius: 3,
  },

  inactiveIndicator: {
    opacity: 0.45,
  },

  marginRight: {
    marginRight: 10,
  },
});

export default ScreenNumberIndicator;
