import React, { RefObject } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Platform,
  TextInputProps
} from "react-native";
import SegmentedControlTab from "react-native-segmented-control-tab";

type Props = {
  ukey: string;
  name: string;
  segments: Array<{ name: string; label: string; value: string }>;
  selected: number;
  onSelection: (number) => void;
  onValueChange: ({ [name]: string }) => void;
  onFocus: (key) => void;
  onEndEditing: (key) => void;
};

class NamedTextInput extends React.PureComponent<
  TextInputProps & {
    name: string;
    onChangeText(any): void;
    onFocus(text): void;
    forwardedRef: RefObject<TextInput>;
  }
> {
  onChangeText = value => this.props.onChangeText({ [this.props.name]: value });
  onFocusHandler = () => this.props.onFocus(this.props.name);
  render() {
    const { name, onChangeText, onFocus, forwardedRef, ...props } = this.props;
    return (
      <TextInput
        ref={forwardedRef}
        onChangeText={this.onChangeText}
        onFocus={this.onFocusHandler}
        {...props}
      />
    );
  }
}

class SegmentedInput extends React.PureComponent<Props> {
  inputs;

  constructor(props) {
    super(props);
    this.inputs = props.segments.map(() => React.createRef());
  }

  onSelectionHandler = i => {
    this.props.onSelection({ [this.props.name]: i });
    this.inputs[i].current.focus();
  };

  onFocusHandler = name => {
    const i = this.props.segments.findIndex(segment => segment.name === name);
    this.props.onSelection({ [this.props.name]: i });
    this.props.onFocus(name);
  };

  render() {
    const {
      ukey,
      segments,
      selected,
      onValueChange,
      onEndEditing
    } = this.props;

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
          onTabPress={this.onSelectionHandler}
        />
        <View style={styles.row}>
          {segments.map(({ name, label, value }, i) => (
            <NamedTextInput
              key={ukey + label}
              name={name}
              forwardedRef={this.inputs[i]}
              style={i === selected ? styles.focused : styles.unfocused}
              value={value}
              onChangeText={onValueChange}
              keyboardType="numeric"
              onFocus={this.onFocusHandler}
              onEndEditing={() => onEndEditing(name)}
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
  }
});

export default SegmentedInput;
