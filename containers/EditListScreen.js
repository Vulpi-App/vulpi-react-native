import React, { useEffect, useState } from "react";
import {
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  StyleSheet,
  View,
  Platform,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import Constants from "expo-constants";
import axios from "axios";
import * as Haptics from "expo-haptics";

import ModalDeleteList from "../components/ModalDeleteList";

import colors from "../assets/colors";
const {
  bgLight,
  buttonDarkBlue,
  buttonFlashBlue,
  darkGreyFutur,
  bgLightText,
  deleteRed,
} = colors;

const EditListScreen = ({
  route,
  reload,
  setReload,
  serverURL,
  userToken,
  userId,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [listName, setListName] = useState("");
  const [listEmoji, setListEmoji] = useState("");
  const [message, setMessage] = useState("");
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
  const [activityIndicator, setActivityIndicator] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${serverURL}/list/${route.params.id}`,
          {
            headers: { Authorization: "Bearer " + userToken },
          }
        );

        setListName(response.data.title);
        setListEmoji(response.data.emoji);
        setReload(false);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [reload, serverURL]);

  const editInformation = async (data) => {
    try {
      const formData = new FormData();
      if (data === "listName") {
        if (!listName) {
          return setMessage(
            "Le nom de ta liste doit comporter au moins un caractère. 🤓"
          );
        }

        if (listName.length < 30) {
          formData.append("title", listName);
        } else {
          return setMessage(
            "⛔️ Le titre de ta liste ne doit pas dépasser 30 caractères."
          );
        }
      } else if (data === "listEmoji") {
        if (!listEmoji) {
          return setMessage(
            "Indique au moins un emoji pour modifier ta liste. 🤓"
          );
        }

        if (listEmoji.length === 2) {
          formData.append("emoji", listEmoji);
        } else if (listEmoji.length > 2) {
          return setMessage(
            "⛔️ Vous ne pouvez choisir qu'un seul emoji pour votre liste."
          );
        }
      }

      const response = await axios.put(
        `${serverURL}/lists/update/${route.params.id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );

      if (response.status === 200) {
        setMessage("Les informations de ta liste ont bien été modifiées ! ✨");
        setReload(true);
      } else {
        setMessage("⛔️ Une erreur s'est produite.");
      }
    } catch (error) {
      console.log(error.message);
      setMessage("⛔️ Une erreur s'est produite.");
    }
  };

  const handleDeleteList = async () => {
    setMessage("");
    setActivityIndicator(true);
    try {
      const response = await axios.delete(
        `${serverURL}/lists/delete/${route.params.id}/${userId}`,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );

      if (response.status === 200) {
        setReload(true);
        navigation.navigate("AccountScreen");
        setActivityIndicator(true);
      } else {
        setMessage("⛔️ Une erreur s'est produite");
        setActivityIndicator(true);
      }
    } catch (error) {
      if (
        error.response.data.message ===
        "Impossible to delete the user's last list 😳"
      ) {
        setMessage("Vous ne pouvez pas supprimer votre dernière liste 😳");
      } else {
        setMessage("⛔️ Une erreur s'est produite.");
      }
    }
  };

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <SafeAreaView style={styles.wrapper}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AccountScreen");
          }}
        >
          <View style={styles.backButton}>
            <Image
              source={require("../assets/icon-chevron-left-blue.png")}
              style={styles.image}
              resizeMode={"contain"}
            />
            <Text style={styles.backText}>Ma Liste</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.label}>Ma Liste</Text>
        <View style={styles.block}>
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.textInputButton}
              value={listName}
              onChangeText={(text) => {
                setListName(text);
                setMessage("");
              }}
            />
            <TouchableOpacity
              style={styles.buttonInput}
              onPress={() => {
                editInformation("listName");
              }}
            >
              <Text style={styles.buttonText}>modifier</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.block}>
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.textInputButton}
              value={listEmoji}
              onChangeText={(text) => {
                setListEmoji(text);
                setMessage("");
              }}
            />
            <TouchableOpacity
              style={styles.buttonInput}
              onPress={() => {
                editInformation("listEmoji");
              }}
            >
              <Text style={styles.buttonText}>modifier</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.message}>{message}</Text>
        <Text style={[styles.label, styles.marginTop]}>Partage</Text>
        <View style={styles.futur}>
          <Text style={styles.futurText}>
            Le partage de liste n’est pas encore disponible, il sera ajouté lors
            de la V1 de l’application. Nous sommes pour le moment en version
            beta.
          </Text>
        </View>
        <Text style={styles.label}>
          Envoi de notifications aux membres de la liste
        </Text>
        <View style={styles.futur}>
          <Text style={styles.futurText}>
            L’envoi de notifications sera également disponible dans la prochaine
            version.
          </Text>
        </View>
        <View style={styles.delete}>
          <View style={styles.block}>
            <TouchableOpacity
              style={styles.deleteButton}
              underlayColor={deleteRed}
              onPress={() => {
                Haptics.selectionAsync();
                setModalDeleteVisible(true);
              }}
            >
              <Text style={styles.deleteText}>Supprimer la liste</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ModalDeleteList
        handleDeleteList={handleDeleteList}
        setModalDeleteVisible={setModalDeleteVisible}
        modalDeleteVisible={modalDeleteVisible}
        activityIndicator={activityIndicator}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    backgroundColor: bgLight,
    flex: 1,
  },

  container: {
    marginHorizontal: 30,
    height: "100%",
  },

  backButton: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 40,
    marginTop: 15,
  },

  image: {
    marginRight: 10,
    height: 25,
    marginTop: 5,
    width: 25,
  },

  backText: {
    fontWeight: "600",
    color: buttonDarkBlue,
    fontSize: 23,
    width: "75%",
    fontFamily: "GilroySemiBold",
    lineHeight: 26.95,
  },

  image: {
    marginRight: 25,
    height: 14,
    marginTop: 5,
    width: 14,
  },

  label: {
    fontFamily: "GilroySemiBold",
    fontSize: 14,
    lineHeight: 16.41,
    marginBottom: 5,
  },

  block: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  inputText: {
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: "white",
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    fontWeight: "600",
    borderWidth: 1,
    width: "90%",
    fontSize: 16,
    height: 53,
  },

  inputWrap: {
    alignItems: "flex-end",
    width: "100%",
    marginBottom: 10,
  },
  textInputButton: {
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: "white",
    borderTopRightRadius: 8,
    borderColor: "#EEEEEE",
    borderTopLeftRadius: 8,
    fontWeight: "600",
    color: buttonDarkBlue,
    paddingLeft: 15,
    borderWidth: 1,
    width: "100%",
    fontSize: 16,
    height: 53,
  },

  buttonInput: {
    borderBottomRightRadius: 8,
    backgroundColor: buttonFlashBlue,
    borderBottomLeftRadius: 0,
    justifyContent: "center",
    borderTopRightRadius: 8,
    borderTopLeftRadius: 0,
    alignItems: "center",
    position: "absolute",
    height: 53,
    width: 112,
  },

  buttonText: {
    fontWeight: "600",
    color: "white",
    fontSize: 14,
    fontFamily: "GilroySemiBold",
  },

  marginTop: {
    marginTop: 20,
  },

  futur: {
    backgroundColor: darkGreyFutur,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    marginBottom: 35,
  },

  futurText: {
    color: bgLightText,
    fontFamily: "GilroySemiBold",
    lineHeight: 16.41,
  },

  message: {
    textAlign: "center",
    color: deleteRed,
  },

  delete: {
    position: "absolute",
    bottom: 15,
    width: "100%",
  },

  deleteButton: {
    backgroundColor: deleteRed,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 19,
    height: 67,
    width: "100%",
  },

  deleteText: {
    fontWeight: "600",
    color: "white",
    fontSize: 18,
    fontFamily: "GilroySemiBold",
  },
});

export default EditListScreen;
