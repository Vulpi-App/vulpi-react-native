// React & React Native - Imports
import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Dimensions } from "react-native";
import Modal from "react-native-modal";
import axios from "axios";

// Components - import
import ListModalTitle from "./ListModalTitle";
import ListModalInput from "./ListModalInput";

// Colors - import
import colors from "../assets/colors";
const { buttonFlashBlue, white, deleteRed, midGreyText, darkGreyText } = colors;

const ListModalRenameList = ({
  isModalUpdateVisible,
  setModalUpdateVisible,
  userToken,
  listId,
  setDeleteList,
  setUpdateList,
}) => {
  // State for rename list
  const [title, setTitle] = useState("");
  const [disabled, setDisabled] = useState(true);

  // State for errors
  const [errorMessage, setErrorMessage] = useState("");

  // Function for update the title of a list ✅
  const handleSubmit = async () => {
    try {
      if (title) {
        if (title.length <= 30) {
          // Create form data to sent the body
          const formData = new FormData();
          formData.append("title", title);

          const response = await axios.put(
            `http://localhost:3310/lists/update/${listId}`,
            formData,
            {
              headers: { Authorization: `Bearer ${userToken}` },
            }
          );

          console.log(response.status);

          if (response.status === 200) {
            setModalUpdateVisible(false);
            setTitle("");
            setUpdateList();
          } else {
            setErrorMessage("⛔️ Une erreur s'est produite.");
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

  // Function for delete a list ✅
  const deleteListFunc = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3310/lists/delete/${listId}`,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );

      console.log(response.data);

      if (response.status === 200) {
        setModalUpdateVisible(false);
        setDeleteList();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Modal
      avoidKeyboard
      style={styles.modal}
      isVisible={isModalUpdateVisible}
      onBackdropPress={() => {
        setErrorMessage("");
        setTitle("");
        setModalUpdateVisible(false);
      }}
    >
      <View style={styles.modalWrap}>
        <View style={styles.modalContent}>
          <ListModalTitle title="Renommer la liste" />
          <Text style={styles.errorMsg}>{errorMessage}</Text>
          <ListModalInput
            title="Nom de la liste"
            placeholder="Barbecue"
            setFunction={setTitle}
            value={title}
            length={30}
          />

          {/* Button disabled if no title filled */}
          {title ? (
            <TouchableOpacity
              disabled={!disabled}
              style={styles.btnBlue}
              onPress={async () => {
                handleSubmit();
              }}
            >
              <Text style={styles.btnTextBlue}>Renommer ma liste</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              disabled={disabled}
              style={[styles.btnBlue, styles.btnDisabled]}
              onPress={async () => {
                handleSubmit();
              }}
            >
              <Text style={[styles.btnTextBlue, styles.btnDisabledText]}>
                Renommer ma liste
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.btnDelete}>
            <Text
              style={styles.btnTextDelete}
              onPress={async () => {
                deleteListFunc();
              }}
            >
              Supprimer ma liste
            </Text>
          </TouchableOpacity>
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
  },
  btnDelete: {
    padding: 15,
    textAlign: "center",
    marginTop: 20,
  },
  btnTextDelete: {
    color: deleteRed,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  btnDisabled: {
    backgroundColor: midGreyText,
  },
  btnDisabledText: {
    color: darkGreyText,
  },
  errorMsg: {
    textAlign: "center",
    marginBottom: 20,
    color: deleteRed,
  },
});
