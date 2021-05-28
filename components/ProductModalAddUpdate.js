// Tools
import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
  SafeAreaView,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";
import Constants from "expo-constants";
import axios from "axios";
// import  from "expo"

// Components
import InputProduct from "./ProductInputAddUpdate";
import ProductButtonPicture from "./ProductButtonPicture";
import ProductButtonCancelSave from "./ProductButtonCancelSave";
import ProductDeleteProduct from "./ProductDeleteProduct";
import { BlurView } from "expo-blur";

// URL request
const localURLAdd = "http://localhost:3310/lists/add-product/";
const localURLUpdate = "http://localhost:3310/lists/update-product/";
const localURLDelete = "http://localhost:3310/lists/delete-product/";

// Variables test -> A modifier avec les vrais valeurs quand Manon aura finalisé
const idList = "60abd473ebe4f06ebef9375b";
const userToken = "cccc";
const idProduct = "60b089ea10479b048010688b";

const ModalProduct = ({
  modalAddProductVisible,
  setModalAddProductVisible,
  typeModalProduct,
}) => {
  const [nameProduct, setNameProduct] = useState();
  const [quantityProduct, setQuantityProduct] = useState();
  const [brandProduct, setBrandProduct] = useState();
  const [shopProduct, setShopProduct] = useState();
  const [priceProduct, setPriceProduct] = useState();
  const [messageErrorAfterSubmit, setMessageErrorAfterSubmit] = useState(null);
  const [modalDeleteProductVisible, setModalDeleteProductVisible] =
    useState(false);

  const submitInfosProduct = async () => {
    try {
      // ------------------------------------ //
      // ----------- ADD PRODUCT ------------ //
      // ------------------------------------ //

      if (typeModalProduct === "new product") {
        if (nameProduct) {
          if (nameProduct.length <= 30) {
            const formData = new FormData();
            formData.append("nameProduct", nameProduct);
            quantityProduct && formData.append("quantity", quantityProduct);
            brandProduct && formData.append("brand", brandProduct);
            shopProduct && formData.append("shop", shopProduct);
            priceProduct && formData.append("price", priceProduct);

            const response = await axios.post(
              `${localURLAdd}${idList}`,
              formData,
              {
                headers: { Authorization: `Bearer ${userToken}` },
              }
            );

            // If all is ok, switch all states to null and hidden modal
            if (response.status === 200) {
              setNameProduct();
              setQuantityProduct();
              setBrandProduct();
              setShopProduct();
              setPriceProduct();
              setMessageErrorAfterSubmit();
              setModalAddProductVisible(false);
              alert("Produt added successfully !");
            }
          } else {
            setMessageErrorAfterSubmit(
              "Le nom du produit ne doit pas excéder 30 caractères"
            );
          }
        } else {
          setMessageErrorAfterSubmit("Merci de saisir un nom d'article");
        }

        // ------------------------------------ //
        // --------- UPDATE PRODUCT ----------- //
        // ------------------------------------ //
      } else if (typeModalProduct === "update product") {
        const formData = new FormData();
        quantityProduct && formData.append("quantity", quantityProduct);
        brandProduct && formData.append("brand", brandProduct);
        shopProduct && formData.append("shop", shopProduct);
        priceProduct && formData.append("price", priceProduct);

        const response = await axios.put(
          `${localURLUpdate}${idList}?idProduct=${idProduct}`,
          formData,
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        );

        // If all is ok, switch all states to null and hidden modal
        if (response.status === 200) {
          setNameProduct();
          setQuantityProduct();
          setBrandProduct();
          setShopProduct();
          setPriceProduct();
          setMessageErrorAfterSubmit();
          setModalAddProductVisible(false);
          alert("Produt updated successfully !");
        }
      }
    } catch (error) {
      if (
        error.response.status === 400 &&
        error.response.data.message ===
          "The product you want to modify doesn't exist in the list"
      ) {
        setMessageErrorAfterSubmit(
          "Le produit que vous souhaitez modifier n'existe pas dans la liste, ajoutez-le !"
        );
      }

      if (
        error.response.status === 400 &&
        error.response.data.message ===
          "The list you want to modify doesn't exist"
      ) {
        setMessageErrorAfterSubmit(
          "La liste que vous souhaitez modifier n'existe pas"
        );
      }
    }
  };

  // ------------------------------------ //
  // --------- DELETE PRODUCT ----------- //
  // ------------------------------------ //

  const deleteProduct = async () => {
    try {
      if (idProduct) {
        const response = await axios.delete(
          `${localURLDelete}${idList}?idProduct=${idProduct}`,
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        );

        // If all is ok, switch all states to null and hidden modal
        if (response.status === 200) {
          setNameProduct();
          setQuantityProduct();
          setBrandProduct();
          setShopProduct();
          setPriceProduct();
          setMessageErrorAfterSubmit();
          setModalAddProductVisible(false);
          setModalDeleteProductVisible(false);
          alert("Produt deleted successfully !");
        }
      } else {
        setMessageErrorAfterSubmit(
          "Le produit que vous souhaitez supprimer n'existe pas"
        );
      }
    } catch (error) {
      // console.log(error.message);
      if (
        error.response.status === 400 &&
        error.response.data.message ===
          "The list you want to modify doesn't exist"
      ) {
        setMessageErrorAfterSubmit(
          "La liste que vous souhaitez modifier n'existe pas"
        );
      }
      if (
        error.response.status === 400 &&
        error.response.data.message ===
          "The product you want to delete doesn't exist in the list"
      ) {
        setMessageErrorAfterSubmit(
          "Le produit que vous souhaitez supprimer n'existe pas dans la liste"
        );
      }
    }
  };

  return (
    <Modal
      style={styles.centeredView}
      animationType="slide"
      transparent={true}
      visible={modalAddProductVisible}
    >
      <TouchableOpacity
        style={
          modalAddProductVisible
            ? [styles.centeredViewModalVisible, styles.centeredViewModal]
            : styles.centeredViewModal
        }
        onPressOut={() => {
          setModalAddProductVisible(false);
        }}
      >
        <TouchableWithoutFeedback>
          <View style={styles.modalView}>
            {typeModalProduct === "new product" && (
              <Text style={styles.modalTitle}>Ajouter un article</Text>
            )}
            {typeModalProduct === "update product" && (
              <Text style={styles.modalTitle}>Personnaliser l'article</Text>
            )}
            <View style={styles.blockInputs}>
              {typeModalProduct === "new product" && (
                <InputProduct
                  nameInput="nameProduct"
                  valueInput={nameProduct}
                  setValueInput={setNameProduct}
                />
              )}
              <InputProduct
                nameInput="quantity"
                valueInput={quantityProduct}
                setValueInput={setQuantityProduct}
              />
              <InputProduct
                nameInput="brand"
                valueInput={brandProduct}
                setValueInput={setBrandProduct}
              />
              <InputProduct
                nameInput="shop"
                valueInput={shopProduct}
                setValueInput={setShopProduct}
              />
              <InputProduct
                nameInput="price"
                valueInput={priceProduct}
                setValueInput={setPriceProduct}
              />
            </View>

            <ProductButtonPicture />

            {messageErrorAfterSubmit && (
              <Text style={styles.messageErrorAfterSubmit}>
                {messageErrorAfterSubmit}
              </Text>
            )}

            <ProductButtonCancelSave
              modalAddProductVisible={modalAddProductVisible}
              setModalAddProductVisible={setModalAddProductVisible}
              submitInfosProduct={submitInfosProduct}
            />
            {typeModalProduct === "update product" && (
              <ProductDeleteProduct
                modalAddProductVisible={modalAddProductVisible}
                setModalAddProductVisible={setModalAddProductVisible}
                modalDeleteProductVisible={modalDeleteProductVisible}
                setModalDeleteProductVisible={setModalDeleteProductVisible}
                deleteProduct={deleteProduct}
              />
            )}
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

export default ModalProduct;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: Constants.statusBarHeight,
  },
  centeredViewModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredViewModalVisible: { backgroundColor: "rgba(0,0,0,0.7)" },
  modalView: {
    width: "90%",
    height: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#181725",
    marginBottom: 40,
  },

  blockInputs: { width: "100%" },
  messageErrorAfterSubmit: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
  },
});
