import React, { FC, memo } from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  label: string;
  value: string;
};

const LabeledOutput: FC<Props> = ({ label, value }) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.label}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 5
  },
  label: {
    textAlign: "center",
    minWidth: 70,
    padding: 5,
    fontWeight: "bold",
    fontSize: 16
  }
});

export default memo(LabeledOutput);
