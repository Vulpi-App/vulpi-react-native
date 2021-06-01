import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DescriptionOnBoarding = ({ screenNumber }) => {
  // Modify the content of the paragraphs depending on the screen number
  let descriptionParagraph1;
  let descriptionParagraph2;
  if (screenNumber === 0) {
    descriptionParagraph1 = "Planifie tes courses en préparant ta liste.";
    descriptionParagraph2 =
      "Psst : elle est accessible même sans connexion... au supermarché par exemple 😉";
  } else if (screenNumber === 1) {
    descriptionParagraph1 =
      "Partagez la liste avec le reste de la famille. Chacun peut y rajouter ce dont il a besoin. Et s’ils achètent l’un des articles avant toi, il disparaitra de la liste.";
    descriptionParagraph2 = "Ou gardes ta liste privée.";
  } else if (screenNumber === 2) {
    descriptionParagraph1 =
      "Ajoutes la quantité, le prix, le magasin et même une photo du produit pour être sûr que personne ne se trompe.";
  } else if (screenNumber === 3) {
    descriptionParagraph1 =
      "Recevez les bonnes promotions au bon moment en fonction de vos réels besoins. Plus besoin de chercher ou trouver les meilleurs offres autour de chez vous.";
  }

  return (
    <View>
      <Text style={styles.description}>{descriptionParagraph1}</Text>
      {screenNumber <= 1 && (
        <Text style={[styles.description, styles.marginTop]}>
          {descriptionParagraph2}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  description: {
    color: "white",
    textAlign: "center",
    marginHorizontal: 15,
    lineHeight: 19,
    fontSize: 17,
    fontFamily: "GilroySemiBold",
  },
  marginTop: {
    marginTop: 20,
  },
});

export default DescriptionOnBoarding;
