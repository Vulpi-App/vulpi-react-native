// Tools
import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

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
            placeholderTextColor="#797979"
            onChangeText={(input) => {
              setValueInput(input);
            }}
            value={valueInput}
            autoCapitalize="sentences"
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
            placeholderTextColor="#797979"
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
              color="#797979"
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
          placeholderTextColor="#797979"
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
  labelInput: { marginBottom: 5, fontWeight: "bold", fontSize: 13 },
  inputText: {
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#FAFAFA",
    color: "#3E4685",
    fontWeight: "bold",
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
  inputTextPrice: { width: "90%", color: "#3E4685", fontWeight: "bold" },
  textEuro: {
    color: "#3E4685",
    fontWeight: "bold",
    width: "10%",
    textAlign: "right",
  },

  blockInputQuantity: {
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 15,
    color: "grey",
    backgroundColor: "#FAFAFA",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputTextQuantity: { width: "70%", color: "#3E4685", fontWeight: "bold" },
  blockMeasures: {
    width: "30%",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: "grey",
  },
  textMeasures: { width: "70%", color: "#797979" },
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
    backgroundColor: "#E5E3E3",
  },

  // pickerMeasures: { height: 50, backgroundColor: "red", color: "green" },
});
