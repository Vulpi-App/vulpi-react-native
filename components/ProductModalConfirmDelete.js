// Tools
import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";

// Components

const ModalDeleteProduct = ({
  modalDeleteProductVisible,
  setModalDeleteProductVisible,
  setModalAddProductVisible,
  deleteProduct,
}) => {
  return (
    <Modal
      style={styles.centeredView}
      animationType="fade"
      transparent={true}
      visible={modalDeleteProductVisible}
    >
      <TouchableOpacity
        style={
          modalDeleteProductVisible
            ? [styles.centeredViewModalVisible, styles.centeredViewModal]
            : styles.centeredViewModal
        }
        onPressOut={() => {
          setModalDeleteProductVisible(false);
          setModalAddProductVisible(true);
        }}
      >
        <TouchableWithoutFeedback>
          <View style={styles.modalView}>
            <View style={styles.blockTop}>
              <Text style={styles.modalDeleteTitle}>
                Supprimer cet article ?
              </Text>
              <Text style={styles.modalDeleteText}>
                Êtes-vous sûr de vouloir supprimer cet article de votre liste ?
              </Text>
            </View>
            <View style={styles.blockBottom}>
              <TouchableHighlight
                style={[styles.buttonDelete, styles.buttonsModalDelete]}
                onPress={deleteProduct}
              >
                <Text style={styles.textButtonDelete}>Supprimer</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={[styles.buttonCancel, styles.buttonsModalDelete]}
                onPress={() => {
                  setModalDeleteProductVisible(false);
                  setModalAddProductVisible(true);
                }}
              >
                <Text style={styles.textButtonCancel}>
                  Annuler et retourner à la personnalisation
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

export default ModalDeleteProduct;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: Constants.statusBarHeight,
  },
  centeredViewModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredViewModalVisible: { backgroundColor: "rgba(0,0,0,0.7)" },
  modalView: {
    width: "90%",
    height: "36%",
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  blockTop: { width: "100%" },

  modalDeleteTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#181725",
    marginBottom: 30,
    textAlign: "left",
    width: "100%",
  },
  modalDeleteText: {
    color: "#545560",
    textAlign: "left",
    width: "100%",
    fontSize: 15,
  },

  blockBottom: { width: "100%" },

  buttonsModalDelete: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  buttonDelete: { backgroundColor: "#CA2121", marginBottom: 15 },
  buttonCancel: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#3443B9",
  },
  textButtonDelete: { color: "white", fontWeight: "bold" },
  textButtonCancel: { color: "#3443B9", fontWeight: "bold" },
});
