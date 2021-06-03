// Tools
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";

const ProductLineAutoComplete = ({
  firstLine,
  setValueInputAddQuickly,
  valueAutocomplete,
  idList,
  userToken,
  addProductList,
  setAddProductList,
  serverURL,
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
            `${serverURL}/lists/add-product/${idList}`,
            formData,
            {
              headers: { Authorization: `Bearer ${userToken}` },
            }
          );

          if (response.status === 200) {
            setValueInputAddQuickly(null);
            setAddProductList(!addProductList);
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

  // Function to capitalize first letter of name product
  const capitalizeFirstLetter = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <View
      style={[
        styles.bottomBlockAdd,
        {
          borderTopLeftRadius: firstLine ? 15 : 0,
          borderTopRightRadius: firstLine ? 15 : 0,
          shadowColor: firstLine ? "grey" : null,
          shadowOpacity: firstLine ? 5 : 0,
          shadowOffset: firstLine ? { height: -1 } : null,
        },
      ]}
    >
      <Text style={styles.textAdd}>
        {capitalizeFirstLetter(valueAutocomplete)}
      </Text>
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
