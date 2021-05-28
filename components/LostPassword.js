// import React, { Component } from "react";

// import {
//   Modal,
//   Text,
//   TouchableHighlight,
//   View,
//   StyleSheet,
//   SafeAreaView,
// } from "react-native";

// import ScreenTitle from "../components/ScreenTitle";

// import SubmitButton from "../components/SubmitButton";
// import Input from "../components/Input";

// class LostPassword extends Component {
//   state = {
//     modalVisible: false,
//   };
//   toggleModal(visible) {
//     this.setState({ modalVisible: visible });
//   }
//   render() {
//     return (
//       <SafeAreaView style={styles.safeAreaView}>
//         <View style={styles.container}>
//           <Modal
//             animationType={"fade"}
//             transparent={true}
//             presentationStyle="overFullScreen"
//             visible={this.state.modalVisible}
//             onRequestClose={() => {
//               console.log("Modal has been closed.");
//             }}
//           >
//             <View style={styles.modal}>
//               <ScreenTitle title={"🤔"} />
//               <ScreenTitle title={"Comment t'appelles tu ?"} />
//               <Input />

//               <SubmitButton text="Suivant" />
//               <TouchableHighlight
//                 onPress={() => {
//                   this.toggleModal(!this.state.modalVisible);
//                 }}
//               >
//                 <Text style={styles.text}>Close Modal</Text>
//               </TouchableHighlight>
//             </View>
//           </Modal>

//           <TouchableHighlight
//             onPress={() => {
//               this.toggleModal(true);
//             }}
//           >
//             <Text style={styles.text}>Mot de passe oublié</Text>
//           </TouchableHighlight>
//         </View>
//       </SafeAreaView>
//     );
//   }
// }
// export default LostPassword;

// const styles = StyleSheet.create({
//   safeAreaView: {},
//   view: {
//     width: "100%",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "white",
//   },
//   container: {
//     alignItems: "center",
//     backgroundColor: "transparent",
//   },
//   modal: {
//     flex: 1,
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.9)",
//     padding: 100,
//     width: "100%",
//   },
//   text: {
//     color: "#ffffff",
//     marginTop: 10,
//     textDecorationLine: "underline",
//   },
// });
