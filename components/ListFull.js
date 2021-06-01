// React & React Native - Imports

import React, { useState, useEffect } from "react";

import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";

// Axios - import
import axios from "axios";

// Components - import
import ListFullHeader from "./ListFullHeader";
import ListFullInput from "./ListFullInput";

const ListFull = ({
  data,
  idListActive,
  toggleModalUpdate,
  userToken,
  addProductList,
  setAddProductList,
}) => {
  const [result, setResult] = useState();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:3310/listcontent/${idListActive}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${userToken}`,
  //           },
  //         }
  //       );

  //       console.log("response.data HEREEEEEEE ", response.data);
  //       // console.log("response.data.lists", response.data.lists);

  //       setResult(response.data);
  //       setLoading(false);

  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };
  //   fetchData();

  // }, []);

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
            />
          );
        }}
      />

      <View style={styles.listContent}>
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
      </View>
    </View>
  );
};

export default ListFull;

const styles = StyleSheet.create({
  list: {
    maxHeight: "85%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
  },
  listContent: {
    paddingTop: 15,
  },
});
