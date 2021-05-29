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
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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
import ProductBottomBlockAdd from "../components/ProductBottomBlockAdd";
import ModalProduct from "../components/ProductModalAddUpdate";

// Colors - import
import colors from "../assets/colors";
const { buttonDarkBlue, white } = colors;

// ======================================

const ListsScreen = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const [modalAddProductVisible, setModalAddProductVisible] = useState(false);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  // States different screens
  const [emptyList, setEmptyList] = useState(true);
  const [selectedList, setSelectedList] = useState();
  const [productCheck, setProductCheck] = useState(false);

  // TEST ROUTE
  const userToken = "cccc";
  const userId = "60abcb97ac82f76c79939767";

  // console.log("userToken ", userToken);
  // console.log("userId ", userId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://192.168.0.20:3310/lists/${userId}`,
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

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return loading ? (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={white} />
    </View>
  ) : (
    <KeyboardAwareScrollView style={styles.pageScreen}>
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
        <ProductBottomBlockAdd
          setModalAddProductVisible={setModalAddProductVisible}
        />

        {/* Modal "+ Nouvelle liste" */}
        <ListModalNewList
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
        />
        {/* Modal "Add or Update Product" */}
        <ModalProduct
          modalAddProductVisible={modalAddProductVisible}
          setModalAddProductVisible={setModalAddProductVisible}
          typeModalProduct="update product"
        />
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default ListsScreen;

const styles = StyleSheet.create({
  pageScreen: { flex: 1 },

  loading: {
    flex: 1,
    justifyContent: "center",
  },

  screen: {
    backgroundColor: buttonDarkBlue,
    flex: 1,
    justifyContent: "space-between",
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
