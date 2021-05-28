// Tools
import React from "react";
import {

  ScrollView,
  SafeAreaView,
  Platform,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";

// Components - import
import ListModalButton from "../components/ListModalButton";

// Colors - import
import colors from "../assets/colors";
const { bgLight } = colors;

const ListScreen = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView style={styles.scrollView}>
        <StatusBar style="dark" />
        <View style={[styles.wrapper, styles.buttonWrap]}>
          <View>
            <ListModalButton
              name="👋🏻 Je vais faire les courses !"
              color="blue"
            />
          </View>

          {/* <TouchableOpacity>
            <Text>👋🏻 Je vais faire les courses !</Text>
          </TouchableOpacity> */}
          <Text style={styles.asterisk}>
            * Prévenez les autres que vous allez faire les courses
          </Text>
        </View>

        <View>
          <View>
            <Text>👏🏻</Text>
          </View>
          <View>
            <Text>Mattéo a ajouté "Belin Croutille" à la liste</Text>
            <Text>"Courses maison"</Text>
          </View>
        </View>
        <Text>Hier à 12:20</Text>
      </ScrollView>

    </SafeAreaView>
  );
};



export default ListScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: bgLight,
    flex: 1,
  },
  scrollView: {
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    paddingTop: 20,
  },
  wrapper: {
    width: "94%",
    marginTop: 0,
    marginBottom: 20,
    marginLeft: "auto",
    marginRight: "auto",
  },
  buttonWrap: {
    flexDirection: "row",
  },
  asterisk: {
    width: "35%",
    marginLeft: 15,
    fontSize: 11,
  },
});
