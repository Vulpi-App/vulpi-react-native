// React & React Native - Imports
import React from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/core";

// Components - import
import ListMainTitle from "./ListMainTitle";
import ListToggle from "./ListToggle";

// Colors - import
import colors from "../assets/colors";
const { mainBlueText } = colors;

const ListHeader = ({
  data,
  idListActive,
  foldOrUnfoldLists,
  foldedNav,
  setFoldedNav,
}) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.wrapper, styles.headerWrap]}>
      <View>
        <ListMainTitle />
        <FlatList
          data={data.lists}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return (
              <ListToggle
                item={item}
                idListActive={idListActive}
                foldedNav={foldedNav}
                setFoldedNav={setFoldedNav}
                foldOrUnfoldLists={foldOrUnfoldLists}
              />
            );
          }}
        />
      </View>

      <View style={styles.headerIcon}>
        <TouchableOpacity
          style={[styles.circleIcon, styles.circleIconBlue]}
          onPress={() => {
            navigation.navigate("ListScreen");
          }}
        >
          <Image
            style={styles.icon}
            source={require("../assets/icon-bell.png")}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.circleIcon, styles.circleIconBlue]}
          onPress={() => {
            navigation.navigate("Account", { screen: "EditListScreen" });
          }}
        >
          <Image
            style={styles.icon}
            source={require("../assets/icon-share.png")}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ListHeader;

const styles = StyleSheet.create({
  headerWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  wrapper: {
    width: "94%",
    marginTop: 0,
    marginBottom: 20,
    marginLeft: "auto",
    marginRight: "auto",
  },
  headerIcon: {
    flexDirection: "row",
  },
  circleIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  circleIconBlue: {
    backgroundColor: mainBlueText,
  },
  icon: {
    width: 20,
    height: 20,
  },
});
