import React, { FC } from "react";
import { StyleSheet, View, Alert, TouchableOpacity, Text } from "react-native";

type Props = {
  onReset(): void;
};

const Footer: FC<Props> = ({ onReset }) => (
  <View style={styles.footer}>
    <TouchableOpacity style={styles.footerItem} onPress={onReset}>
      <Text style={styles.footerText}>reset</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.footerItem}
      onPress={() =>
        Alert.alert(
          "bug",
          "any bugs or improvements to recommend, please email me :)",
          [{ text: "email me" }, { text: "cancel" }]
        )
      }
    >
      <Text style={styles.footerText}>bug</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  main: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  output: {
    paddingVertical: 10
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  footerItem: {
    padding: 20
  },
  footerText: {
    color: "dodgerblue"
  }
});

export default Footer;
