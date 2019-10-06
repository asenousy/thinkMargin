export default function calculatePrice(args: any): any {
  let { vat, cost, profit, margin } = args;
  vat = +vat;
  cost = +cost;
  profit = +profit;
  margin = +margin;

  profit = Number.isNaN(profit)
    ? ((margin / 100) * cost) / (1 - margin / 100)
    : profit;
  margin = Number.isNaN(margin) ? (profit / (cost + profit)) * 100 : margin;

  const priceExcVAT =
    profit !== undefined ? cost + profit : profit / (margin / 100);
  const priceIncVAT = priceExcVAT + (priceExcVAT * vat) / 100;

  return { vat, cost, profit, margin, priceExcVAT, priceIncVAT };
}
