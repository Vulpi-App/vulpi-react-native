// Tools
import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Platform,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LinearGradient } from "expo-linear-gradient";
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

const ListsScreen = ({
  navigation,
  userToken,
  userId,
  serverURL,
  reload,
  setReload,
}) => {
  // States for modals
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalUpdateVisible, setModalUpdateVisible] = useState(false);
  const [modalAddProductVisible, setModalAddProductVisible] = useState(false);
  const [valueInputAddQuickly, setValueInputAddQuickly] = useState();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

  // State for active lists (scrollbar horizontal)
  const [idListActive, setIdListActive] = useState();
  const [titleListActive, setTitleListActive] = useState();

  // State for new list
  const [newListCreated, setNewListCreated] = useState(false);

  // State for delete or update a list (modal)
  const [updateList, setUpdateList] = useState(false);
  const [deleteList, setDeleteList] = useState(false);

  // State for fold or unfold list of lists
  const [foldedNav, setFoldedNav] = useState(true);

  // State for autocomplete
  const [dataProductsDisplay, setDataProductsDisplay] = useState([]);

  // State for refresh products list
  const [addProductList, setAddProductList] = useState(false);

  // console.log(idListActive);
  // console.log(idProductActif);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${serverURL}/lists/${userId}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        // console.log("===== response.data", response.data);

        !data ? setIdListActive(response.data.lists[0]._id) : null;
        setData(response.data);
        // setTitleListActive(response.data.lists[0].title);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [
    newListCreated,
    addProductList,
    updateList,
    deleteList,
    userId,
    userToken,
    reload,
  ]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleModalUpdate = () => {
    setModalUpdateVisible(!isModalUpdateVisible);
  };

  const foldOrUnfoldLists = () => {
    setFoldedNav(!foldedNav);
  };

  return loading ? (
    <LinearGradient colors={["#1E2C79", "#232952"]} style={styles.background}>
      <ActivityIndicator size="large" color={white} />
    </LinearGradient>
  ) : (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.pageScreen}>
        <KeyboardAwareScrollView
          contentContainerStyle={{ height: "100%" }}
          viewIsInsideTabBar={false}
          extraScrollHeight={-57}
        >
          <View style={styles.globalContainer}>
            <View style={styles.wrapper}>
              {/* ----- Header ✅ */}
              <ListHeader
                data={data}
                idListActive={idListActive}
                foldedNav={foldedNav}
                setFoldedNav={setFoldedNav}
                foldOrUnfoldLists={foldOrUnfoldLists}
              />

              {/* ----- Navigation scrollbar horizontal ✅ */}

              {foldedNav ? null : (
                <View>
                  <ListButtonChoice
                    toggleModal={toggleModal}
                    data={data}
                    idListActive={idListActive}
                    setIdListActive={setIdListActive}
                    setTitleListActive={setTitleListActive}
                  />
                </View>
              )}

              {/* ----- List(s) ✅ */}

              <ListFull
                data={data}
                idListActive={idListActive}
                userToken={userToken}
                toggleModalUpdate={toggleModalUpdate}
                addProductList={addProductList}
                setAddProductList={setAddProductList}
                serverURL={serverURL}
              />
            </View>

            {/* <View> */}
            <View style={styles.blockBottomAddQuicklyAutocomplete}>
              {valueInputAddQuickly && dataProductsDisplay.length > 0 ? (
                <ProductLineAutoComplete
                  firstLine={true}
                  setValueInputAddQuickly={setValueInputAddQuickly}
                  valueAutocomplete={dataProductsDisplay[0].name}
                  idList={idListActive}
                  userToken={userToken}
                  addProductList={addProductList}
                  setAddProductList={setAddProductList}
                  serverURL={serverURL}
                />
              ) : null}
              {valueInputAddQuickly && dataProductsDisplay.length > 1 ? (
                <ProductLineAutoComplete
                  firstLine={false}
                  setValueInputAddQuickly={setValueInputAddQuickly}
                  valueAutocomplete={dataProductsDisplay[1].name}
                  idList={idListActive}
                  userToken={userToken}
                  addProductList={addProductList}
                  setAddProductList={setAddProductList}
                  serverURL={serverURL}
                />
              ) : null}
              {valueInputAddQuickly ? (
                <ProductLineAutoComplete
                  firstLine={dataProductsDisplay.length > 0 ? false : true}
                  setValueInputAddQuickly={setValueInputAddQuickly}
                  valueAutocomplete={valueInputAddQuickly}
                  idList={idListActive}
                  userToken={userToken}
                  addProductList={addProductList}
                  setAddProductList={setAddProductList}
                  serverURL={serverURL}
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
            {/* </View> */}
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>

      {/* Modal "+ New list" ✅  */}
      <ListModalNewList
        serverURL={serverURL}
        userToken={userToken}
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        newListCreated={newListCreated}
        setNewListCreated={setNewListCreated}
        setReload={setReload}
      />

      {/* Modal "Update or delete a list" ✅*/}
      <ListModalRenameList
        serverURL={serverURL}
        userToken={userToken}
        userId={userId}
        listId={idListActive}
        isModalUpdateVisible={isModalUpdateVisible}
        setModalUpdateVisible={setModalUpdateVisible}
        updateList={updateList}
        setUpdateList={setUpdateList}
        deleteList={deleteList}
        setDeleteList={setDeleteList}
        titleListActive={titleListActive}
        setReload={setReload}
      />

      {/* Modal "Add Product" */}
      <ModalProduct
        modalAddProductVisible={modalAddProductVisible}
        setModalAddProductVisible={setModalAddProductVisible}
        typeModalProduct="new product"
        idList={idListActive}
        userToken={userToken}
        // product={null}
        addProductList={addProductList}
        setAddProductList={setAddProductList}
        serverURL={serverURL}
      />
    </View>
  );
};

export default ListsScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  screen: {
    flex: 1,
    backgroundColor: buttonDarkBlue,
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
    flex: 1,
  },
  blockBottomAddQuicklyAutocomplete: {
    height: 65,
    justifyContent: "flex-end",
  },
});
