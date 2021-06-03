import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput } from "react-native";
import colors from "../assets/colors";
const { bgLightText, buttonDarkBlue, deleteRed } = colors;

// Components
import ButtonFeedback from "../components/ButtonFeedback";

const FormFeedback = ({ setFeedbackSent, userId, userToken, serverURL }) => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <View style={styles.mainView}>
      <Text style={styles.title}>C'est à quel sujet ?</Text>

      <TextInput
        placeholder="Bug Technique"
        style={styles.textInput}
        value={subject}
        onChangeText={(text) => {
          setSubject(text);
        }}
      />
      <Text style={styles.title}>On t'écoutes, dis-nous tout :</Text>
      <TextInput
        value={description}
        style={[styles.textInput, styles.multiline]}
        multiline={true}
        textAlignVertical="top"
        onChangeText={(text) => {
          setDescription(text);
        }}
        placeholder="Dis-nous ce dont tu rêves sur Vulpi, ce qui ne marche pas ou tout ce que tu voudrais nous dire d’autre 😉"
      />
      <Text style={styles.errorMessage}>{errorMessage}</Text>
      <ButtonFeedback
        buttonTitle={"🚀  Envoyer ma suggestion à l'équipe !"}
        setFeedbackSent={setFeedbackSent}
        subject={subject}
        description={description}
        userId={userId}
        userToken={userToken}
        setErrorMessage={setErrorMessage}
        serverURL={serverURL}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    position: "relative",
    flex: 1,
    paddingHorizontal: 30,
  },

  textInput: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: bgLightText,
    paddingHorizontal: 15,
    paddingVertical: 15,
    color: buttonDarkBlue,
  },

  multiline: {
    height: 236,
    paddingVertical: 40,
  },

  title: {
    fontSize: 14,
    marginBottom: 10,
    marginTop: 30,
    fontFamily: "GilroySemiBold",
  },

  errorMessage: {
    color: deleteRed,
    textAlign: "center",
    marginTop: 10,
  },
});

export default FormFeedback;
