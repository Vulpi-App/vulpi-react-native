// React & React Native - Imports
import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";

// Components - import
import ListEmptyContent from "./ListEmptyContent";
import ModalProduct from "./ProductModalAddUpdate";

// Import - Icons
import { MaterialIcons } from "@expo/vector-icons";

// Colors - import
import colors from "../assets/colors";
const {
  radioBg,
  mainBlueText,
  productDetails,
  radioBorder,
  midGreyText,
  buttonDarkBlue,
  greyAfterCheck,
} = colors;

// URL request
const localURLUpdate = "http://localhost:3310/lists/update-product/";

const ListFullInput = ({
  item,
  idListActive,
  userToken,
  addProductList,
  setAddProductList,
}) => {
  // State for modal update product
  const [modalAddProductVisible, setModalAddProductVisible] = useState(false);
  const [infosProduct, setInfosProduct] = useState(null);

  // Function to added/checked product or not
  const checkProduct = async (product) => {
    try {
      const formData = new FormData();
      formData.append("added", !product.added);

      const response = await axios.put(
        `${localURLUpdate}${idListActive}?idProduct=${product._id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );

      // If all is ok, switch all states to null and hidden modal
      if (response.status === 200) {
        setAddProductList(!addProductList);
        // alert("Produt updated successfully !");
      }
    } catch (error) {
      if (
        error.response.status === 400 &&
        error.response.data.message ===
          "The product you want to modify doesn't exist in the list"
      ) {
        alert(
          "Le produit que vous souhaitez modifier n'existe pas dans la liste, ajoutez-le !"
        );
      }

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
    item._id === idListActive &&
    (item.products.length > 0 ? (
      <View>
        {/* Display products not added first, then products added */}
        {item.products.map((el) => {
          return (
            !el.added && (
              <View style={styles.listProduct} key={el._id}>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      checkProduct(el);
                    }}
                    style={styles.listRadioButton}
                  >
                    {el.added && (
                      <View style={styles.pointCheckRadioButton}>
                        <MaterialIcons
                          name="check"
                          size={18}
                          color={buttonDarkBlue}
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    setModalAddProductVisible(true);
                    setInfosProduct(el);
                  }}
                >
                  <Text
                    style={
                      el.added
                        ? [styles.listProductText, styles.textAfterCheck]
                        : styles.listProductText
                    }
                  >
                    {capitalizeFirstLetter(el.reference.name)}
                  </Text>

                  {el.quantity || el.brand || el.shop ? (
                    <Text style={styles.listCustom}>
                      {el.quantity && `${el.quantity}, `}{" "}
                      {el.brand && `${el.brand}, `} {el.shop && `${el.shop}, `}
                    </Text>
                  ) : (
                    <Text
                      style={
                        el.added
                          ? [styles.listNotCustom, styles.textAfterCheck]
                          : styles.listNotCustom
                      }
                    >
                      Toucher pour personnaliser
                    </Text>
                  )}
                </TouchableOpacity>

                {el.price ? (
                  <Text style={styles.price}>{el.price} €</Text>
                ) : null}

                {/* Modal "Update Product" */}
                <ModalProduct
                  modalAddProductVisible={modalAddProductVisible}
                  setModalAddProductVisible={setModalAddProductVisible}
                  typeModalProduct="update product"
                  idList={idListActive}
                  userToken={userToken}
                  product={infosProduct}
                  addProductList={addProductList}
                  setAddProductList={setAddProductList}
                />
              </View>
            )
          );
        })}
        {item.products.map((el) => {
          return (
            el.added && (
              <View style={styles.listProduct} key={el._id}>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      checkProduct(el);
                    }}
                    style={styles.listRadioButton}
                  >
                    {el.added && (
                      <View style={styles.pointCheckRadioButton}>
                        <MaterialIcons
                          name="check"
                          size={18}
                          color={buttonDarkBlue}
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    setModalAddProductVisible(true);
                    setInfosProduct(el);
                  }}
                >
                  <Text
                    style={
                      el.added
                        ? [styles.listProductText, styles.textAfterCheck]
                        : styles.listProductText
                    }
                  >
                    {capitalizeFirstLetter(el.reference.name)}
                  </Text>

                  {/* 🚨🚨🚨 Conditions ci-dessous ne fonctionnent pas ! POURQUOI ? */}
                  {el.quantity || el.brand || el.shop ? (
                    <Text style={styles.listCustom}>
                      {el.quantity && `${el.quantity}, `}{" "}
                      {el.brand && `${el.brand}, `} {el.shop && `${el.shop}, `}
                    </Text>
                  ) : (
                    <Text
                      style={
                        el.added
                          ? [styles.listNotCustom, styles.textAfterCheck]
                          : styles.listNotCustom
                      }
                    >
                      Toucher pour personnaliser
                    </Text>
                  )}
                </TouchableOpacity>

                {el.price ? (
                  <Text style={styles.price}>{el.price} €</Text>
                ) : null}

                {/* Modal "Update Product" */}
                <ModalProduct
                  modalAddProductVisible={modalAddProductVisible}
                  setModalAddProductVisible={setModalAddProductVisible}
                  typeModalProduct="update product"
                  idList={idListActive}
                  userToken={userToken}
                  product={infosProduct}
                  addProductList={addProductList}
                  setAddProductList={setAddProductList}
                />
              </View>
            )
          );
        })}
      </View>
    ) : (
      <ListEmptyContent />
    ))
  );
};

export default ListFullInput;

const styles = StyleSheet.create({
  listProduct: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  listRadioButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1,
    backgroundColor: radioBg,
    borderColor: radioBorder,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  pointCheckRadioButton: {},

  listProductText: {
    fontSize: 16,
    fontFamily: "GilroyBold",
    color: mainBlueText,
    lineHeight: 30,
  },
  listNotCustom: {
    fontSize: 14,
    color: midGreyText,
    fontFamily: "GilroyMedium",
  },
  listCustom: {
    fontSize: 14,
    color: productDetails,
    fontFamily: "GilroyMedium",
  },
  price: {
    position: "absolute",
    top: 0,
    right: 0,
    fontSize: 16,
    color: midGreyText,
    fontFamily: "GilroyMedium",
    lineHeight: 30,
  },

  textAfterCheck: {
    color: greyAfterCheck,
    textDecorationStyle: "solid",
    textDecorationColor: greyAfterCheck,
    textDecorationLine: "line-through",
  },
});
