// Tools
import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

const ProductBottomBlockAdd = ({
  setModalAddProductVisible,
  valueInputAddQuickly,
  setValueInputAddQuickly,
}) => {
  return (
    <View
      style={[
        styles.bottomBlockAdd,
        {
          borderTopLeftRadius: valueInputAddQuickly ? 0 : 15,
          borderTopRightRadius: valueInputAddQuickly ? 0 : 15,
        },
      ]}
    >
      <View style={styles.blockInput}>
        <Ionicons
          name="add"
          size={28}
          color="#797979"
          onPress={() => {
            setModalAddProductVisible(true);
          }}
        />
        <TextInput
          style={styles.inputAddQuickly}
          placeholder="Ajout rapide"
          placeholderTextColor="#797979"
          autoCapitalize="sentences"
          onChangeText={(text) => {
            setValueInputAddQuickly(text);
          }}
          value={valueInputAddQuickly}
        ></TextInput>
      </View>

      <View style={styles.blockScan}>
        <FontAwesome5 name="barcode" size={24} color="white" />
      </View>

      {/* Add Modal to Add Product */}
    </View>
  );
};

export default ProductBottomBlockAdd;

const styles = StyleSheet.create({
  bottomBlockAdd: {
    backgroundColor: "white",
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  blockInput: {
    backgroundColor: "#E6E6E6",
    borderRadius: 15,
    padding: 8,
    paddingRight: 15,
    flexDirection: "row",
    flex: 1,
    height: 45,
    marginRight: 10,
  },
  inputAddQuickly: {
    marginLeft: 5,
    fontSize: 15,
    color: "black",
    flex: 1,
  },
  blockScan: {
    width: 45,
    height: 45,
    backgroundColor: "#4EBF53",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    shadowColor: "#4EBF53",
    shadowOpacity: 1,
    shadowOffset: { height: 1 },
  },
});
