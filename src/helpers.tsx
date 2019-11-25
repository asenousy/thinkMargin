import { Dimensions } from "react-native";
import { heightBreakPoint } from "../configs.json";

const SCALE_FACTOR = 2;

const { height } = Dimensions.get("window");
const isLarge = height > heightBreakPoint;

function scaleUp(styles) {
  return Object.entries(styles)
    .map(([key, value]) => ({
      [key]:
        typeof value === "object"
          ? scaleUp(value)
          : typeof value === "number"
          ? value * SCALE_FACTOR
          : value
    }))
    .reduce((newStyles, style) => ({ ...newStyles, ...style }), {});
}

export const responsive = styles => {
  if (!isLarge) return styles;
  if (typeof styles === "number") return styles * SCALE_FACTOR;
  return scaleUp(styles);
};
