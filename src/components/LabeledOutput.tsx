import React, { ReactElement } from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  label: string;
  value: string;
};

export default function LabeledOutput(props: Props): ReactElement {
  const { label, value } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.label}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10
  },
  label: {
    textAlign: "center",
    width: 132,
    padding: 5,
    fontWeight: "bold",
    fontSize: 15
  }
});
