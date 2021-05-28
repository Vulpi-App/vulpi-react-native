// Tools
import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Platform,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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
import ProductBottomBlockAdd from "../components/ProductBottomBlockAdd";
import ModalProduct from "../components/ProductModalAddUpdate";

const ListsScreen = ({ navigation }) => {
  // State for modal
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalAddProductVisible, setModalAddProductVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <KeyboardAwareScrollView style={styles.pageScreen}>
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
  screen: {
    backgroundColor: "#232952",
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
