import React from "react";
import { Text, StyleSheet } from "react-native";

const TitleOnBoarding = ({ screenNumber }) => {
  // Modification of the title depending on the onBoarding page
  let titleContent;
  if (screenNumber === 0) {
    titleContent = "Crées une liste de course qui te suit partout";
  } else if (screenNumber === 1) {
    titleContent = "Toute la famille peut écrire sur la liste... ou pas";
  } else if (screenNumber === 2) {
    titleContent = "Une vraie liste de course qui vous ressemble !";
  } else if (screenNumber === 3) {
    titleContent = "Ne dépenses plus inutilement";
  }

  return (
    //<View>
    <Text
      style={screenNumber < 3 ? styles.title : [styles.title, styles.noMargin]}
      numberOfLines={screenNumber === 3 ? 1 : null}
    >
      {titleContent}
    </Text>
    //</View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "white",
    fontWeight: "700",
    fontSize: 24,
    marginHorizontal: 45,
    textAlign: "center",
    marginTop: 10,
    fontFamily: "GilroyBold",
  },

  noMargin: {
    marginHorizontal: "auto",
  },
});

export default TitleOnBoarding;
