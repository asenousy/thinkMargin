jest.mock("expo-localization", () => ({}));
import { reducer, numberify, StoreState, Figure } from "./reducer";
import {
  updateSegment,
  resetAll,
  updateFigure,
  crop,
  calculate,
  format as formatAction,
} from "./actions";

(global as any).__DEV__ = true;

test("numberify", () => {
  expect(numberify({ cost: "10", price: "15.64" } as Figure)).toEqual({
    cost: 10,
    price: 15.64,
  });
});

test("UPDATE_SEGMENT", () => {
  const state = { marginSegment: 0, priceSegment: 0 } as StoreState;
  expect(reducer(state, updateSegment({ marginSegment: 1 }))).toEqual({
    marginSegment: 1,
    priceSegment: 0,
  });
  expect(reducer(state, updateSegment({ priceSegment: 1 }))).toEqual({
    marginSegment: 0,
    priceSegment: 1,
  });
});

test("RESET_ALL", () => {
  const state = { figures: { cost: "20", margin: "20" } } as StoreState;
  expect(reducer(state, resetAll())).toEqual({
    figures: { cost: "", margin: "" },
  });
});

test("UPDATE_FIGURE", () => {
  const state = { figures: { cost: "20", margin: "20" } } as StoreState;
  expect(reducer(state, updateFigure({ margin: "5" }))).toEqual({
    figures: { cost: "20", margin: "5" },
  });
});

test("CROP", () => {
  const state = { figures: { cost: "20", margin: "20.00" } } as StoreState;
  expect(reducer(state, crop("margin"))).toEqual({
    figures: { cost: "20", margin: "20" },
  });
});

test("FORMAT", () => {
  const state = { figures: { cost: "20", margin: "20" } } as StoreState;
  expect(reducer(state, formatAction("margin"))).toEqual({
    figures: { cost: "20", margin: "20" },
  });
});

test("CALCULATE_PRICE", () => {
  const figures = { vat: "20", cost: "10" };

  expect(
    reducer(
      {
        marginSegment: 0,
        figures: { ...figures, margin: "40" },
      } as StoreState,
      calculate("PRICE")
    )
  ).toMatchObject({
    figures: {
      vat: "20",
      cost: "10.00",
      margin: "40",
      profit: "6.67",
      priceExcVAT: "16.67",
      priceIncVAT: "20.00",
    },
  });

  expect(
    reducer(
      { marginSegment: 0, figures: { ...figures, margin: "60" } } as StoreState,
      calculate("PRICE")
    )
  ).toMatchObject({
    figures: {
      vat: "20",
      cost: "10.00",
      margin: "60",
      profit: "15.00",
      priceExcVAT: "25.00",
      priceIncVAT: "30.00",
    },
  });

  expect(
    reducer(
      { marginSegment: 1, figures: { ...figures, profit: "10" } } as StoreState,
      calculate("PRICE")
    )
  ).toMatchObject({
    figures: {
      vat: "20",
      cost: "10.00",
      margin: "50",
      profit: "10.00",
      priceExcVAT: "20.00",
      priceIncVAT: "24.00",
    },
  });
});

test("CALCULATE_MARGIN", () => {
  const figures = { vat: "20", cost: "10" };

  expect(
    reducer(
      {
        priceSegment: 0,
        figures: { ...figures, priceExcVAT: "24" },
      } as StoreState,
      calculate("MARGIN")
    )
  ).toMatchObject({
    figures: {
      vat: "20",
      cost: "10.00",
      margin: "58.33",
      profit: "14.00",
      priceExcVAT: "24.00",
      priceIncVAT: "28.80",
    },
  });

  expect(
    reducer(
      {
        priceSegment: 1,
        figures: { ...figures, priceIncVAT: "20" },
      } as StoreState,
      calculate("MARGIN")
    )
  ).toMatchObject({
    figures: {
      vat: "20",
      cost: "10.00",
      margin: "40",
      profit: "6.67",
      priceExcVAT: "16.67",
      priceIncVAT: "20.00",
    },
  });
});

test("CALCULATE_COST", () => {
  const figures = { vat: "20" };
  expect(
    reducer(
      {
        priceSegment: 0,
        marginSegment: 0,
        figures: { ...figures, margin: "50", priceExcVAT: "24" },
      } as StoreState,
      calculate("COST")
    )
  ).toMatchObject({
    figures: {
      vat: "20",
      cost: "12.00",
      margin: "50",
      profit: "12.00",
      priceExcVAT: "24.00",
      priceIncVAT: "28.80",
    },
  });

  expect(
    reducer(
      {
        priceSegment: 1,
        marginSegment: 0,
        figures: { ...figures, margin: "50", priceIncVAT: "24" },
      } as StoreState,
      calculate("COST")
    )
  ).toMatchObject({
    figures: {
      vat: "20",
      cost: "10.00",
      margin: "50",
      profit: "10.00",
      priceExcVAT: "20.00",
      priceIncVAT: "24.00",
    },
  });

  expect(
    reducer(
      {
        priceSegment: 0,
        marginSegment: 1,
        figures: { ...figures, priceExcVAT: "20", profit: "10" },
      } as StoreState,
      calculate("COST")
    )
  ).toMatchObject({
    figures: {
      vat: "20",
      cost: "10.00",
      margin: "50",
      profit: "10.00",
      priceExcVAT: "20.00",
      priceIncVAT: "24.00",
    },
  });

  expect(
    reducer(
      {
        priceSegment: 1,
        marginSegment: 1,
        figures: { ...figures, priceIncVAT: "24", profit: "10" },
      } as StoreState,
      calculate("COST")
    )
  ).toMatchObject({
    figures: {
      vat: "20",
      cost: "10.00",
      margin: "50",
      profit: "10.00",
      priceExcVAT: "20.00",
      priceIncVAT: "24.00",
    },
  });
});
