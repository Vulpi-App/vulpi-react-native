// React & React Native - Imports
import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

// Colors - import
import colors from "../assets/colors";
const { mainBlueText, orangeTotalPrice, white, darkGreyText, buttonFlashBlue } =
  colors;

const ListFullHeader = ({ item, idListActive, toggleModalUpdate }) => {
  const totalPrice = [];
  const totalArticles = [];

  return (
    item._id === idListActive && (
      <View style={styles.listTitleWrap}>
        <View
          horizontal={true}
          style={
            item.products.length > 0 ? styles.listTitle : styles.listTitleAlone
          }
        >
          <Text numberOfLines={2} ellipsizeMode="tail" style={styles.h2}>
            {item.title}
          </Text>
        </View>

        {/* Map for getting all prices */}
        {item.products.map((el, index) => {
          el.price ? totalPrice.push(Number(el.price)) : null;
          totalArticles.push(1);
        })}

        <View style={styles.headerDetailsWrap}>
          <Text style={styles.nbArticles}>
            {totalArticles.length > 1
              ? totalArticles.length + " articles"
              : totalArticles.length === 1
              ? totalArticles.length + " article"
              : null}
          </Text>
          {item.products.length > 0 ? (
            <View style={styles.headerDetailsWrap}>
              {totalPrice.length > 0 ? (
                <View>
                  <View style={styles.totalPrice}>
                    <Text style={styles.priceText}>
                      {totalPrice.reduce((acc, item) => acc + item)} €
                    </Text>
                  </View>
                </View>
              ) : null}
            </View>
          ) : null}

          {/* 3 dots for setting the list */}
          <TouchableOpacity onPress={toggleModalUpdate} style={styles.dots}>
            <View style={styles.blueDot}></View>
            <View style={[styles.blueDot, styles.marginDot]}></View>
            <View style={styles.blueDot}></View>
          </TouchableOpacity>
        </View>
      </View>
    )
  );
};

export default ListFullHeader;

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
  },
  listTitleWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 15,
  },
  listTitle: {
    maxWidth: 180,
  },
  listTitleAlone: {
    maxWidth: 300,
  },
  h2: {
    color: mainBlueText,
    fontSize: 22,
    fontFamily: "GilroySemiBold",
  },
  headerDetailsWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  nbArticles: {
    fontSize: 13,
    color: darkGreyText,

    fontFamily: "GilroySemiBold",
  },
  totalPrice: {
    marginLeft: 12,
    backgroundColor: orangeTotalPrice,
    padding: 6,
    borderRadius: 4,
  },
  priceText: {
    fontSize: 13,
    color: white,
    fontFamily: "GilroySemiBold",
  },
  blueDot: {
    marginLeft: 12,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: buttonFlashBlue,
  },
  marginDot: {
    marginVertical: 3,
  },
  dots: { marginRight: 2 },
});
