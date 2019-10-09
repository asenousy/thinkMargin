import React, { ReactElement } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

type Props = {
  label: string;
  value: string;
  onChange: (string) => void;
  onEndEditing: () => void;
  onFocus: () => void;
};

export default function LabeledInput(props: Props): ReactElement {
  const { label, value, onChange, onEndEditing, onFocus } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        keyboardType="numeric"
        onEndEditing={onEndEditing}
        onFocus={onFocus}
        clearButtonMode={"while-editing"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10
  },
  label: {
    width: 120,
    padding: 5
  },
  input: {
    textAlign: "center",
    padding: 5,
    width: 120
  }
});
