import React, { FC, memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { responsive } from "../helpers";

type Props = {
  name: string;
  label: string;
  value: string;
  onChange(change: { [name: string]: string }): void;
  onFocus(name: string): void;
  onEndEditing(name: string): void;
  onSubmit(): void;
};

const LabeledInput: FC<Props> = (props) => (
  <View style={styles.container}>
    <Text style={styles.label}>{props.label}</Text>
    <Input
      name={props.name}
      style={styles.input}
      value={props.value}
      onChanged={props.onChange}
      keyboardType="numeric"
      onEdited={props.onEndEditing}
      onFocused={props.onFocus}
      clearButtonMode={"while-editing"}
      onSubmit={props.onSubmit}
    />
  </View>
);

const styles = StyleSheet.create(
  responsive({
    container: {
      flexDirection: "row",
      padding: 10,
    },
    label: {
      fontSize: 15,
      width: 120,
      textAlign: "center",
      padding: 5,
    },
    input: {
      fontSize: 15,
      borderRadius: 2,
      borderWidth: 0.3,
      borderColor: "dodgerblue",
      backgroundColor: "white",
      textAlign: "center",
      width: 120,
    },
  })
);

export default memo(LabeledInput);
