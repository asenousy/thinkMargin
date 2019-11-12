import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

type Props = {
  name: string;
  label: string;
  value: string;
  onChange: (string) => void;
  onEndEditing: (key: string) => void;
  onFocus: (key: string) => void;
};

class LabeledInput extends React.PureComponent<Props> {
  onChange = value => this.props.onChange({ [this.props.name]: value });
  onFocus = () => this.props.onFocus(this.props.name);
  onEndEditing = () => this.props.onEndEditing(this.props.name);

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{this.props.label}</Text>
        <TextInput
          style={styles.input}
          value={this.props.value}
          onChangeText={this.onChange}
          keyboardType="numeric"
          onEndEditing={this.onEndEditing}
          onFocus={this.onFocus}
          clearButtonMode={"while-editing"}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10
  },
  label: {
    width: 120,
    textAlign: "center",
    padding: 5
  },
  input: {
    borderRadius: 2,
    borderWidth: 0.2,
    borderColor: "dodgerblue",
    backgroundColor: "white",
    textAlign: "center",
    width: 120
  }
});

export default LabeledInput;
