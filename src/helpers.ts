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

export const LocaleParser = (
  groupSeperator: string,
  decimalSeperator: string
) => {
  const groupRegex = new RegExp("\\" + groupSeperator, "g");
  const decimalRegex = new RegExp("\\" + decimalSeperator, "g");
  return (value: string) =>
    Number(value.replace(groupRegex, "").replace(decimalRegex, "."));
};

// const groupFormat = (num: string, seperator: string) => {
//   const reversed = num.split("").reverse();
//   const grouped = [];
//   for (let i = 0; i < reversed.length; i++) {
//     const sep = (i + 1) % 3 === 0 && i < reversed.length - 1 ? seperator : "";
//     grouped.push(sep + reversed[i]);
//   }
//   return grouped.reverse().join("");
// };

// const groupFormat = (num: string, seperator: string) => {
//   let group = "";
//   for (let i = num.length - 1; i >= 0; i--) {
//     const digit = i && (num.length - i) % 3 === 0 ? seperator + num[i] : num[i];
//     group = digit + group;
//   }
//   return group;
// };

export const LocaleFormatter = (
  groupSeperator: string = ",",
  decimalSeperator: string = "."
) => (
  input: number,
  percentage: boolean = false,
  useGrouping: boolean = true
) => {
  const value = isNaN(input) ? 0 : input;
  const inputFixed = value.toFixed(2);
  const [whole, fraction] = inputFixed.split(".");

  const wholeFormatted = useGrouping
    ? whole.replace(/\B(?=(\d{3})+(?!\d))/g, groupSeperator)
    : whole;

  const fractionFormatted =
    fraction === "00" && percentage ? "" : decimalSeperator + fraction;

  return wholeFormatted + fractionFormatted;
};
