import React, { useReducer, FC, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import LabeledInput from "../LabeledInput";
import LabeledOutput from "../LabeledOutput";
import SegmentedInput from "../SegmentedInput";
import Footer from "../Footer";
import reducer from "../../reducer";

const PricePage: FC = () => {
  const [state, dispatch]: any = useReducer(reducer, {
    priceSegment: 0,
    figures: {
      vat: "",
      cost: "",
      margin: "",
      profit: "",
      priceIncVAT: "",
      priceExcVAT: ""
    }
  });

  useEffect(() => {
    const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () =>
      dispatch({ type: "CALCULATE_PRICE" })
    );
    return () => keyboardHideListener.remove();
  }, []);

  function onFocus(key) {
    return () => {
      if (state.figures[key] == 0 || Number.isNaN(+state.figures[key])) {
        return void dispatch({ type: "RESET", payload: key });
      }

      if (state.figures[key].endsWith(".00"))
        dispatch({ type: "CROP", payload: key });
    };
  }

  function onEndEditing(key) {
    return () => dispatch({ type: "FORMAT", payload: key });
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.description}>
            Calculate Price (excl. & incl. VAT)
          </Text>
        </View>
        <View style={styles.main}>
          <View>
            <LabeledInput
              label="VAT % :"
              value={state.figures.vat}
              onChange={newValue =>
                dispatch({ type: "UPDATE", payload: { vat: newValue } })
              }
              onEndEditing={onEndEditing("vat")}
              onFocus={onFocus("vat")}
            />
            <LabeledInput
              label="Cost :"
              value={state.figures.cost}
              onChange={newValue =>
                dispatch({ type: "UPDATE", payload: { cost: newValue } })
              }
              onEndEditing={onEndEditing("cost")}
              onFocus={onFocus("cost")}
            />
            <SegmentedInput
              segments={[
                {
                  key: "margin",
                  label: "Margin %",
                  value: state.figures.margin
                },
                {
                  key: "profit",
                  label: "Profit",
                  value: state.figures.profit
                }
              ]}
              selected={state.priceSegment}
              onSelection={i =>
                dispatch({ type: "UPDATE_PRICE_SEGMENT", payload: i })
              }
              onValueChange={({ key, value }) =>
                dispatch({ type: "UPDATE", payload: { [key]: value } })
              }
              onEndEditing={key => onEndEditing(key)()}
              onFocus={key => onFocus(key)()}
            />
          </View>
          <View style={styles.output}>
            <LabeledOutput
              label="Price (excl. VAT) :"
              value={state.figures.priceExcVAT}
            />
            <LabeledOutput
              label="Price (incl. VAT) :"
              value={state.figures.priceIncVAT}
            />
          </View>
        </View>
        <Footer onReset={() => dispatch({ type: "RESET_ALL" })} />
      </View>
    </TouchableWithoutFeedback>
  );
};

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
    fontSize: 17,
    paddingHorizontal: 40,
    textAlign: "center",
    fontWeight: "bold",
    color: "dodgerblue"
  }
});

export default PricePage;
