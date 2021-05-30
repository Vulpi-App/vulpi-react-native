// React & React Native - Imports
import React from "react";
import { View, FlatList, StyleSheet } from "react-native";

// Components - import
import ListEmptyHeader from "./ListEmptyHeader";
import ListEmptyContent from "./ListEmptyContent";

const ListEmpty = ({ data, idListActive }) => {
  return (
    <View style={styles.list}>
      <FlatList
        data={data.lists}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return <ListEmptyHeader item={item} idListActive={idListActive} />;
        }}
      />
      <ListEmptyContent />
    </View>
  );
};

export default ListEmpty;

const styles = StyleSheet.create({
  list: {
    maxHeight: "85%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
  },
});
