// Tools
import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import colors from "../assets/colors";
const { buttonFlashBlue } = colors;

const ButtonFeedback = ({
  buttonTitle,
  setFeedbackSent,
  subject,
  description,
  userId,
  setErrorMessage,
  userToken,
  serverURL,
}) => {
  const navigation = useNavigation();

  const handlePress = async () => {
    setErrorMessage("");
    if (buttonTitle === "Retour au compte") {
      setFeedbackSent(false);
      navigation.navigate("AccountScreen");
    } else {
      try {
        if (subject && description) {
          if (subject.length <= 30) {
            const formData = new FormData();
            formData.append("subject", subject);
            formData.append("description", description);
            const response = await axios.post(
              `${serverURL}/feedback/create/${userId}`,
              formData,
              {
                headers: {
                  Authorization: "Bearer " + userToken,
                },
              }
            );

            if (response.status === 201) {
              setFeedbackSent(true);
            } else {
              setErrorMessage(
                "⛔️ Une erreur est survenue, veuillez réessayer."
              );
            }
          } else {
            setErrorMessage(
              "⛔️ Votre sujet est trop long, il doit faire moins de 30 caractères !"
            );
          }
        } else {
          setErrorMessage(
            "⛔️ Vous devez remplir tous les champs avant d'envoyer votre suggestion !"
          );
        }
      } catch (error) {
        console.log(error.message);
        setErrorMessage("⛔️ Une erreur est survenue, veuillez réessayer.");
      }
    }
  };
  return (
    <View style={styles.viewButton}>
      <TouchableOpacity
        style={
          buttonTitle === "Retour au compte"
            ? styles.button
            : [styles.button, styles.center]
        }
        onPress={handlePress}
      >
        <Text numberOfLines={1} style={styles.text}>
          {buttonTitle}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  viewButton: {
    position: "absolute",
    bottom: 100,
    alignItems: "center",
    width: "100%",
  },

  button: {
    backgroundColor: buttonFlashBlue,
    paddingHorizontal: 30,
    paddingVertical: 19,
    borderRadius: 10,
  },
  text: {
    color: "white",
  },
  center: {
    left: 30,
  },
});

export default ButtonFeedback;
