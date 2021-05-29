// React & React Native - Imports
import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

// Components - import
import ListFullHeader from "./ListFullHeader";
import ListFullInput from "./ListFullInput";

const ListFull = ({ data, idListActive }) => {
  return (
    <View style={styles.list}>
      <FlatList
        data={data.lists}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return <ListFullHeader item={item} idListActive={idListActive} />;
        }}
      />

      <View style={styles.listContent}>
        <FlatList
          data={data.lists}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return <ListFullInput item={item} idListActive={idListActive} />;
          }}
        />

        {/*       
        <ListFullInput name="Bananes" price="2.80" custom={false} />
        <ListFullInput name="Bonbons" price="4.10" custom={true} /> */}
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
