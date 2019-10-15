import React, { useReducer, FC, useEffect } from "react";
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import LabeledInput from "../LabeledInput";
import LabeledOutput from "../LabeledOutput";
import SegmentedInput from "../SegmentedInput";
import Footer from "../Footer";
import reducer from "../../reducer";

const CostPage: FC = () => {
  const [state, dispatch]: any = useReducer(reducer, {
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
  });

  useEffect(() => {
    const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () =>
      dispatch({ type: "CALCULATE_COST" })
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
            <SegmentedInput
              segments={[
                {
                  key: "priceExcVAT",
                  label: "Price (exc. VAT)",
                  value: state.figures.priceExcVAT
                },
                {
                  key: "priceIncVAT",
                  label: "Price (inc. VAT)",
                  value: state.figures.priceIncVAT
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
              selected={state.marginSegment}
              onSelection={i =>
                dispatch({ type: "UPDATE_MARGIN_SEGMENT", payload: i })
              }
              onValueChange={({ key, value }) =>
                dispatch({ type: "UPDATE", payload: { [key]: value } })
              }
              onEndEditing={key => onEndEditing(key)()}
              onFocus={key => onFocus(key)()}
            />
          </View>
          <View style={styles.output}>
            <LabeledOutput label="Cost" value={state.figures.cost} />
          </View>
        </View>
        <Footer onReset={() => dispatch({ type: "RESET_ALL" })} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "aliceblue"
  },
  main: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  output: {
    paddingVertical: 10
  }
});

export default CostPage;
