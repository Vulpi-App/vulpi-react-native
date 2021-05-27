// React & React Native - Imports
import React from "react";
import { View, StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import Modal from "react-native-modal";

// Components - import
import ListModalTitle from "./ListModalTitle";
import ListModalInput from "./ListModalInput";
import ListModalButton from "./ListModalButton";

const ListModalNewList = ({ isModalVisible, setModalVisible }) => {
  return (
    <Modal
      style={styles.modal}
      isVisible={isModalVisible}
      onBackdropPress={() => setModalVisible(false)}
    >
      <View style={styles.modalWrap}>
        <View style={styles.modalContent}>
          <ListModalTitle title="Nouvelle liste" />
          <ListModalInput placeholder="Nom de la liste" />
          <ListModalButton name="Créer ma liste" color="blue" />
        </View>
      </View>
    </Modal>
  );
};

export default ListModalNewList;

const styles = StyleSheet.create({
  modal: {
    alignItems: "center",
    flex: 1,
  },
  modalWrap: {
    width: Dimensions.get("window").width,
    alignItems: "center",
    maxHeight: "50%",
  },
  modalContent: {
    width: "96%",
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 10,
  },
  modalHeader: {
    marginBottom: 30,
  },
});
