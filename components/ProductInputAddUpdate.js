// Tools
import React from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";

// Import picker
import { Picker } from "@react-native-picker/picker";

const ModalProduct = ({
  nameInput,
  valueInput,
  setValueInput,
  measureProduct,
  setMeasureProduct,
}) => {
  let placeholderInput;
  let labelInput;
  if (nameInput === "nameProduct") {
    placeholderInput = "Ex : Lait en poudre";
    labelInput = "Nom du produit";
  }
  if (nameInput === "quantity") {
    placeholderInput = "Ex : 1L";
    labelInput = "Quantité";
  }
  if (nameInput === "brand") {
    placeholderInput = "Ex : Lactel";
    labelInput = "Marque";
  }
  if (nameInput === "shop") {
    placeholderInput = "Ex : Auchan";
    labelInput = "Magasin";
  }
  if (nameInput === "price") {
    placeholderInput = "Ex : 23";
    labelInput = "Prix";
  }

  return (
    <View style={styles.blockInput}>
      <Text style={styles.labelInput}>{labelInput}</Text>
      {nameInput === "price" ? (
        <View style={styles.blockInputPrice}>
          <TextInput
            style={styles.inputTextPrice}
            placeholder={placeholderInput}
            placeholderTextColor="#797979"
            onChangeText={(input) => {
              setValueInput(input);
            }}
            value={valueInput}
          />
          <Text style={styles.textEuro}>€</Text>
        </View>
      ) : (
        // nameInput === "quantity" ? (
        //   <View style={styles.blockInputQuantity}>
        //     <TextInput
        //       style={styles.inputTextQuantity}
        //       placeholder={placeholderInput}
        //       placeholderTextColor="#797979"
        //       onChangeText={(input) => {
        //         setValueInput(input);
        //       }}
        //       value={valueInput}
        //     />
        //     {/* <Picker
        //       style={styles.pickerMeasures}
        //       selectedValue={measureProduct}
        //       onValueChange={(itemValue, itemIndex) =>
        //         setMeasureProduct(itemValue)
        //       }
        //     >
        //       <Picker.Item label="Kg" value="kilogramme" />
        //       <Picker.Item label="Litre" value="litre" />
        //       <Picker.Item label="Paquet" value="paquet" />
        //     </Picker> */}
        //   </View>
        // ) :
        <TextInput
          style={styles.inputText}
          placeholder={placeholderInput}
          placeholderTextColor="#797979"
          onChangeText={(input) => {
            setValueInput(input);
          }}
          value={valueInput}
        />
      )}
    </View>
  );
};

export default ModalProduct;

const styles = StyleSheet.create({
  blockInput: { width: "100%", marginBottom: 10 },
  labelInput: { marginBottom: 5, fontWeight: "bold", fontSize: 13 },
  inputText: {
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 15,
    color: "grey",
    backgroundColor: "#FAFAFA",
  },
  blockInputPrice: {
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 15,
    color: "grey",
    backgroundColor: "#FAFAFA",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputTextPrice: { width: "90%" },
  textEuro: {
    color: "#3E4685",
    fontWeight: "bold",
    width: "10%",
    textAlign: "right",
  },

  blockInputQuantity: {},
  inputTextQuantity: {},
  pickerMeasures: { height: 50, backgroundColor: "red", color: "green" },
});
