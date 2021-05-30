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

// Axios - import
import axios from "axios";

// Components - import
import ListHeader from "../components/ListHeader";
import ListButtonChoice from "../components/ListButtonChoice";
import ListFull from "../components/ListFull";
import ListModalNewList from "../components/ListModalNewList";
import ListModalRenameList from "../components/ListModalRenameList";
import ProductBottomBlockAdd from "../components/ProductBottomBlockAdd";
import ModalProduct from "../components/ProductModalAddUpdate";
import ProductLineAutoComplete from "../components/ProductLineAutocomplete";

// Colors - import
import colors from "../assets/colors";
const { buttonDarkBlue, white } = colors;

// ======================================

const ListsScreen = ({ navigation }) => {
  // States for modals
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalAddProductVisible, setModalAddProductVisible] = useState(false);
  const [valueInputAddQuickly, setValueInputAddQuickly] = useState();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

  // State for active lists (scrollbar horizontal)
  const [idListActive, setIdListActive] = useState();

  // State for new list
  const [newListCreated, setNewListCreated] = useState("");

  // State for delete or update a list
  const [updateList, setUpdateList] = useState("");
  const [deleteList, setDeleteList] = useState("");

  // State for fold or unfold list of lists
  const [foldedNav, setFoldedNav] = useState(true);

  // TEST EN DUR
  const userToken = "cccc";
  const userId = "60abcb97ac82f76c79939767";
  const listId = "60abd473ebe4f06ebef9375b";

  console.log(idListActive);

  const [dataProductsDisplay, setDataProductsDisplay] = useState([]);

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
        setIdListActive(response.data.lists[0]._id);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [newListCreated, updateList, deleteList]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const foldOrUnfoldLists = () => {
    setFoldedNav(!foldedNav);
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
              {/* ----- Header 
            ✅  Gérer le toggle dépliant 
            🚨 Gérer les onPress "notifications" + "partager" - vers quelles screen ça renvoit ?*/}
              <ListHeader
                data={data}
                idListActive={idListActive}
                foldedNav={foldedNav}
                setFoldedNav={setFoldedNav}
                foldOrUnfoldLists={foldOrUnfoldLists}
              />

              {/* ----- Navigation scrollbar horizontal ✅ 
            🚨 Gérer l'ajout de la nouvelle liste au DEBUT et non à la suite des listes existantes */}
              {foldedNav ? null : (
                <ListButtonChoice
                  toggleModal={toggleModal}
                  data={data}
                  idListActive={idListActive}
                  setIdListActive={setIdListActive}
                />
              )}

              {/* ----- List(s) ✅ 
             🚨 Problème de récupération du nom du produit (route back listcontent/:listId ne fonctionne pas) 
             🚨 Gérer le screen au clic sur les 3 points */}
              <ListFull data={data} idListActive={idListActive} />

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
        </SafeAreaView>
      </KeyboardAwareScrollView>

      {/* Modal "+ New list" */}
      <ListModalNewList
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        userToken={userToken}
        listId={listId}
        setNewListCreated={setNewListCreated}
        newListCreated={newListCreated}
      />

      {/* Modal "update or delete a list" */}
      {/* <ListModalRenameList
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        userToken={userToken}
        listId={listId}
        updateList={updateList}
        setUpdateList={setUpdateList}
        deleteList={deleteList}
        setDeleteList={setDeleteList}
      /> */}

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
