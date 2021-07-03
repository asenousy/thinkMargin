jest.mock("react-native", () => ({
  Dimensions: { get: () => ({ height: 1100 }) },
}));

import { responsive, LocaleParser } from "./helpers";

test("responsive", () => {
  const style = { container: { color: "yellow", width: 10 } };
  expect(responsive(style)).toEqual({
    container: { color: "yellow", width: 14 },
  });
  expect(responsive(20)).toBe(28);
});

test("Parser should parse", () => {
  expect(LocaleParser("en")(Number(5000.55).toLocaleString("en"))).toEqual(
    5000.55
  );
  expect(LocaleParser("en")(Number(5000000.55).toLocaleString("en"))).toEqual(
    5000000.55
  );
  expect(LocaleParser("de")(Number(5000.55).toLocaleString("de"))).toEqual(
    5000.55
  );
  expect(LocaleParser("fr")(Number(5000.55).toLocaleString("fr"))).toEqual(
    5000.55
  );
});
