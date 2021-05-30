// React & React Native - Imports
import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

// Colors - import
import colors from "../assets/colors";
const { buttonNewList, buttonFlashBlue, white } = colors;

const ListButtonOther = ({ item, idListActive, setIdListActive }) => {
  // Function to check the right list selected
  const changeListActive = () => {
    setIdListActive(item._id);
  };

  return (
    <TouchableOpacity
      onPress={changeListActive}
      style={
        item._id === idListActive ? styles.otherListBlue : styles.otherList
      }
    >
      <Text
        style={
          item._id === idListActive
            ? styles.otherListTextWhite
            : styles.otherListText
        }
      >
        {item.emoji} {item.title}
      </Text>
    </TouchableOpacity>
  );
};

export default ListButtonOther;

const styles = StyleSheet.create({
  otherList: {
    marginRight: 10,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#181D39",
  },
  otherListText: {
    color: buttonNewList,
  },
  otherListBlue: {
    marginRight: 10,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: buttonFlashBlue,
  },
  otherListTextWhite: {
    color: white,
  },
});
