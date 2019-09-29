type Base = { vat: number };

type WithPriceExcVATAndMargin = Base & {
  margin: number;
  priceExcVAT: number;
};

type WithPriceIncVATAndMargin = Base & {
  margin: number;
  priceIncVAT: number;
};

type WithProfitAndPriceExcVAT = Base & {
  profit: number;
  priceExcVAT: number;
};

type WithProfitAndPriceIncVAT = Base & {
  profit: number;
  priceIncVAT: number;
};

type partFigures =
  | WithPriceExcVATAndMargin
  | WithPriceIncVATAndMargin
  | WithProfitAndPriceExcVAT
  | WithProfitAndPriceIncVAT;

type fullFigures = WithPriceExcVATAndMargin &
  WithProfitAndPriceIncVAT & {
    cost: number;
  };

export default function calculateMargin(args: partFigures): fullFigures {
  const { vat } = args;
  let { priceExcVAT, priceIncVAT, margin, profit } = args;

  priceExcVAT =
    priceExcVAT === undefined ? (100 * priceIncVAT) / (100 + vat) : priceExcVAT;

  priceIncVAT =
    priceIncVAT === undefined
      ? priceExcVAT + (priceExcVAT * vat) / 100
      : priceIncVAT;

  profit = profit === undefined ? (priceExcVAT * margin) / 100 : profit;

  margin = margin === undefined ? (profit / priceExcVAT) * 100 : margin;

  const cost = priceExcVAT - profit;

  return { vat, cost, profit, margin, priceExcVAT, priceIncVAT };
}
