import React, { FC } from "react";
import { StyleSheet, View, Alert, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

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
        Alert.alert(
          "bug",
          "any bugs or improvements to recommend, please email me :)",
          [{ text: "email me" }, { text: "cancel" }]
        )
      }
    >
      <Icon name="info-circle" size={25} color="dodgerblue" />
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
