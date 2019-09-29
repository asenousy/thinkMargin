import calculateMargin from "./calculateMargin";

describe("margin calculator", () => {
  it("is should calculate margin when vat, cost and priceExcVAT are given", () => {
    const input = { vat: 20, cost: 10, priceExcVAT: 25 };
    expect(calculateMargin(input)).toEqual({
      ...input,
      priceIncVAT: 30,
      margin: 60,
      profit: 15
    });
  });

  it("is should calculate price when vat, cost and priceIncVAT are given", () => {
    const input = { vat: 20, cost: 10, priceIncVAT: 30 };
    expect(calculateMargin(input)).toEqual({
      ...input,
      priceExcVAT: 25,
      margin: 60,
      profit: 15
    });
  });
});
