import React, { FC, memo } from "react";
import {
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
  Text,
  Linking,
  Platform
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { jsVersion } from "../../configs.json";
import { responsive } from "../helpers";

type Props = {
  onReset(): void;
};

const Footer: FC<Props> = ({ onReset }) => (
  <View style={styles.footer}>
    <TouchableOpacity style={styles.reset} onPress={onReset}>
      <Text style={styles.footerText}>reset</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.info} onPress={contactAlert}>
      <FontAwesome name="envelope" size={responsive(25)} color="dodgerblue" />
    </TouchableOpacity>
  </View>
);

const contactAlert = () =>
  Alert.alert(
    "Contact Me",
    "feel free to email me for any thoughts or issues",
    [
      {
        text: "email me",
        onPress: () =>
          Linking.openURL(
            `mailto:hanounasoft@hotmail.com?subject=thinkMargin ${Platform.OS}-v${jsVersion}`
          )
      },
      { text: "cancel" }
    ]
  );

const styles = StyleSheet.create(
  responsive({
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
  })
);

export default memo(Footer);
