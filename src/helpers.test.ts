jest.mock("react-native", () => ({
  Dimensions: { get: () => ({ height: 1100 }) }
}));

import { responsive } from "./helpers";

test("responsive", () => {
  const style = { container: { color: "yellow", width: 10 } };
  expect(responsive(style)).toEqual({
    container: { color: "yellow", width: 14 }
  });
  expect(responsive(20)).toBe(28);
});
