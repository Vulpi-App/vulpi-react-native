// Tools
import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  Modal,
  SafeAreaView,
} from "react-native";

// Components
import ModalProduct from "../components/ProductModalAddUpdate";

const ListScreen = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.screen}>
        <ModalProduct />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#232952",
  },
  screen: { flex: 1 },
});

export default ListScreen;
