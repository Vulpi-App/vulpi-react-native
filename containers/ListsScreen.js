// Tools
import React from "react";
import { Text, Button, View } from "react-native";

const ListsScreen = ({ navigation }) => {
  return (
    <View>
      <Text>ListsScreen</Text>
      <Button
        title="Ma liste maison"
        onPress={() => {
          navigation.navigate("ListScreen");
        }}
      />
    </View>
  );
};

export default ListsScreen;
