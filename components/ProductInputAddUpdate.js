// Tools
import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";

// Colors - import
import colors from "../assets/colors";
const { midGreyText, inputBg, productDetails, bgMeasure, greyLight } = colors;

// Import icons
import { Entypo } from "@expo/vector-icons";

// Import picker
import { Picker } from "@react-native-picker/picker";
import { TouchableOpacity } from "react-native-gesture-handler";

const ModalProduct = ({
  nameInput,
  valueInput,
  setValueInput,
  measureProduct,
  setMeasureProduct,
}) => {
  const [modalMeasuresVisible, setModalMeasuresVisible] = useState(false);

  let placeholderInput;
  let labelInput;
  if (nameInput === "nameProduct") {
    placeholderInput = "Ex : Lait en poudre";
    labelInput = "Nom du produit";
  }
  if (nameInput === "quantity") {
    placeholderInput = "Ex : 1";
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
        // --------------
        // Input price

        <View style={styles.blockInputPrice}>
          <TextInput
            style={styles.inputTextPrice}
            placeholder={placeholderInput}
            placeholderTextColor={midGreyText}
            onChangeText={(input) => {
              setValueInput(input);
            }}
            value={valueInput}
            keyboardType="numeric"
          />
          <Text style={styles.textEuro}>€</Text>
        </View>
      ) : nameInput === "quantity" ? (
        // --------------
        // Input quantity

        <View style={styles.blockInputQuantity}>
          <TextInput
            style={styles.inputTextQuantity}
            placeholder={placeholderInput}
            placeholderTextColor={midGreyText}
            onChangeText={(input) => {
              setValueInput(input);
            }}
            value={valueInput}
            keyboardType="numeric"
          />
          <View style={styles.blockMeasures}>
            <Text style={styles.textMeasures} numberOfLines={1}>
              {measureProduct}
            </Text>
            <Entypo
              style={styles.iconDown}
              name="chevron-down"
              size={20}
              color={greyLight}
              onPress={() => {
                setModalMeasuresVisible(true);
              }}
            />
          </View>
        </View>
      ) : (
        <TextInput
          style={styles.inputText}
          placeholder={placeholderInput}
          placeholderTextColor={midGreyText}
          onChangeText={(input) => {
            setValueInput(input);
          }}
          value={valueInput}
          autoCapitalize="sentences"
        />
      )}
      {/* Modal change quantity */}
      <Modal
        style={styles.modalMeasures}
        animationType="slide"
        transparent={true}
        visible={modalMeasuresVisible}
      >
        <TouchableOpacity
          style={styles.modalMeasuresViewVisible}
          onPressOut={() => {
            setModalMeasuresVisible(false);
          }}
        >
          <TouchableWithoutFeedback>
            <View style={styles.modalMeasuresView}>
              <Picker
                style={styles.pickerMeasures}
                selectedValue={measureProduct}
                onValueChange={(itemValue) => setMeasureProduct(itemValue)}
              >
                <Picker.Item label="Unité" value="Unité" />
                <Picker.Item label="Kg" value="Kg" />
                <Picker.Item label="Litre" value="Litre" />
                <Picker.Item label="Paquet" value="Paquet" />
                <Picker.Item label="Boîte" value="Boîte" />
                <Picker.Item label="Sachet" value="Sachet" />
              </Picker>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default ModalProduct;

const styles = StyleSheet.create({
  blockInput: { width: "100%", marginBottom: 10 },
  labelInput: { marginBottom: 5, fontFamily: "GilroyBold", fontSize: 13 },
  inputText: {
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: inputBg,
    color: productDetails,
    fontFamily: "GilroyBold",
  },
  blockInputPrice: {
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: inputBg,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputTextPrice: {
    width: "90%",
    color: productDetails,
    fontFamily: "GilroyBold",
  },
  textEuro: {
    color: productDetails,
    fontFamily: "GilroyBold",
    width: "10%",
    textAlign: "right",
  },

  blockInputQuantity: {
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: inputBg,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputTextQuantity: {
    width: "70%",
    color: productDetails,
    fontFamily: "GilroyBold",
  },
  blockMeasures: {
    width: "30%",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: "grey",
    alignItems: "center",
  },
  textMeasures: {
    width: "70%",
    color: greyLight,
    fontFamily: "GilroySemiBold",
  },
  iconDown: { width: "30%" },

  modalMeasures: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalMeasuresViewVisible: {
    height: "100%",
    justifyContent: "flex-end",
  },
  modalMeasuresView: {
    width: "100%",
    height: "30%",
    backgroundColor: bgMeasure,
  },

  // pickerMeasures: { height: 50, backgroundColor: "red", color: "green" },
});
