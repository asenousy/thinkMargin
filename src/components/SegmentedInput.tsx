import React, { ReactElement } from "react";
import { StyleSheet, View, TextInput, Platform } from "react-native";
import SegmentedControlTab from "react-native-segmented-control-tab";

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

  const refs = [];

  return (
    <View style={styles.container}>
      <SegmentedControlTab
        tabStyle={{
          backgroundColor: "aliceblue"
        }}
        lastTabStyle={{ borderLeftWidth: 1 }}
        tabTextStyle={{ color: "black" }}
        borderRadius={2}
        values={segments.map(segment => segment.label)}
        selectedIndex={selected}
        onTabPress={newSelected => {
          onSelection(newSelected);
          refs[newSelected].focus();
        }}
      />
      <View style={styles.row}>
        {segments.map(({ key, label, value }, i) => (
          <TextInput
            ref={ref => refs.push(ref)}
            style={i === selected ? styles.focused : styles.unfocused}
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
  focused: {
    flex: 1,
    textAlign: "center",
    borderRadius: 2,
    borderWidth: 0.2,
    borderColor: "dodgerblue",
    backgroundColor: "white",
    paddingVertical: Platform.OS === "ios" ? 4 : 0,
    marginHorizontal: 2
  },
  unfocused: {
    flex: 1,
    textAlign: "center",
    paddingVertical: Platform.OS === "ios" ? 4 : 0,
    marginHorizontal: 2
  }
});
