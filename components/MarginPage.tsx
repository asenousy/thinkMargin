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
      let { vat, cost, priceExcVAT, priceIncVAT } = state.figures;

      if (state.segment) {
        priceExcVAT = (100 * priceIncVAT) / (+vat + 100);
      } else {
        priceIncVAT = +priceExcVAT + (priceExcVAT * vat) / 100;
      }
      const profit = priceExcVAT - cost;
      const margin = (profit / priceExcVAT) * 100;

      newState = {
        ...state,
        figures: {
          ...state.figures,
          priceExcVAT: format(priceExcVAT),
          priceIncVAT: format(priceIncVAT),
          margin: format(margin),
          profit: format(profit)
        }
      };
      break;

    default:
      throw new Error("wrong action type");
      break;
  }
  return newState;
}

const MarginPage: FC = () => {
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
                key: "priceExcVAT",
                label: "price (exc. VAT)",
                value: state.figures.priceExcVAT
              },
              {
                key: "priceIncVAT",
                label: "price (inc. VAT)",
                value: state.figures.priceIncVAT
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
          <LabeledOutput label="Profit" value={state.figures.profit} />
          <LabeledOutput label="Margin %" value={state.figures.margin} />
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

export default MarginPage;
