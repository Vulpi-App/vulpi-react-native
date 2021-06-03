// React & React Native - Imports

import React from "react";

import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";

// Components - import
import ListFullHeader from "./ListFullHeader";
import ListFullInput from "./ListFullInput";

// Colors - import
import colors from "../assets/colors";
const { radioBg } = colors;

const ListFull = ({
  data,
  idListActive,
  toggleModalUpdate,
  userToken,
  serverURL,
  addProductList,
  setAddProductList,
}) => {
  return (
    <View style={styles.list}>
      <FlatList
        data={data.lists}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <ListFullHeader
              item={item}
              idListActive={idListActive}
              toggleModalUpdate={toggleModalUpdate}
              serverURL={serverURL}
              userToken={userToken}
            />
          );
        }}
      />

      <ScrollView
        style={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        <FlatList
          data={data.lists}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return (
              <ListFullInput
                item={item}
                idListActive={idListActive}
                userToken={userToken}
                addProductList={addProductList}
                setAddProductList={setAddProductList}
              />
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

export default ListFull;

const styles = StyleSheet.create({
  list: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
  },
  listContent: {
    paddingTop: 15,
    borderTopColor: radioBg,
    borderTopWidth: 1,
  },
});
