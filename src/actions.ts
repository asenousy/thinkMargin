export type Action = {
  type: ActionTypes;
  payload?: any;
};

export enum ActionTypes {
  UPDATE_PRICE_SEGMENT = "UPDATE_PRICE_SEGMENT",
  UPDATE_MARGIN_SEGMENT = "UPDATE_MARGIN_SEGMENT",
  RESET = "RESET",
  RESET_ALL = "RESET_ALL",
  UPDATE = "UPDATE",
  CROP = "CROP",
  FORMAT = "FORMAT",
  CALCULATE_PRICE = "CALCULATE_PRICE",
  CALCULATE_MARGIN = "CALCULATE_MARGIN",
  CALCULATE_COST = "CALCULATE_COST"
}

export const updatePriceSegment = (payload: number) => ({
  type: ActionTypes.UPDATE_PRICE_SEGMENT,
  payload
});
export const updateMarginSegment = (payload: number) => ({
  type: ActionTypes.UPDATE_MARGIN_SEGMENT,
  payload
});
export const reset = (payload: string) => ({
  type: ActionTypes.RESET,
  payload
});
export const update = (payload: { [key: string]: string }) => ({
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
export const calculatePrice = () => ({ type: ActionTypes.CALCULATE_PRICE });
export const calculateMargin = () => ({ type: ActionTypes.CALCULATE_MARGIN });
export const calculateCost = () => ({ type: ActionTypes.CALCULATE_COST });
