import React from "react";
import { StyleSheet, Text, View } from "react-native";

function Message({ message }) {
  return (
    <View style={styles.errorView}>
      {message !== null && <Text>{message}</Text>}
    </View>
  );
}

export default Message;

const styles = StyleSheet.create({
  errorView: {
    height: 30,
  },
  errorText: {
    color: colors.pink,
  },
  successText: {
    color: "blue",
  },
});
