import React, { FC, memo } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { responsive } from "../helpers";
import { colours } from "../constants.json";

type Props = {
  onReset(): void;
  onFeedback(): void;
};

const Footer: FC<Props> = ({ onReset, onFeedback }) => (
  <View style={styles.footer}>
    <TouchableOpacity style={styles.info} onPress={onFeedback}>
      <AntDesign name="form" size={responsive(32)} color={colours.border} />
    </TouchableOpacity>
    <TouchableOpacity style={styles.reset} onPress={onReset}>
      <Text style={styles.footerText}>reset</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create(
  responsive({
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    reset: {
      borderWidth: 1.2,
      borderRadius: 3,
      borderColor: colours.border,
      justifyContent: "center",
      paddingHorizontal: 16,
      margin: 25,
    },
    info: {
      justifyContent: "center",
      margin: 25,
    },
    footerText: {
      fontSize: 15,
      color: colours.border,
    },
  })
);

export default memo(Footer);
