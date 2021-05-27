// Tools
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Platform,
  ScrollView,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
// import { BlurView } from "expo-blur"; TO TEST
// import LinearGradient from "react-native-linear-gradient"; // TO TEST

// Axios - import
import axios from "axios";

// Components - import
import ListHeader from "../components/ListHeader";
import ListButtonChoice from "../components/ListButtonChoice";
import ListEmpty from "../components/ListEmpty";
import ListFull from "../components/ListFull";
import ListFolded from "../components/ListFolded";
import ListModalNewList from "../components/ListModalNewList";

// Colors - import
import colors from "../assets/colors";
const { buttonDarkBlue, white } = colors;

// ======================================

const ListsScreen = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  // States different screens
  const [emptyList, setEmptyList] = useState(true);
  const [selectedList, setSelectedList] = useState();
  const [productCheck, setProductCheck] = useState(false);

  // TEST ROUTE
  const userToken =
    "0rrwD83Xi4K2VJMbEhQy1XMdjo9mNmejYrYm9AY745At9r1E3HcJGOW7f4EBuZmx";
  const userId = "60af5e6d8e67798590ac5ed2";

  // console.log("userToken ", userToken);
  // console.log("userId ", userId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3310/lists/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        // console.log("response.data", response.data);
        // console.log("response.data.lists", response.data.lists);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  console.log(data);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return loading ? (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={white} />
    </View>
  ) : (
    <SafeAreaView style={styles.screen}>
      <ScrollView style={styles.scrollView}>
        <StatusBar style="light" />

        <View style={styles.wrapper}>
          {/* Header */}
          <ListHeader />

          {/* All the lists & possibility to add a new list */}
          <ListButtonChoice toggleModal={toggleModal} data={data} />
          {/* ----- If list IS empty ----- */}
          {/* <ListEmpty /> */}
          {/* ----- If list is NOT not empty ----- */}
          {/* <ListFull /> */}
          {/* ----- If list is FOLDED ----- */}
          <ListFolded />

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
  loading: {
    flex: 1,
    justifyContent: "center",
  },
  screen: {
    backgroundColor: buttonDarkBlue,
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
