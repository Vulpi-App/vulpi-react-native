// Tools
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";

// URL request
const localURLAdd = "http://localhost:3310/lists/add-product/";

// Variables test -> A modifier avec les vrais valeurs quand Manon aura finalisé
const idList = "60abd473ebe4f06ebef9375b";
const userToken = "cccc";

const ProductLineAutoComplete = ({
  firstLine,
  setValueInputAddQuickly,
  valueAutocomplete,
}) => {
  const addProduct = async () => {
    try {
      // ------------------------------------ //
      // ----------- ADD PRODUCT ------------ //
      // ------------------------------------ //

      if (valueAutocomplete) {
        if (valueAutocomplete.length <= 30) {
          const formData = new FormData();
          formData.append("nameProduct", valueAutocomplete);

          // Request API
          const response = await axios.post(
            `${localURLAdd}${idList}`,
            formData,
            {
              headers: { Authorization: `Bearer ${userToken}` },
            }
          );

          if (response.status === 200) {
            setValueInputAddQuickly(null);
            alert("Produt added successfully !");
          }
        } else {
          alert("Le nom du produit ne doit pas excéder 30 caractères");
        }
      } else {
        alert("Merci de saisir un nom d'article");
      }
    } catch (error) {
      if (
        error.response.status === 400 &&
        error.response.data.message ===
          "The list you want to modify doesn't exist"
      ) {
        alert("La liste que vous souhaitez modifier n'existe pas");
      }
    }
  };

  return (
    <View
      style={[
        styles.bottomBlockAdd,
        {
          borderTopLeftRadius: firstLine ? 15 : 0,
          borderTopRightRadius: firstLine ? 15 : 0,
        },
      ]}
    >
      <Text style={styles.textAdd}>{valueAutocomplete}</Text>
      <View style={styles.blockButtonAdd}>
        <AntDesign
          name="arrowup"
          size={20}
          color="white"
          onPress={addProduct}
        />
      </View>
    </View>
  );
};

export default ProductLineAutoComplete;

const styles = StyleSheet.create({
  bottomBlockAdd: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  blockButtonAdd: {
    width: 45,
    height: 35,
    backgroundColor: "#4EBF53",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },

  textAdd: {
    flex: 1,
    marginRight: 10,
    color: "#797979",
    fontWeight: "bold",
    paddingLeft: 10,
  },
});
