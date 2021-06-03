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
import Constants from "expo-constants";
import axios from "axios";
import { BlurView } from "expo-blur";
import * as ImagePicker from "expo-image-picker";

// Components

// Icons
import { AntDesign } from "@expo/vector-icons";

const ProductModalTakePicture = ({
  productModalPictureVisible,
  setProductModalPictureVisible,
  setPictureProduct,
  setModalAddProductVisible,
}) => {
  const getPermissionAndPhoto = async () => {
    // Get permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    // If permission granted, get the photo and store it in a state
    if (status === "granted") {
      // Get the photo
      const photo = await ImagePicker.launchImageLibraryAsync();
      setProductModalPictureVisible(false);
      // If User hasn't canceled, we store the photo in the corresponding state
      if (!photo.cancelled) {
        setPictureProduct(photo.uri);
        setProductModalPictureVisible(false);
        setModalAddProductVisible(true);
      }
    } else {
      alert("Permission d'accès à la galerie refusée");
    }
  };

  const getPermissionAndCamera = async () => {
    // Ask the User for permission to access his camera
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    // If permission granted, get the photo and store it in a state
    if (status === "granted") {
      // Take the photo
      const photo = await ImagePicker.launchCameraAsync();

      // If User hasn't canceled, we store the photo in the corresponding state
      if (!photo.cancelled) {
        setPictureProduct(photo.uri);
        setProductModalPictureVisible(false);
        setModalAddProductVisible(true);
      }
    } else {
      alert("Permission d'accès à la caméra refusée");
    }
  };

  return (
    <Modal
      style={styles.centeredView}
      animationType="fade"
      transparent={true}
      visible={productModalPictureVisible}
    >
      <TouchableOpacity
        style={
          productModalPictureVisible
            ? [styles.centeredViewModalVisible, styles.centeredViewModal]
            : styles.centeredViewModal
        }
        onPressOut={() => {
          setProductModalPictureVisible(false);
          setModalAddProductVisible(true);
        }}
      >
        <TouchableWithoutFeedback>
          <View style={styles.modalView}>
            <View style={styles.blockTop}>
              <AntDesign
                style={styles.iconClose}
                name="close"
                size={24}
                color="black"
                onPress={() => {
                  setProductModalPictureVisible(false);
                  setModalAddProductVisible(true);
                }}
              />
              <Text style={styles.choiceTakePicture}>
                Comment souhaitez-vous ajouter une photo ?
              </Text>
            </View>

            <View style={styles.blockBottom}>
              <TouchableOpacity
                style={styles.buttonsModalTakePicture}
                onPress={getPermissionAndCamera}
              >
                <Text style={styles.textButtons}>Prendre un photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonsModalTakePicture}
                onPress={getPermissionAndPhoto}
              >
                <Text style={styles.textButtons}>Choisir une photo</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

export default ProductModalTakePicture;

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
    height: "35%",
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
  iconClose: { alignSelf: "flex-end" },

  choiceTakePicture: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#181725",
    marginTop: 10,
    textAlign: "center",
    width: "100%",
  },

  blockBottom: { width: "100%" },

  buttonsModalTakePicture: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 18,
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#3443B9",
    marginTop: 15,
  },

  textButtons: { color: "#3443B9", fontWeight: "bold" },

  // //   buttonDelete: { backgroundColor: "#CA2121", marginBottom: 15 },
  // //   buttonCancel: {
  // //     borderStyle: "solid",
  // //     borderWidth: 1,
  // //     borderColor: "#3443B9",
  //   },
});
