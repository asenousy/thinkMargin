import calculateCost from "./calculateCost";

describe("cost calculator", () => {
  it("should calculate cost when vat, priceExcVAT and profit are given", () => {
    const input = { vat: 20, profit: 15, priceExcVAT: 25 };
    expect(calculateCost(input)).toEqual({
      ...input,
      priceIncVAT: 30,
      margin: 60,
      cost: 10
    });
  });

  it("should calculate cost when vat, priceIncVAT and profit are given", () => {
    const input = { vat: 20, profit: 15, priceIncVAT: 30 };
    expect(calculateCost(input)).toEqual({
      ...input,
      priceExcVAT: 25,
      margin: 60,
      cost: 10
    });
  });

  it("should calculate cost when vat, priceExcVAT and margin are given", () => {
    const input = { vat: 20, margin: 60, priceExcVAT: 25 };
    expect(calculateCost(input)).toEqual({
      ...input,
      priceIncVAT: 30,
      profit: 15,
      cost: 10
    });
  });

  it("should calculate cost when vat, priceIncVAT and margin are given", () => {
    const input = { vat: 20, margin: 60, priceIncVAT: 30 };
    expect(calculateCost(input)).toEqual({
      ...input,
      priceExcVAT: 25,
      profit: 15,
      cost: 10
    });
  });
});
