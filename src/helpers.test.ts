jest.mock("react-native", () => ({
  Dimensions: { get: () => ({ height: 1001 }) }
}));

import { responsive } from "./helpers";

test("responsive", () => {
  const style = { container: { color: "yellow", width: 10 } };
  expect(responsive(style)).toEqual({
    container: { color: "yellow", width: 20 }
  });
  expect(responsive(20)).toBe(40);
});
