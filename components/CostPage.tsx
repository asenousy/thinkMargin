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
  switch (type) {
    case "UPDATE_PRICE_SEGMENT":
      return {
        ...state,
        priceSegment: payload
      };

    case "UPDATE_MARGIN_SEGMENT":
      return {
        ...state,
        marginSegment: payload
      };

    case "RESET":
      return {
        ...state,
        figures: {
          ...state.figures,
          [payload]: ""
        }
      };

    case "UPDATE":
      return {
        ...state,
        figures: {
          ...state.figures,
          ...payload
        }
      };

    case "CROP":
      return {
        ...state,
        figures: {
          ...state.figures,
          [payload]: state.figures[payload].slice(0, -3)
        }
      };

    case "FORMAT":
      return {
        ...state,
        figures: {
          ...state.figures,
          [payload]: format(state.figures[payload])
        }
      };

    case "CALCULATE":
      let { vat, margin, profit, priceExcVAT, priceIncVAT } = state.figures;

      if (state.priceSegment) {
        priceExcVAT = (100 * priceIncVAT) / (+vat + 100);
      } else {
        priceIncVAT = +priceExcVAT + (priceExcVAT * vat) / 100;
      }
      if (state.marginSegment) {
        margin = (profit / priceExcVAT) * 100;
      } else {
        profit = (priceExcVAT * margin) / 100;
      }
      const cost = priceExcVAT - profit;

      return {
        ...state,
        figures: {
          ...state.figures,
          priceExcVAT: format(priceExcVAT),
          priceIncVAT: format(priceIncVAT),
          margin: format(margin),
          profit: format(profit),
          cost: format(cost)
        }
      };

    default:
      throw new Error("wrong action type");
      break;
  }
}

const CostPage: FC = () => {
  const [state, dispatch]: any = useReducer(reducer, {
    priceSegment: 0,
    marginSegment: 0,
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
                label: "margin %",
                value: state.figures.margin
              },
              {
                key: "profit",
                label: "profit",
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

export default CostPage;
