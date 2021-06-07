// React & React Native - Imports
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from "react-native";
import { Dimensions } from "react-native";
import Modal from "react-native-modal";

// Axios - import
import axios from "axios";

// Components - import
import ListModalTitle from "./ListModalTitle";
import ListModalInput from "./ListModalInput";

// Colors - import
import colors from "../assets/colors";
const { buttonFlashBlue, white, midGreyText, darkGreyText, deleteRed } = colors;

const ListModalNewList = ({
  serverURL,
  userToken,
  isModalVisible,
  setModalVisible,
  newListCreated,
  setNewListCreated,
  setReload,
}) => {
  // States for add a new list
  const [title, setTitle] = useState("");
  const [emoji, setEmoji] = useState("");
  const [disabled, setDisabled] = useState(true);

  // State for errors
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    try {
      if (title && emoji) {
        if (title.length <= 30) {
          if (emoji.length <= 2) {
            // Create form data to sent the body
            const formData = new FormData();
            formData.append("title", title);
            formData.append("emoji", emoji);

            const response = await axios.post(
              `${serverURL}/lists/create`,
              formData,
              {
                headers: { Authorization: `Bearer ${userToken}` },
              }
            );

            if (response.status === 200) {
              setModalVisible(false);
              setTitle("");
              setEmoji("");
              setErrorMessage("");
              setReload(true);
              setNewListCreated(!newListCreated);
            } else {
              setErrorMessage("⛔️ Une erreur s'est produite.");
            }
          } else {
            setErrorMessage(
              "⛔️ Vous ne pouvez choisir qu'un seul emoji pour votre liste."
            );
          }
        } else {
          setErrorMessage(
            "⛔️ Le titre de votre liste ne doit pas dépasser 30 caractères."
          );
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Modal
      avoidKeyboard
      style={styles.modal}
      isVisible={isModalVisible}
      onBackdropPress={() => {
        setErrorMessage("");
        setTitle("");
        setEmoji("");
        setModalVisible(false);
      }}
    >
      <View style={styles.modalWrap}>
        <View style={styles.modalContent}>
          <ListModalTitle title="Nouvelle liste" />
          <Text style={styles.errorMsg}>{errorMessage}</Text>
          <ListModalInput
            title="Nom de la liste *"
            placeholder="Nom de la liste"
            setFunction={setTitle}
            value={title}
            length={30}
            keyboardType={
              Platform.OS === "ios" ? "ascii-capable" : "visible-password"
            }
          />
          <ListModalInput
            title="Emoji *"
            placeholder="Emoji"
            setFunction={setEmoji}
            value={emoji}
            length={null}
            keyboardType="default"
          />
          {/* Button disabled if no title and no emoji filled */}
          {title && emoji ? (
            <TouchableOpacity
              disabled={!disabled}
              style={styles.btnBlue}
              onPress={() => {
                handleSubmit();
              }}
            >
              <Text style={styles.btnTextBlue}>Créer ma liste de courses</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              disabled={disabled}
              style={[styles.btnBlue, styles.btnDisabled]}
              onPress={() => {
                handleSubmit();
              }}
            >
              <Text style={[styles.btnTextBlue, styles.btnDisabledText]}>
                Créer ma liste de courses
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ListModalNewList;

const styles = StyleSheet.create({
  modal: {
    marginTop: -20,
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
  btnBlue: {
    backgroundColor: buttonFlashBlue,
    borderRadius: 8,
    padding: 15,
    textAlign: "center",
  },
  btnTextBlue: {
    color: white,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "GilroyBold",
    fontSize: 16,
  },
  btnDisabled: {
    backgroundColor: midGreyText,
  },
  btnDisabledText: {
    color: darkGreyText,
    fontFamily: "GilroyBold",
    fontSize: 16,
  },
  errorMsg: {
    textAlign: "center",
    marginBottom: 20,
    color: deleteRed,
    fontFamily: "GilroySemiBold",
  },
});
