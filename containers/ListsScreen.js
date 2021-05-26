// Tools
import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Platform,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
// import { BlurView } from "expo-blur"; TO TEST
// import LinearGradient from "react-native-linear-gradient"; // TO TEST

// Colors to fix
// Import linear gradient ??
// Colors file ?

// Components - import
import ListHeader from "../components/ListHeader";
import ListButtonChoice from "../components/ListButtonChoice";
import ListEmpty from "../components/ListEmpty";
import ListFull from "../components/ListFull";
import ListModalNewList from "../components/ListModalNewList";

const ListsScreen = ({ navigation }) => {
  // State for modal
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView style={styles.scrollView}>
        <StatusBar style="light" />

        <View style={styles.wrapper}>
          {/* Header */}
          <ListHeader />

          {/* All the lists & possibility to add a new list */}
          <ListButtonChoice toggleModal={toggleModal} />
          {/* ----- If list IS empty ----- */}
          <ListEmpty />
          {/* ----- If list is NOT not empty ----- */}
          {/* <ListFull /> */}

          <Button
            title="Ma liste maison"
            onPress={() => {
              navigation.navigate("ListScreen");
            }}
          />
        </View>
      </ScrollView>
      {/* Modal "+ Nouvelle liste" */}
      <ListModalNewList
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
      />
    </SafeAreaView>
  );
};

export default ListsScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#232952",
    flex: 1,
  },
  scrollView: {
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    paddingTop: 20,
  },
  wrapper: {
    width: "96%",
    marginTop: 0,
    marginBottom: 0,
    marginLeft: "auto",
    marginRight: "auto",
  },
});
