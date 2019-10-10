function format(figure: string | number) {
  return +figure == 0 ? "0" : (+figure).toFixed(2);
}

export default function reducer(state, { type, payload }) {
  switch (type) {
    case "UPDATE_PRICE_SEGMENT": {
      return {
        ...state,
        priceSegment: payload
      };
    }

    case "UPDATE_MARGIN_SEGMENT": {
      return {
        ...state,
        marginSegment: payload
      };
    }

    case "RESET": {
      return {
        ...state,
        figures: {
          ...state.figures,
          [payload]: ""
        }
      };
    }

    case "RESET_ALL": {
      return {
        ...state,
        figures: {
          ...Object.keys(state.figures).reduce((newFigures, key) => {
            newFigures[key] = "";
            return newFigures;
          }, {})
        }
      };
    }

    case "UPDATE": {
      return {
        ...state,
        figures: {
          ...state.figures,
          ...payload
        }
      };
    }

    case "CROP": {
      return {
        ...state,
        figures: {
          ...state.figures,
          [payload]: state.figures[payload].slice(0, -3)
        }
      };
    }

    case "FORMAT": {
      return {
        ...state,
        figures: {
          ...state.figures,
          [payload]: format(state.figures[payload])
        }
      };
    }

    case "CALCULATE_PRICE": {
      let { vat, cost, margin, profit } = state.figures;

      if (state.priceSegment) {
        margin = (profit / (+cost + +profit)) * 100;
      } else {
        profit = ((margin / 100) * cost) / (1 - margin / 100);
      }
      const priceExcVAT = +cost + +profit;
      const priceIncVAT = +priceExcVAT + (priceExcVAT * vat) / 100;

      return {
        ...state,
        figures: {
          ...state.figures,
          margin: format(margin),
          profit: format(profit),
          priceExcVAT: format(priceExcVAT),
          priceIncVAT: format(priceIncVAT)
        }
      };
    }

    case "CALCULATE_MARGIN": {
      let { vat, cost, priceExcVAT, priceIncVAT } = state.figures;

      if (state.marginSegment) {
        priceExcVAT = (100 * priceIncVAT) / (+vat + 100);
      } else {
        priceIncVAT = +priceExcVAT + (priceExcVAT * vat) / 100;
      }
      const profit = priceExcVAT - cost;
      const margin = (profit / priceExcVAT) * 100;

      return {
        ...state,
        figures: {
          ...state.figures,
          priceExcVAT: format(priceExcVAT),
          priceIncVAT: format(priceIncVAT),
          margin: format(margin),
          profit: format(profit)
        }
      };
    }

    case "CALCULATE_COST": {
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
    }

    default: {
      throw new Error("wrong action type: " + type);
      break;
    }
  }
}
