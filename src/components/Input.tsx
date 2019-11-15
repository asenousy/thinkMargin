import React, { RefObject, PureComponent } from "react";
import { TextInput, TextInputProps } from "react-native";

export type Props = TextInputProps & {
  name: string;
  onChanged(change: { [name: string]: string }): void;
  onFocused(name: string): void;
  onEdited(name: string): void;
  forwardedRef?: RefObject<TextInput>;
};

class Input extends PureComponent<Props> {
  onFocusHandler = () => this.props.onFocused(this.props.name);
  onEndEditngHandler = () => this.props.onEdited(this.props.name);
  onChangeTextHandler = (value: string) =>
    this.props.onChanged({ [this.props.name]: value });

  render() {
    const {
      name,
      onChangeText,
      onFocus,
      forwardedRef,
      onEndEditing,
      ...props
    } = this.props;

    return (
      <TextInput
        ref={forwardedRef}
        onChangeText={this.onChangeTextHandler}
        onFocus={this.onFocusHandler}
        onEndEditing={this.onEndEditngHandler}
        {...props}
      />
    );
  }
}

export default Input;
