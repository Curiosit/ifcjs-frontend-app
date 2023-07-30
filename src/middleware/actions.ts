export type ActionType =
  | "LOGIN"
  | "LOGOUT"
  | "UPDATE_USER"
  | "START_MAP"
  | "REMOVE_MAP"
  | "ADD_BUILDING"
  | "OPEN_BUILDING"
  | "CLOSE_BUILDING";

export interface Action {
  type: ActionType;
  payload?: any;
}
