jest.mock("react-native", () => ({
  Dimensions: { get: () => ({ height: 1100 }) },
}));

import { responsive, LocaleParser, LocaleFormatter } from "./helpers";

test("responsive", () => {
  const style = { container: { color: "yellow", width: 10 } };
  expect(responsive(style)).toEqual({
    container: { color: "yellow", width: 14 },
  });
  expect(responsive(20)).toBe(28);
});

test("Parser", () => {
  expect(LocaleParser(",", ".")(Number(5000.55).toLocaleString("en"))).toBe(
    5000.55
  );
  expect(LocaleParser(",", ".")(Number(5000000.55).toLocaleString("en"))).toBe(
    5000000.55
  );
  expect(LocaleParser(".", ",")(Number(5000.55).toLocaleString("de"))).toBe(
    5000.55
  );
  expect(LocaleParser("’", ",")(Number(5000.55).toLocaleString("de-ch"))).toBe(
    5000.55
  );
  expect(LocaleParser("’", ",")("a")).toBe(NaN);
});

test("Formatter", () => {
  expect(LocaleFormatter(",", ".")(50)).toBe("50.00");
  expect(LocaleFormatter(",", ".")(500.15)).toBe("500.15");
  expect(LocaleFormatter(",", ".")(5000.15)).toBe("5,000.15");
  expect(LocaleFormatter(",", ".")(50000.15)).toBe("50,000.15");
  expect(LocaleFormatter(",", ".")(500000.15)).toBe("500,000.15");
  expect(LocaleFormatter(",", ".")(5000000.15)).toBe("5,000,000.15");
  expect(LocaleFormatter(",", ".")(5000000)).toBe("5,000,000.00");

  expect(LocaleFormatter(".", ",")(5000000.15)).toBe("5.000.000,15");
  expect(LocaleFormatter(" ", ",")(5000000.15)).toBe("5 000 000,15");
  expect(LocaleFormatter("'", ",")(5000000.15)).toBe("5'000'000,15");

  expect(LocaleFormatter(".", ",")(5000000.111)).toBe("5.000.000,11");
  expect(LocaleFormatter(".", ",")(5000000.115)).toBe("5.000.000,12");

  expect(LocaleFormatter(".", ",")(5000000)).toBe("5.000.000,00");
  expect(LocaleFormatter(".", ",")(5000000, true)).toBe("5.000.000");

  expect(LocaleFormatter(".", ",")(5000000.115, false, false)).toBe(
    "5000000,12"
  );

  expect(LocaleFormatter(",", ".")("a")).toBe("0.00");
  expect(LocaleFormatter(",", ".")("a", true)).toBe("0");
});
