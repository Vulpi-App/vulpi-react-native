import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput } from "react-native";
import colors from "../assets/colors";
const { bgLightText, buttonDarkBlue, deleteRed } = colors;
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// Components
import ButtonFeedback from "../components/ButtonFeedback";

const FormFeedback = ({ setFeedbackSent, userId, userToken, serverURL }) => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <KeyboardAwareScrollView style={styles.keyboardSafe}>
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
        <Text style={styles.title}>On vous écoutes, dites-nous tout :</Text>
        <TextInput
          value={description}
          style={[styles.textInput, styles.multiline]}
          multiline={true}
          textAlignVertical="top"
          onChangeText={(text) => {
            setDescription(text);
          }}
          placeholder="Dites-nous ce dont vous rêvez sur Vulpi, ce qui ne marche pas ou tout ce que vous voudriez nous dire d’autre 😉"
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
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    position: "relative",
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
