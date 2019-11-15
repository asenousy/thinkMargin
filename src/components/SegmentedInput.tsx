import React, { RefObject, PureComponent } from "react";
import { StyleSheet, View, TextInput, Platform } from "react-native";
import SegmentedControlTab from "react-native-segmented-control-tab";
import Input from "./Input";
import { Figure, Segment } from "../reducer";

export type SegmentName = "marginSegment" | "priceSegment";
type Segments = Array<{ name: string; label: string; value: string }>;

type Props = {
  name: SegmentName;
  segments: Segments;
  selected: number;
  onSelection(segment: Segment): void;
  onValueChange(figure: Figure): void;
  onFocus(name: string): void;
  onEndEditing(name: string): void;
};

class SegmentedInput extends PureComponent<Props> {
  inputs: Array<RefObject<TextInput>>;

  constructor(props) {
    super(props);
    this.inputs = props.segments.map(() => React.createRef());
  }

  onSelectionHandler = (i: number) => {
    this.props.onSelection({ [this.props.name]: i });
    this.inputs[i].current.focus();
  };

  onFocusHandler = (name: string) => {
    const i = this.props.segments.findIndex(segment => segment.name === name);
    this.props.onSelection({ [this.props.name]: i });
    this.props.onFocus(name);
  };

  render() {
    const { segments, selected, onValueChange, onEndEditing } = this.props;
    return (
      <View style={styles.container}>
        <SegmentedControlTab
          tabStyle={styles.segmentTab}
          lastTabStyle={styles.segmentLastTab}
          tabTextStyle={styles.segmentTabText}
          borderRadius={2}
          values={segments.map(segment => segment.label)}
          selectedIndex={selected}
          onTabPress={this.onSelectionHandler}
        />
        <View style={styles.row}>
          {segments.map(({ name, label, value }, i) => (
            <Input
              key={label}
              name={name}
              forwardedRef={this.inputs[i]}
              style={i === selected ? styles.focused : styles.unfocused}
              value={value}
              onChanged={onValueChange}
              keyboardType="numeric"
              onFocused={this.onFocusHandler}
              onEdited={onEndEditing}
              clearButtonMode={"while-editing"}
            />
          ))}
        </View>
      </View>
    );
  }
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
    backgroundColor: "aliceblue",
    paddingVertical: Platform.OS === "ios" ? 4 : 0,
    marginHorizontal: 2
  },
  segmentTab: {
    backgroundColor: "aliceblue"
  },
  segmentLastTab: {
    borderLeftWidth: 1
  },
  segmentTabText: {
    color: "black"
  }
});

export default SegmentedInput;
