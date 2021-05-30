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
import ProductLineAutoComplete from "../components/ProductLineAutocomplete";

// Colors - import
import colors from "../assets/colors";
const { buttonDarkBlue, white } = colors;

// ======================================

const ListsScreen = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const [modalAddProductVisible, setModalAddProductVisible] = useState(false);
  const [valueInputAddQuickly, setValueInputAddQuickly] = useState();

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

  const [dataProductsDisplay, setDataProductsDisplay] = useState([]);

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
    <View style={styles.screen}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ height: "100%", margin: 0 }}
        viewIsInsideTabBar={false}
      >
        <StatusBar style="light" />
        <SafeAreaView style={styles.pageScreen}>
          <View style={styles.globalContainer}>
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
            <View style={styles.blockBottomAddQuicklyAutocomplete}>
              {valueInputAddQuickly && dataProductsDisplay.length > 0 ? (
                <ProductLineAutoComplete
                  firstLine={true}
                  setValueInputAddQuickly={setValueInputAddQuickly}
                  valueAutocomplete={dataProductsDisplay[0].name}
                />
              ) : null}
              {valueInputAddQuickly && dataProductsDisplay.length > 1 ? (
                <ProductLineAutoComplete
                  firstLine={false}
                  setValueInputAddQuickly={setValueInputAddQuickly}
                  valueAutocomplete={dataProductsDisplay[1].name}
                />
              ) : null}
              {valueInputAddQuickly ? (
                <ProductLineAutoComplete
                  firstLine={dataProductsDisplay.length > 0 ? false : true}
                  setValueInputAddQuickly={setValueInputAddQuickly}
                  valueAutocomplete={valueInputAddQuickly}
                />
              ) : null}
              <ProductBottomBlockAdd
                setModalAddProductVisible={setModalAddProductVisible}
                valueInputAddQuickly={valueInputAddQuickly}
                setValueInputAddQuickly={setValueInputAddQuickly}
                dataProducts={data.user.products}
                setDataProductsDisplay={setDataProductsDisplay}
              />
            </View>
          </View>
          {/* Modal "+ Nouvelle liste" */}
          <ListModalNewList
            isModalVisible={isModalVisible}
            setModalVisible={setModalVisible}
          />
          {/* Modal "Add or Update Product"
        <ModalProduct
          modalAddProductVisible={modalAddProductVisible}
          setModalAddProductVisible={setModalAddProductVisible}
          typeModalProduct="update product"
        /> */}
        </SafeAreaView>
      </KeyboardAwareScrollView>
      {/* Modal "Add or Update Product" */}
      <ModalProduct
        modalAddProductVisible={modalAddProductVisible}
        setModalAddProductVisible={setModalAddProductVisible}
        typeModalProduct="update product"
      />
    </View>
  );
};

export default ListsScreen;

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
  },

  screen: { flex: 1 },

  pageScreen: {
    backgroundColor: buttonDarkBlue,
    flex: 1,
    // height: "100%",
  },

  globalContainer: {
    height: "100%",
    justifyContent: "space-between",
  },

  wrapper: {
    paddingTop: 20,
    width: "96%",
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    marginBottom: 0,
    marginLeft: "auto",
    marginRight: "auto",
  },

  blockBottomAddQuicklyAutocomplete: {},
});
