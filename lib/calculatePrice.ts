type Base = { vat: number; cost: number };

type WithMargin = Base & {
  margin: number;
};

type WithProfit = Base & {
  profit: number;
};

type Figures = WithMargin | WithProfit;

type Prices = WithMargin &
  WithProfit & {
    priceExcVAT: number;
    priceIncVAT: number;
  };

export default function calculatePrice(args: Figures): Prices {
  const { vat, cost } = args;
  let { profit, margin } = args;

  profit =
    profit === undefined
      ? ((margin / 100) * cost) / (1 - margin / 100)
      : profit;
  margin = margin === undefined ? (profit / (cost + profit)) * 100 : margin;

  const priceExcVAT =
    profit !== undefined ? cost + profit : profit / (margin / 100);
  const priceIncVAT = priceExcVAT + (priceExcVAT * vat) / 100;

  return { vat, cost, profit, margin, priceExcVAT, priceIncVAT };
}
