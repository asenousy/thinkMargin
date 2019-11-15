import { Segment, Figure } from "./reducer";

export type Action = {
  type: ActionTypes;
  payload?: any;
};

export enum ActionTypes {
  UPDATE_SEGMENT = "UPDATE_SEGMENT",
  RESET = "RESET",
  RESET_ALL = "RESET_ALL",
  UPDATE = "UPDATE",
  CROP = "CROP",
  FORMAT = "FORMAT",
  CALCULATE_PRICE = "CALCULATE_PRICE",
  CALCULATE_MARGIN = "CALCULATE_MARGIN",
  CALCULATE_COST = "CALCULATE_COST"
}

export const calculate = (name: string) => ({
  type: ActionTypes[`CALCULATE_${name.replace("Page", "").toUpperCase()}`]
});
export const updateSegment = (payload: Segment) => ({
  type: ActionTypes.UPDATE_SEGMENT,
  payload
});
export const reset = (payload: string) => ({
  type: ActionTypes.RESET,
  payload
});
export const updateFigure = (payload: Figure) => ({
  type: ActionTypes.UPDATE,
  payload
});
export const crop = (payload: string) => ({
  type: ActionTypes.CROP,
  payload
});
export const format = (payload: string) => ({
  type: ActionTypes.FORMAT,
  payload
});
export const resetAll = () => ({ type: ActionTypes.RESET_ALL });
