// React & React Native - Imports
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

import axios from "axios";

// Colors - import
import colors from "../assets/colors";
const {
  radioBg,
  mainBlueText,
  orangeTotalPrice,
  white,
  darkGreyText,
  buttonFlashBlue,
} = colors;

const ListFullHeader = ({ item, idListActive, toggleModalUpdate }) => {
  const totalPrice = [];
  const totalArticles = [];

  return (
    item._id === idListActive && (
      <View style={styles.listTitleWrap}>
        <View style={item.products.length > 0 ? styles.listTitle : null}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.h2}>
            {item.title}
          </Text>
        </View>

        {/* Map for getting all prices */}
        {item.products.map((el, index) => {
          totalPrice.push(Number(el.price));
          totalArticles.push(1);
        })}

        <View style={styles.headerDetailsWrap}>
          {item.products.length > 0 ? (
            <View style={styles.headerDetailsWrap}>
              <View style={styles.totalPrice}>
                <Text style={styles.priceText}>
                  {totalPrice.reduce((acc, item) => acc + item)} €
                </Text>
              </View>
              <Text style={styles.nbArticles}>
                {totalArticles.length} articles
              </Text>
            </View>
          ) : null}

          {/* 3 dots for setting the list */}
          <TouchableOpacity onPress={toggleModalUpdate}>
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
    borderBottomColor: radioBg,
    paddingBottom: 15,
    borderBottomWidth: 1,
  },
  listTitle: {
    maxWidth: 200,
  },
  h2: {
    color: mainBlueText,
    fontSize: 22,
    // add semi-bold
  },
  headerDetailsWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  nbArticles: {
    fontSize: 12,
    color: darkGreyText,
    marginLeft: 10,
    marginRight: 15,
  },
  totalPrice: {
    backgroundColor: orangeTotalPrice,
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 4,
  },
  priceText: {
    fontSize: 12,
    color: white,
  },
  blueDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: buttonFlashBlue,
  },
  marginDot: {
    marginVertical: 3,
  },
});
