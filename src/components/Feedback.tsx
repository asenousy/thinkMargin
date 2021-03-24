import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Pressable,
  Linking,
  Platform,
} from "react-native";
import { jsVersion } from "../../configs.json";
import { responsive } from "../helpers";
import * as StoreReview from "expo-store-review";

type Props = {
  onBackgroundPress: () => void;
};

export default (props: Props) => (
  <View style={styles.container}>
    <TouchableWithoutFeedback onPress={props.onBackgroundPress}>
      <View style={styles.dimlayer} />
    </TouchableWithoutFeedback>
    <View style={styles.modal}>
      <Text style={styles.content}>
        Would love to hear your suggestions, questions or feedback
      </Text>
      <View style={styles.row}>
        <Pressable
          onPress={() =>
            Linking.openURL(
              `mailto:hanounasoft+thinkMargin@hotmail.com?subject=thinkMargin-${Platform.OS}-v${jsVersion}`
            )
          }
        >
          <Text style={styles.button}>Email Us</Text>
        </Pressable>
        <Pressable
          onPress={() =>
            StoreReview.isAvailableAsync()
              .then((avail) => avail && void StoreReview.requestReview())
              .catch((err) => __DEV__ && console.error(err))
          }
        >
          <Text style={styles.button}>Review Us</Text>
        </Pressable>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create(
  responsive({
    container: {
      position: "absolute",
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 2,
    },
    dimlayer: {
      position: "absolute",
      width: "100%",
      height: "100%",
      backgroundColor: "black",
      opacity: 0.5,
    },
    modal: {
      borderRadius: 10,
      backgroundColor: "aliceblue",
      maxWidth: 285,
      padding: 20,
      alignItems: "center",
    },
    content: {
      lineHeight: 24,
      marginVertical: 14,
      fontSize: 16,
      textAlign: "center",
    },
    button: {
      backgroundColor: "#D8E7EE",
      fontSize: 14,
      borderRadius: 10,
      margin: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    row: {
      flexDirection: "row",
    },
  })
);
