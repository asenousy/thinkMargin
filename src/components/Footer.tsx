import React, { FC, memo } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { responsive } from "../helpers";

type Props = {
  onReset(): void;
};

const Footer: FC<Props> = ({ onReset }) => (
  <View style={styles.footer}>
    <TouchableOpacity style={styles.info} onPress={() => {}}>
      <AntDesign name="form" size={responsive(35)} color="dodgerblue" />
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
      borderWidth: 1,
      borderRadius: 3,
      borderColor: "dodgerblue",
      justifyContent: "center",
      paddingHorizontal: 15,
      margin: 25,
    },
    info: {
      justifyContent: "center",
      margin: 25,
    },
    footerText: {
      fontSize: 15,
      color: "dodgerblue",
    },
  })
);

export default memo(Footer);
