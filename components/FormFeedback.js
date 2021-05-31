import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput } from "react-native";
import colors from "../assets/colors";
const { bgLightText } = colors;

// Components
import ButtonFeedback from "../components/ButtonFeedback";

const FormFeedback = ({ setFeedbackSent }) => {
  const [object, setObject] = useState("");
  const [message, setMessage] = useState("");
  return (
    <View style={styles.mainView}>
      <Text style={styles.title}>C'est à quel sujet ?</Text>
      {/* <TextInput
        value={object}
        style={styles.textInput}
        onChangeText={(text) => {
          setObject(text);
        }}
        placeholder="Bug technique"
      /> */}
      <TextInput
        placeholder="Bug Technique"
        style={styles.textInput}
        value={object}
        onChangeText={(text) => {
          setObject(text);
        }}
      />
      <Text style={styles.title}>On t'écoutes, dis-nous tout :</Text>
      <TextInput
        value={message}
        style={[styles.textInput, styles.multiline]}
        multiline={true}
        textAlignVertical="top"
        onChangeText={(text) => {
          setMessage(text);
        }}
        placeholder="Dis-nous ce dont tu rêves sur Vulpi, ce qui ne marche pas ou tout ce que tu voudrais nous dire d’autre 😉"
      />
      <ButtonFeedback
        buttonTitle={"🚀  Envoyer ma suggestion à l'équipe !"}
        setFeedbackSent={setFeedbackSent}
        object={object}
        message={message}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    marginTop: 80,
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
  },

  multiline: {
    height: 236,
    paddingVertical: 40,
  },

  title: {
    fontSize: 14,
    marginBottom: 10,
    marginTop: 30,
  },
});

export default FormFeedback;
