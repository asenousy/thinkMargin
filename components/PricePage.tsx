import React, { useReducer, FC, useEffect } from "react";
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import LabeledInput from "./LabeledInput";
import LabeledOutput from "./LabeledOutput";
import SegmentedInput from "./SegmentedInput";

function format(figure: string | number) {
  return +figure == 0 ? "0" : (+figure).toFixed(2);
}

function reducer(state, { type, payload }) {
  let newState;
  switch (type) {
    case "UPDATE_SEGMENT":
      newState = {
        ...state,
        segment: payload
      };
      break;

    case "RESET":
      newState = {
        ...state,
        figures: {
          ...state.figures,
          [payload]: ""
        }
      };
      break;

    case "UPDATE":
      newState = {
        ...state,
        figures: {
          ...state.figures,
          ...payload
        }
      };
      break;

    case "CROP":
      newState = {
        ...state,
        figures: {
          ...state.figures,
          [payload]: state.figures[payload].slice(0, -3)
        }
      };
      break;

    case "FORMAT":
      newState = {
        ...state,
        figures: {
          ...state.figures,
          [payload]: format(state.figures[payload])
        }
      };
      break;

    case "CALCULATE":
      let { vat, cost, margin, profit } = state.figures;

      if (state.segment) {
        margin = (profit / (+cost + +profit)) * 100;
      } else {
        profit = ((margin / 100) * cost) / (1 - margin / 100);
      }
      const priceExcVAT = +cost + +profit;
      const priceIncVAT = +priceExcVAT + (priceExcVAT * vat) / 100;

      newState = {
        ...state,
        figures: {
          ...state.figures,
          margin: format(margin),
          profit: format(profit),
          priceExcVAT: format(priceExcVAT),
          priceIncVAT: format(priceIncVAT)
        }
      };
      break;

    default:
      throw new Error("wrong action type");
      break;
  }
  return newState;
}

const PricePage: FC = () => {
  const [state, dispatch]: any = useReducer(reducer, {
    segment: 0,
    figures: {
      vat: "0",
      cost: "0",
      margin: "0",
      profit: "0",
      priceIncVAT: "0",
      priceExcVAT: "0"
    }
  });

  useEffect(() => {
    const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () =>
      dispatch({ type: "CALCULATE" })
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
        <View>
          <LabeledInput
            label="VAT:"
            value={state.figures.vat}
            onChange={newValue =>
              dispatch({ type: "UPDATE", payload: { vat: newValue } })
            }
            onEndEditing={onEndEditing("vat")}
            onFocus={onFocus("vat")}
          />
          <LabeledInput
            label="Cost:"
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
                label: "margin %",
                value: state.figures.margin
              },
              {
                key: "profit",
                label: "profit",
                value: state.figures.profit
              }
            ]}
            selected={state.segment}
            onSelection={i => dispatch({ type: "UPDATE_SEGMENT", payload: i })}
            onValueChange={({ key, value }) =>
              dispatch({ type: "UPDATE", payload: { [key]: value } })
            }
            onEndEditing={key => onEndEditing(key)()}
            onFocus={key => onFocus(key)()}
          />
        </View>
        <View style={styles.output}>
          <LabeledOutput
            label="Price (exc. VAT)"
            value={state.figures.priceExcVAT}
          />
          <LabeledOutput
            label="Price (inc. VAT)"
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

export default PricePage;
