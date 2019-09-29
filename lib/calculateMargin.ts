type WithPriceExc = {
  vat: number;
  cost: number;
  priceIncVAT?: number;
  priceExcVAT: number;
};

type WithPriceInc = {
  vat: number;
  cost: number;
  priceIncVAT: number;
  priceExcVAT?: number;
};

type Figures = WithPriceExc | WithPriceInc;

type Prices = WithPriceExc &
  WithPriceInc & {
    profit: number;
    margin: number;
  };

export default function calculateMargin(args: Figures): Prices {
  const { vat, cost } = args;
  let { priceExcVAT, priceIncVAT } = args;

  priceExcVAT =
    priceExcVAT === undefined ? (100 * priceIncVAT) / (100 + vat) : priceExcVAT;

  priceIncVAT =
    priceIncVAT === undefined
      ? priceExcVAT + (priceExcVAT * vat) / 100
      : priceIncVAT;

  const profit = priceExcVAT - cost;
  const margin = (profit / priceExcVAT) * 100;

  return { vat, cost, profit, margin, priceExcVAT, priceIncVAT };
}
