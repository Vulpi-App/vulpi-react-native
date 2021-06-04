import React, { useState, useEffect } from "react";
import {
  Image,
  Text,
  Dimensions,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";

const windowHeight = Dimensions.get("window").height;
const statusBarHeight = Constants.statusBarHeight;
const scrollViewHeight = windowHeight - statusBarHeight;

const localURLAdd = "http://192.168.1.40:3310/lists/add-product/";

const { width } = Dimensions.get("window");
const qrSize = width * 0.7;

const ScanScreen = ({ userToken, serverURL, userId }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const navigation = useNavigation();
  const [scanned, setScanned] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState("");
  const [errorMessages, setErrorMessages] = useState(false);

  const [idListActive, setIdListActive] = useState();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://world.openfoodfacts.org/api/v0/product/${data}.json`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  };

  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const response = await axios.get(`${serverURL}/lists/${userId}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        setData(response.data);
        setIdListActive(response.data.lists[0]._id);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchDatas();
  }, [userToken]);

  const addProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("nameProduct", data.product.product_name);

      const response = await axios.post(
        `${serverURL}/lists/add-product/${idListActive}`,
        formData,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );

      console.log("WORKING");
    } catch (error) {
      console.log("NOT WORKING");
    }
  };

  return isLoading ? (
    <View style={styles.cameraContainer}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[StyleSheet.absoluteFill, styles.container1]}
      >
        <Text style={styles.description}>Scanner le code barre du produit</Text>
        <Image
          style={styles.qr}
          source={require("../assets/barcodescanner.png")}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ShoppingScreen");
          }}
          style={styles.buttonCancel}
        >
          <Image
            style={styles.flash}
            source={require("../assets/icon-flash.png")}
          />
        </TouchableOpacity>
      </BarCodeScanner>
    </View>
  ) : (
    <View style={styles.container}>
      {scanned && !errorMessages ? (
        <View style={styles.wrapper}>
          <View style={styles.block}>
            <Text style={styles.product}>{data.product.product_name}</Text>
            <View style={{ height: 1, backgroundColor: "#EEEEEE" }} />
            <Text
              style={{
                color: "grey",
                marginTop: "5%",
                marginLeft: "5%",
                marginRight: "5%",
              }}
            >
              Souhaitez-vous ajouter {data.product.product_name} à votre liste ?
            </Text>
          </View>
          <TouchableOpacity onPress={addProduct} style={styles.buttonAdd}>
            <Text style={styles.textAdd}>Ajouter à la liste</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ShoppingScreen");
            }}
            style={styles.buttonCancel}
          >
            <Text style={styles.textCancel}>Annuler</Text>
          </TouchableOpacity>
        </View>
      ) : (
        scanned && errorMessages && <Text>Produit non trouvé</Text>
      )}
    </View>
  );
};

export default ScanScreen;

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "red",
    width: "100%",
  },

  qr: {
    marginTop: "30%",

    marginBottom: "20%",
    width: 256,
    height: 192,
  },

  description: {
    fontSize: 20,
    marginTop: "30%",
    textAlign: "center",
    width: "100%",
    color: "white",
  },
  cancel: {
    fontSize: width * 0.05,
    textAlign: "center",
    width: "70%",
    color: "white",
  },

  container: {
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#232952",
  },

  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    height: 313,
    width: "90%",
  },

  block: {
    width: "100%",
  },

  flash: {
    width: 18,
    height: 30,
  },

  buttonAdd: {
    width: 334,
    backgroundColor: "#3443B9",
    height: 50,
    borderRadius: 8,

    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    marginTop: "15%",
  },

  textAdd: {
    fontWeight: "bold",
    color: "white",
    fontSize: 16,
  },

  buttonCancel: {
    width: 72,
    height: 72,
    backgroundColor: "#FFFFFF",
    borderRadius: 100,
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
  },

  textCancel: {
    fontWeight: "bold",
    color: "#3443B9",
    fontSize: 16,
  },

  product: {
    justifyContent: "center",
    alignItems: "center",
    color: "#181725",
    fontSize: 20,
    fontWeight: "600",
    marginLeft: "5%",
    marginBottom: "5%",
  },

  cameraContainer: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
