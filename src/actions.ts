import { Segment, Figure } from "./reducer";
import { PageType } from "./components/pages/PageContainer";

export type Action = {
  type: ActionTypes;
  payload?: any;
};

export enum ActionTypes {
  UPDATE_SEGMENT = "UPDATE_SEGMENT",
  RESET_ALL = "RESET_ALL",
  TOGGLE_FEEDBACK = "TOGGLE_FEEDBACK",
  UPDATE_FIGURE = "UPDATE_FIGURE",
  CROP = "CROP",
  FORMAT = "FORMAT",
  CALCULATE_PRICE = "CALCULATE_PRICE",
  CALCULATE_MARGIN = "CALCULATE_MARGIN",
  CALCULATE_COST = "CALCULATE_COST",
}

export const calculate = (type: PageType) => ({
  type: ActionTypes[`CALCULATE_${type}`],
});
export const updateSegment = (payload: Segment) => ({
  type: ActionTypes.UPDATE_SEGMENT,
  payload,
});
export const updateFigure = (payload: Figure) => ({
  type: ActionTypes.UPDATE_FIGURE,
  payload,
});
export const crop = (payload: string) => ({
  type: ActionTypes.CROP,
  payload,
});
export const format = (payload: string) => ({
  type: ActionTypes.FORMAT,
  payload,
});
export const resetAll = () => ({ type: ActionTypes.RESET_ALL });
export const toggleFeedback = () => ({ type: ActionTypes.TOGGLE_FEEDBACK });
