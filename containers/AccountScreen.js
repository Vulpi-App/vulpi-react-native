// Tools
import React from "react";
import { Text, View, Button } from "react-native";

const AccountScreen = ({ navigation }) => {
  return (
    <View>
      <Text>AccountScreen</Text>
      <Button
        title="Go to Account Infos Screen"
        onPress={() => {
          navigation.navigate("AccountInfos");
        }}
      />
      <Button
        title="Go to Account Settings Screen"
        onPress={() => {
          navigation.navigate("SettingsScreen");
        }}
      />
      <Button
        title="Go to Account Feedback Screen"
        onPress={() => {
          navigation.navigate("FeedbackScreen");
        }}
      />
    </View>
  );
};

export default AccountScreen;
