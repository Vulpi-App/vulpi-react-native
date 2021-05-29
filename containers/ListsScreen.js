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

// Axios - import
import axios from "axios";

// Components - import
import ListHeader from "../components/ListHeader";
import ListButtonChoice from "../components/ListButtonChoice";
import ListFull from "../components/ListFull";
import ListModalNewList from "../components/ListModalNewList";
import ProductBottomBlockAdd from "../components/ProductBottomBlockAdd";
import ModalProduct from "../components/ProductModalAddUpdate";

// Colors - import
import colors from "../assets/colors";
const { buttonDarkBlue, white } = colors;

// ======================================

const ListsScreen = ({ navigation }) => {
  // States for modals
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalAddProductVisible, setModalAddProductVisible] = useState(false);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

  // State for active lists (scrollbar horizontal)
  const [idListActive, setIdListActive] = useState();

  // State for new list
  const [newListCreated, setNewListCreated] = useState("");

  // TEST EN DUR
  const userToken =
    "0rrwD83Xi4K2VJMbEhQy1XMdjo9mNmejYrYm9AY745At9r1E3HcJGOW7f4EBuZmx";
  const userId = "60af5e6d8e67798590ac5ed2";
  const listId = "60af5e6d8e67798590ac5ed3";

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
        // console.log("response.data ", response.data);

        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [newListCreated]);

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
            {/* ----- Header ✅ 
            🚨 Gérer le toggle dépliant 
            🚨 Gérer les onPress "notifications" + "partager"*/}
            <ListHeader data={data} idListActive={idListActive} />

            {/* ----- Navigation scrollbar horizontal ✅ 
            🚨 Gérer l'ajout de la nouvelle liste au DEBUT et non à la suite des listes existantes */}
            <ListButtonChoice
              toggleModal={toggleModal}
              data={data}
              idListActive={idListActive}
              setIdListActive={setIdListActive}
            />
            {/* ----- List(s) ✅ 
             🚨 Problème de récupération du nom du produit (route back listcontent/:listId ne fonctionne pas) */}
            <ListFull data={data} idListActive={idListActive} />

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

        {/* Modal "+ New list" */}
        <ListModalNewList
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
          userToken={userToken}
          listId={listId}
          setNewListCreated={setNewListCreated}
          newListCreated={newListCreated}
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
  pageScreen: {
    flex: 1,
  },
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
