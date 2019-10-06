import React, { useState, useEffect, FC } from "react";
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import LabeledInput from "./LabeledInput";
import LabeledOutput from "./LabeledOutput";
import SegmentedInput from "./SegmentedInput";
import calculatePrice from "../lib/calculatePrice";

function decimalize(figure: number | string): string {
  return figure == 0 ? "0" : (+figure).toFixed(2);
}

function stringify(figures): any {
  return Object.entries(figures).reduce((newFigures, [key, value]: any) => {
    newFigures[key] = decimalize(value);
    return newFigures;
  }, {});
}

const Price: FC = () => {
  const [state, setState] = useState({
    selectedSegment: 0,
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
      setState(prevState => ({
        ...prevState,
        figures: stringify(
          calculatePrice({
            ...prevState.figures,
            [prevState.selectedSegment ? "margin" : "profit"]: undefined
          })
        )
      }))
    );
    return () => keyboardHideListener.remove();
  }, []);

  function onFocus(key) {
    return () => {
      if (state.figures[key] == 0 || Number.isNaN(+state.figures[key])) {
        return void setState(prevState => ({
          ...prevState,
          figures: { ...prevState.figures, [key]: "" }
        }));
      }

      if (state.figures[key].endsWith(".00"))
        setState(prevState => ({
          ...prevState,
          figures: {
            ...prevState.figures,
            [key]: prevState.figures[key].slice(0, -3)
          }
        }));
    };
  }

  function onEndEditing(key) {
    return () =>
      setState(prevState => ({
        ...prevState,
        figures: {
          ...prevState.figures,
          [key]: decimalize(prevState.figures[key])
        }
      }));
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View>
          <LabeledInput
            label="VAT:"
            value={state.figures.vat}
            onChange={newValue =>
              setState(prevState => ({
                ...prevState,
                figures: { ...prevState.figures, vat: newValue }
              }))
            }
            onEndEditing={onEndEditing("vat")}
            onFocus={onFocus("vat")}
          />
          <LabeledInput
            label="Cost:"
            value={state.figures.cost}
            onChange={newValue =>
              setState(prevState => ({
                ...prevState,
                figures: { ...prevState.figures, cost: newValue }
              }))
            }
            onEndEditing={onEndEditing("cost")}
            onFocus={onFocus("cost")}
          />
          <SegmentedInput
            segments={[
              { key: "margin", label: "margin %", value: state.figures.margin },
              { key: "profit", label: "profit", value: state.figures.profit }
            ]}
            selected={state.selectedSegment}
            onSelection={i =>
              setState(prevState => ({ ...prevState, selectedSegment: i }))
            }
            onValueChange={({ key, value }) =>
              setState(prevState => ({
                ...prevState,
                figures: { ...prevState.figures, [key]: value }
              }))
            }
            onEndEditing={key => onEndEditing(key)()}
            onFocus={key => onFocus(key)()}
          />
        </View>
        <View style={styles.output}>
          <LabeledOutput
            label="Price (exc. VAT):"
            value={state.figures.priceExcVAT}
          />
          <LabeledOutput
            label="Price (inc. VAT):"
            value={state.figures.priceIncVAT}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  output: {
    paddingVertical: 10
  }
});

export default Price;
