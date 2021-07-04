import { digitGroupingSeparator, decimalSeparator } from "expo-localization";
import { Action, ActionTypes } from "./actions";
import { SegmentName } from "./components/SegmentedInput";
import { LocaleParser, LocaleFormatter } from "./helpers";

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

const parser = LocaleParser(digitGroupingSeparator, decimalSeparator);
const fomatter = LocaleFormatter(digitGroupingSeparator, decimalSeparator);

export function numberify(figures: Figure): { [key: string]: number } {
  return Object.entries(figures).reduce(
    (newFigures, [key, value]) => ({
      ...newFigures,
      [key]: parser(value),
    }),
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
      const figure = parser(state.figures[payload]);
      return {
        ...state,
        figures: {
          ...state.figures,
          [payload]: figure === 0 ? "" : fomatter(figure, true, false),
        },
      };
    }

    case ActionTypes.FORMAT: {
      return {
        ...state,
        figures: {
          ...state.figures,
          [payload]: fomatter(
            parser(state.figures[payload]),
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
          vat: fomatter(vat, true),
          cost: fomatter(cost),
          margin: fomatter(margin, true),
          profit: fomatter(profit),
          priceExcVAT: fomatter(priceExcVAT),
          priceIncVAT: fomatter(priceIncVAT),
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
          vat: fomatter(vat, true),
          cost: fomatter(cost),
          priceExcVAT: fomatter(priceExcVAT),
          priceIncVAT: fomatter(priceIncVAT),
          margin: fomatter(margin, true),
          profit: fomatter(profit),
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
          vat: fomatter(vat, true),
          priceExcVAT: fomatter(priceExcVAT),
          priceIncVAT: fomatter(priceIncVAT),
          margin: fomatter(margin, true),
          profit: fomatter(profit),
          cost: fomatter(cost),
        },
      };
    }

    default:
      if (__DEV__) throw new Error("wrong action type: " + type);
  }
}
