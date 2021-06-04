import React, { useState } from "react";
import {
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  View,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";

import colors from "../assets/colors";
const { darkGreyFutur, mainBlueText, buttonFlashBlue, deleteRed } = colors;

const AddAvatarModal = ({
  avatar,
  setAvatar,
  setModalPictureVisible,
  editInformation,
  modalPictureVisible,
  setReloadUser,
}) => {
  const [pictureChosen, setPictureChosen] = useState(false);
  const [isLoadingTake, setIsLoadingTake] = useState(false);
  const [isLoadingChoose, setIsLoadingChoose] = useState(false);

  const getPermissionAndPhoto = async () => {
    setIsLoadingChoose(true);
    // Get permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    // If permission granted, get the photo and store it in a state
    if (status === "granted") {
      // Get the photo
      const photo = await ImagePicker.launchImageLibraryAsync();

      // If User hasn't canceled, we store the photo in the corresponding state
      if (!photo.cancelled) {
        setAvatar(photo.uri);
        setPictureChosen(true);
      }
      setIsLoadingChoose(false);
    } else {
      alert("Permission d'accès à la galerie refusée");
    }
  };

  const getPermissionAndCamera = async () => {
    setIsLoadingTake(true);
    // Ask the User for permission to access his camera
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    // If permission granted, get the photo and store it in a state
    if (status === "granted") {
      // Take the photo
      const photo = await ImagePicker.launchCameraAsync();

      // If User hasn't canceled, we store the photo in the corresponding state
      if (!photo.cancelled) {
        setAvatar(photo.uri);
        setPictureChosen(true);
      }
      setIsLoadingTake(false);
    } else {
      alert("Permission d'accès à la caméra refusée");
    }
  };

  return !pictureChosen ? (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalPictureVisible}
    >
      <TouchableOpacity
        onPressOut={() => {
          setModalPictureVisible(false);
        }}
        style={styles.centeredView}
      >
        <View style={styles.viewModal}>
          <TouchableWithoutFeedback
            onPress={() => {
              setModalPictureVisible(false);
            }}
          >
            <AntDesign
              style={styles.iconClose}
              name="close"
              size={24}
              color="black"
            />
          </TouchableWithoutFeedback>

          <Text style={styles.choiceTakePicture}>
            Comment souhaitez-vous ajouter votre avatar ?
          </Text>
          <TouchableOpacity
            onPress={getPermissionAndCamera}
            style={styles.buttonsModalTakePicture}
          >
            {isLoadingTake ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.textButtons}>Prendre une photo</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={getPermissionAndPhoto}
            style={styles.buttonsModalTakePicture}
          >
            {isLoadingChoose ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.textButtons}>Choisir une photo</Text>
            )}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  ) : (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalPictureVisible}
      style={styles.centeredView}
    >
      <TouchableOpacity
        onPressOut={() => {
          setModalPictureVisible(false);
        }}
        style={styles.centeredView}
      >
        <View style={styles.viewModal}>
          <Image source={avatar} />
          <TouchableOpacity
            style={styles.buttonsModalTakePicture}
            onPress={() => {
              setPictureChosen(false);
              editInformation("avatar", true);
              setModalPictureVisible(false);
            }}
          >
            <Text style={styles.textButtons}>Enregistrer le nouvel avatar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setReloadUser(true);
              setPictureChosen(false);
            }}
            style={[styles.buttonsModalTakePicture, styles.redButton]}
          >
            <Text style={styles.whiteTextButton}>Annuler</Text>
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

  choiceTakePicture: {
    fontSize: 20,
    color: mainBlueText,
    marginTop: 20,
    textAlign: "center",
    fontFamily: "GilroySemiBold",
    marginBottom: 20,
  },

  buttonsModalTakePicture: {
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

  textButtons: { color: buttonFlashBlue, fontFamily: "GilroyBold" },

  redButton: {
    backgroundColor: deleteRed,
    borderColor: deleteRed,
  },

  whiteTextButton: {
    fontFamily: "GilroyBold",
    color: "white",
  },
});

export default AddAvatarModal;
