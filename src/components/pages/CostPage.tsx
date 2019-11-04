import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import { NavigationTabProp } from "react-navigation-tabs";
import LabeledInput from "../LabeledInput";
import LabeledOutput from "../LabeledOutput";
import SegmentedInput from "../SegmentedInput";
import Footer from "../Footer";
import { reducer, StoreState } from "../../reducer";
import {
  calculateCost,
  reset,
  crop,
  resetAll,
  update,
  format,
  updateMarginSegment,
  updatePriceSegment
} from "../../actions";

class CostPage extends React.PureComponent<NavigationTabProp, StoreState> {
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
    this.didFocusSubscription = props.navigation.addListener("didFocus", () => {
      this.keyboardHideListener = Keyboard.addListener("keyboardDidHide", () =>
        this.dispatch(calculateCost())
      );
    });
    this.didBlurSubscription = props.navigation.addListener("didBlur", () => {
      this.keyboardHideListener.remove();
    });
  }

  dispatch(action) {
    this.setState(prevState => reducer(prevState, action));
  }

  onFocus(key) {
    const { figures } = this.state;
    return () => {
      if (figures[key] == 0 || Number.isNaN(+figures[key])) {
        return void this.dispatch(reset(key));
      }

      if (figures[key].endsWith(".00")) this.dispatch(crop(key));
    };
  }

  onEndEditing(key) {
    return () => this.dispatch(format(key));
  }

  render() {
    const { figures, priceSegment, marginSegment } = this.state;
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.description}>Calculate Cost</Text>
          </View>
          <View style={styles.main}>
            <View>
              <LabeledInput
                label="VAT % :"
                value={figures.vat}
                onChange={newValue => this.dispatch(update({ vat: newValue }))}
                onEndEditing={this.onEndEditing("vat")}
                onFocus={this.onFocus("vat")}
              />
              <SegmentedInput
                segments={[
                  {
                    key: "priceExcVAT",
                    label: "Price (excl. VAT)",
                    value: figures.priceExcVAT
                  },
                  {
                    key: "priceIncVAT",
                    label: "Price (incl. VAT)",
                    value: figures.priceIncVAT
                  }
                ]}
                selected={priceSegment}
                onSelection={i => this.dispatch(updatePriceSegment(i))}
                onValueChange={({ key, value }) =>
                  this.dispatch(update({ [key]: value }))
                }
                onEndEditing={key => this.onEndEditing(key)()}
                onFocus={key => this.onFocus(key)()}
              />
              <SegmentedInput
                segments={[
                  {
                    key: "margin",
                    label: "Margin %",
                    value: figures.margin
                  },
                  {
                    key: "profit",
                    label: "Profit",
                    value: figures.profit
                  }
                ]}
                selected={marginSegment}
                onSelection={i => this.dispatch(updateMarginSegment(i))}
                onValueChange={({ key, value }) =>
                  this.dispatch(update({ [key]: value }))
                }
                onEndEditing={key => this.onEndEditing(key)()}
                onFocus={key => this.onFocus(key)()}
              />
            </View>
            <View style={styles.output}>
              <LabeledOutput label="Cost :" value={figures.cost} />
            </View>
          </View>
          <Footer onReset={() => this.dispatch(resetAll())} />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  componentWillUnmount() {
    this.keyboardHideListener && this.keyboardHideListener.remove();
    this.didFocusSubscription.remove();
    this.didBlurSubscription.remove();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  main: {
    flex: 4,
    alignItems: "center"
  },
  output: {
    paddingVertical: 20
  },
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  description: {
    fontSize: 20,
    paddingHorizontal: 40,
    textAlign: "center",
    fontWeight: "bold",
    color: "dodgerblue"
  }
});

export default CostPage;
