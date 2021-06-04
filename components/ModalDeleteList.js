import React, { useState } from "react";
import {
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  View,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import colors from "../assets/colors";
const { darkGreyFutur, buttonFlashBlue, deleteRed } = colors;

const ModalDeleteList = ({
  modalDeleteVisible,
  handleDeleteList,
  setModalDeleteVisible,
  activityIndicator,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalDeleteVisible}
      style={styles.centeredView}
    >
      <TouchableOpacity
        onPressOut={() => {
          setModalDeleteVisible(false);
        }}
        style={styles.centeredView}
      >
        <View style={styles.viewModal}>
          <TouchableWithoutFeedback
            onPress={() => {
              setModalDeleteVisible(false);
            }}
          >
            <AntDesign
              style={styles.iconClose}
              name="close"
              size={24}
              color="black"
            />
          </TouchableWithoutFeedback>
          <TouchableOpacity
            style={[styles.buttonsModal, styles.redButton]}
            onPress={handleDeleteList}
          >
            {!activityIndicator ? (
              <Text style={styles.whiteTextButton}>
                Valider la suppression de la liste
              </Text>
            ) : (
              <ActivityIndicator />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonsModal}
            onPress={() => {
              setModalDeleteVisible(false);
            }}
          >
            <Text style={styles.textButtons}>Annuler</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: darkGreyFutur,
  },

  viewModal: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 25,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },

  iconClose: {
    alignSelf: "flex-end",
  },

  buttonsModal: {
    justifyContent: "center",
    alignItems: "center",
    padding: 18,
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: buttonFlashBlue,
    marginTop: 15,
    width: 300,
  },

  redButton: {
    backgroundColor: deleteRed,
    borderColor: deleteRed,
  },

  textButtons: { color: buttonFlashBlue, fontFamily: "GilroyBold" },

  whiteTextButton: {
    fontFamily: "GilroyBold",
    color: "white",
  },
});

export default ModalDeleteList;
