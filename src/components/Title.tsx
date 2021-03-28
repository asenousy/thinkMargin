import React, { FC } from "react";
import { StyleSheet, Text } from "react-native";
import { responsive } from "../helpers";
import { colours } from "../constants.json";

const Title: FC = ({ children }) => (
  <Text style={styles.container}>{children}</Text>
);

const styles = StyleSheet.create(
  responsive({
    container: {
      fontSize: 20,
      paddingHorizontal: 40,
      textAlign: "center",
      fontWeight: "bold",
      color: colours.border,
    },
  })
);

export default Title;
