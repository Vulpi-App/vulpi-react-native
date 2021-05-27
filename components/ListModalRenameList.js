// React & React Native - Imports
import React from "react";
import { View, StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import Modal from "react-native-modal";

// Components - import
import ListModalTitle from "./ListModalTitle";
import ListModalInput from "./ListModalInput";
import ListModalButton from "./ListModalButton";

const ListModalRenameList = () => {
  return (
    <Modal
      style={styles.modal}
      isVisible={isModalVisible}
      onBackdropPress={() => setModalVisible(false)}
    >
      <View style={styles.modalWrap}>
        <View style={styles.modalContent}>
          <ListModalTitle title="Renommer la liste" />
          <ListModalInput placeholder="Barbecue" />
          <ListModalButton name="Renommer ma liste" color="blue" />
          <ListModalButton name="Supprimer la liste" color="white" />
        </View>
      </View>
    </Modal>
  );
};

export default ListModalRenameList;

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
