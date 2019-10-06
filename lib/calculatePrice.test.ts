import calculatePrice from "./calculatePrice";

describe("price calculator", () => {
  it("it should calculate price when vat, cost and profit are given", () => {
    const input = { vat: 20, cost: 10, profit: 10 };
    expect(calculatePrice(input)).toEqual({
      ...input,
      margin: 50,
      priceExcVAT: 20,
      priceIncVAT: 24
    });
    const stringInput = { vat: "20", cost: "10", profit: "10" };
    expect(calculatePrice(stringInput)).toEqual({
      ...input,
      margin: 50,
      priceExcVAT: 20,
      priceIncVAT: 24
    });
  });
  it("it should calculate price when vat, cost and margin are given", () => {
    const input = { vat: 20, cost: 10, margin: 60 };
    expect(calculatePrice(input)).toEqual({
      ...input,
      profit: 15,
      priceExcVAT: 25,
      priceIncVAT: 30
    });
    const stringInput = { vat: "20", cost: "10", margin: "60" };
    expect(calculatePrice(stringInput)).toEqual({
      ...input,
      profit: 15,
      priceExcVAT: 25,
      priceIncVAT: 30
    });
  });
});
