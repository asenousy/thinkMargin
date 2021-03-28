import { Dimensions } from "react-native";
import { heightBreakPoint } from "../configs.json";

const { height } = Dimensions.get("window");

let scaleFactor = 1.15;
if (height < heightBreakPoint.small) scaleFactor = 1;
if (height < heightBreakPoint.xSmall) scaleFactor = 0.9;
if (height < heightBreakPoint.xxSmall) scaleFactor = 0.8;
if (height > heightBreakPoint.large) scaleFactor = 1.4;
if (height > heightBreakPoint.xLarge) scaleFactor = 1.8;

function scaleUp(styles) {
  return Object.entries(styles)
    .map(([key, value]) => ({
      [key]:
        typeof value === "object"
          ? scaleUp(value)
          : typeof value === "number" && key !== "flex"
          ? value * scaleFactor
          : value,
    }))
    .reduce((newStyles, style) => ({ ...newStyles, ...style }), {});
}

export const responsive = (styles) => {
  if (typeof styles === "number") return styles * scaleFactor;
  return scaleUp(styles);
};
