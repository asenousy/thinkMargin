import React from "react";
import { Keyboard } from "react-native";
import { NavigationTabProp } from "react-navigation-tabs";
import { reducer, StoreState } from "../../reducer";
import {
  calculate,
  reset,
  crop,
  format,
  update,
  updateSegment,
  resetAll
} from "../../actions";

export default Page =>
  class PageContainer extends React.PureComponent<
    NavigationTabProp,
    StoreState
  > {
    keyboardHideListener;
    didFocusSubscription;
    didBlurSubscription;
    state = {
      priceSegment: 0,
      marginSegment: 0,
      figures: {
        vat: "",
        cost: "",
        margin: "",
        profit: "",
        priceIncVAT: "",
        priceExcVAT: ""
      }
    };

    constructor(props) {
      super(props);
      this.didFocusSubscription = props.navigation.addListener(
        "didFocus",
        () => {
          this.keyboardHideListener = Keyboard.addListener(
            "keyboardDidHide",
            () => this.dispatch(calculate(Page.name))
          );
        }
      );
      this.didBlurSubscription = props.navigation.addListener("didBlur", () => {
        this.keyboardHideListener.remove();
      });
    }

    dispatch = action => this.setState(prevState => reducer(prevState, action));

    onChange = payload => this.dispatch(update(payload));

    onFocus = key => {
      const { figures } = this.state;
      if (figures[key] == 0 || Number.isNaN(+figures[key])) {
        return void this.dispatch(reset(key));
      }
      if (figures[key].endsWith(".00")) this.dispatch(crop(key));
    };

    onEndEditing = key => this.dispatch(format(key));

    updateSegment = segment => this.dispatch(updateSegment(segment));

    onReset = () => this.dispatch(resetAll());

    render() {
      return (
        <Page
          onChange={this.onChange}
          onFocus={this.onFocus}
          onEndEditing={this.onEndEditing}
          updateSegment={this.updateSegment}
          onReset={this.onReset}
          onBackgroundClick={Keyboard.dismiss}
          {...this.state}
        />
      );
    }

    componentWillUnmount() {
      this.keyboardHideListener && this.keyboardHideListener.remove();
      this.didFocusSubscription.remove();
      this.didBlurSubscription.remove();
    }
  };
