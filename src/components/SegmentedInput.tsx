import React, { ReactElement } from "react";
import SegmentedControlTab from "react-native-segmented-control-tab";
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
      <SegmentedControlTab
        values={segments.map(segment => segment.label)}
        selectedIndex={selected}
        onTabPress={newSelected => onSelection(newSelected)}
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
    paddingVertical: 5
  },
  input: {
    flex: 1,
    textAlign: "center",
    borderRadius: 2,
    borderWidth: 0.2,
    borderColor: "dodgerblue",
    backgroundColor: "white",
    paddingVertical: 5,
    marginHorizontal: 2
  }
});
