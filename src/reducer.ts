import * as Localization from "expo-localization";
import { Action, ActionTypes } from "./actions";
import { SegmentName } from "./components/SegmentedInput";
import Numeral from "numeral";
import "numeral/locales";

Numeral.locale(Localization.locale);

export type Segment = {
  [key in SegmentName]?: number;
};
export type Figure = {
  [key in keyof StoreState["figures"]]?: string;
};

export type StoreState = {
  priceSegment?: number;
  marginSegment?: number;
  showFeedback: boolean;
  figures: {
    vat: string;
    cost: string;
    margin: string;
    profit: string;
    priceIncVAT: string;
    priceExcVAT: string;
  };
};

function format(figure: string | number, percentage: boolean = false) {
  const formatted = Numeral(figure).format("0,0.00");
  return percentage && formatted.endsWith(".00")
    ? formatted.slice(0, -3)
    : formatted;
}

export function numberify(figures: Figure): { [key: string]: number } {
  return Object.entries(figures).reduce(
    (newFigures, [key, value]) => ({ ...newFigures, [key]: +value }),
    {}
  );
}

export function reducer(state: StoreState, { type, payload }: Action) {
  switch (type) {
    case ActionTypes.UPDATE_SEGMENT: {
      return {
        ...state,
        ...payload,
      };
    }

    case ActionTypes.RESET_ALL: {
      return {
        ...state,
        figures: {
          ...Object.keys(state.figures).reduce((newFigures, key) => {
            newFigures[key] = "";
            return newFigures;
          }, {}),
        },
      };
    }

    case ActionTypes.TOGGLE_FEEDBACK: {
      return {
        ...state,
        showFeedback: !state.showFeedback,
      };
    }

    case ActionTypes.UPDATE_FIGURE: {
      return {
        ...state,
        figures: {
          ...state.figures,
          ...payload,
        },
      };
    }

    case ActionTypes.CROP: {
      const figure = Numeral(state.figures[payload]);
      const formatted = +figure.value() === 0 ? "" : figure.format("0.00");
      return {
        ...state,
        figures: {
          ...state.figures,
          [payload]: formatted.endsWith(".00")
            ? formatted.slice(0, -3)
            : formatted,
        },
      };
    }

    case ActionTypes.FORMAT: {
      return {
        ...state,
        figures: {
          ...state.figures,
          [payload]: format(
            state.figures[payload],
            payload === "vat" || payload === "margin"
          ),
        },
      };
    }

    case ActionTypes.CALCULATE_PRICE: {
      let { vat, cost, margin, profit } = numberify(state.figures);

      if (state.marginSegment) {
        margin = (profit / (cost + profit)) * 100;
      } else {
        profit = ((margin / 100) * cost) / (1 - margin / 100);
      }
      const priceExcVAT = cost + profit;
      const priceIncVAT = priceExcVAT + (priceExcVAT * vat) / 100;

      return {
        ...state,
        figures: {
          vat: format(vat, true),
          cost: format(cost),
          margin: format(margin, true),
          profit: format(profit),
          priceExcVAT: format(priceExcVAT),
          priceIncVAT: format(priceIncVAT),
        },
      };
    }

    case ActionTypes.CALCULATE_MARGIN: {
      let { vat, cost, priceExcVAT, priceIncVAT } = numberify(state.figures);

      if (state.priceSegment) {
        priceExcVAT = (100 * priceIncVAT) / (vat + 100);
      } else {
        priceIncVAT = priceExcVAT + (priceExcVAT * vat) / 100;
      }
      const profit = priceExcVAT - cost;
      const margin = (profit / priceExcVAT) * 100;

      return {
        ...state,
        figures: {
          vat: format(vat, true),
          cost: format(cost),
          priceExcVAT: format(priceExcVAT),
          priceIncVAT: format(priceIncVAT),
          margin: format(margin, true),
          profit: format(profit),
        },
      };
    }

    case ActionTypes.CALCULATE_COST: {
      let { vat, margin, profit, priceExcVAT, priceIncVAT } = numberify(
        state.figures
      );

      if (state.priceSegment) {
        priceExcVAT = (100 * priceIncVAT) / (vat + 100);
      } else {
        priceIncVAT = priceExcVAT + (priceExcVAT * vat) / 100;
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
          vat: format(vat, true),
          priceExcVAT: format(priceExcVAT),
          priceIncVAT: format(priceIncVAT),
          margin: format(margin, true),
          profit: format(profit),
          cost: format(cost),
        },
      };
    }

    default:
      if (__DEV__) throw new Error("wrong action type: " + type);
  }
}
