import React, { ReactElement } from "react";
import SegmentedControlIOS from "@react-native-community/segmented-control";
import { StyleSheet, View, TextInput } from "react-native";

type Props = {
  segments: Array<{ key: string; label: string; value: string }>;
  selected: number;
  onSelection: (number) => void;
  onValueChange: (newValue: { key: string; value: string }) => void;
  onFocus: (key) => void;
  onEndEditing: (key) => void;
};

export default function SegmentedInput(props: Props): ReactElement {
  const {
    segments,
    selected,
    onSelection,
    onValueChange,
    onFocus,
    onEndEditing
  } = props;

  return (
    <View style={styles.container}>
      <SegmentedControlIOS
        values={segments.map(segment => segment.label)}
        selectedIndex={selected}
        onChange={event => onSelection(event.nativeEvent.selectedSegmentIndex)}
      />
      <View style={styles.row}>
        {segments.map(({ key, label, value }, i) => (
          <TextInput
            style={styles.input}
            value={value}
            key={label}
            onChangeText={newValue => onValueChange({ key, value: newValue })}
            keyboardType="numeric"
            onFocus={() => {
              onSelection(i);
              onFocus(key);
            }}
            onEndEditing={() => onEndEditing(key)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10
  },
  input: {
    flex: 1,
    textAlign: "center"
  }
});
