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
const { bgLight, mainLightGrey } = colors;

const ListScreen = () => {
  return (
    <View style={styles.screen}>
      <ScrollView style={[styles.wrapper, styles.scrollView]}>
        <SafeAreaView>
          <StatusBar style="dark" />

          <View style={styles.container}>
            <TouchableOpacity>
              <Text>Notifications</Text>
            </TouchableOpacity>
            <View style={styles.buttonWrap}>
              <View>
                <ListModalButton
                  name="👋 Je vais faire les courses !"
                  color="blue"
                  style={styles.boxShadow}
                />
              </View>
              <Text style={styles.asterisk}>
                * Prévenez les autres que vous allez faire les courses
              </Text>
            </View>

            <View style={styles.cardWrap}>
              <View>
                <Text style={styles.emoji}>🛒</Text>
              </View>
              <View>
                <Text>
                  <Text style={styles.bold}>Pauline</Text> part faire les
                  courses !
                </Text>
                <Text>"Courses maison"</Text>
                <Text style={styles.date}>Aujourd'hui à 18:10</Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: bgLight,
    flex: 1,
  },
  scrollView: {
    // marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    paddingTop: 20,
  },
  wrapper: {
    width: "94%",
    marginTop: 0,
    marginBottom: 20,
    marginLeft: "auto",
    marginRight: "auto",
  },
  container: {
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    paddingTop: 20,
  },
  bold: {
    fontWeight: "bold",
  },
  buttonWrap: {
    flexDirection: "row",
    marginBottom: 80,
    marginTop: 30,
  },
  // boxShadow: {
  //   shadowColor: "red",
  //   shadowOffset: { width: 2, height: 2 },
  // },
  asterisk: {
    width: "35%",
    marginLeft: 15,
    fontSize: 11,
  },
  cardWrap: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    paddingRight: 50,
    paddingLeft: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  emoji: {
    fontSize: 26,
  },
  date: {
    marginTop: 10,
    textAlign: "right",
    fontSize: 13,
    marginRight: -30,
    color: mainLightGrey,
  },
});
