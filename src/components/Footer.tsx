import React, { FC } from "react";
import {
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
  Text,
  Linking
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

type Props = {
  onReset(): void;
};

const Footer: FC<Props> = ({ onReset }) => (
  <View style={styles.footer}>
    <TouchableOpacity style={styles.reset} onPress={onReset}>
      <Text style={styles.footerText}>reset</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.info}
      onPress={() =>
        Alert.alert("Contact Me", "feel free to email me for any thoughts", [
          {
            text: "email me",
            onPress: () =>
              Linking.openURL("mailto:cafefrecsa@gmail.com?subject=thinkMargin")
          },
          { text: "cancel" }
        ])
      }
    >
      <FontAwesome name="envelope" size={25} color="dodgerblue" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  reset: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "dodgerblue",
    justifyContent: "center",
    marginBottom: 40,
    paddingBottom: 2,
    paddingHorizontal: 10,
    marginLeft: 30
  },
  info: {
    justifyContent: "center",
    marginBottom: 40,
    paddingHorizontal: 10,
    marginRight: 30
  },
  footerText: {
    fontSize: 15,
    color: "dodgerblue"
  }
});

export default Footer;
