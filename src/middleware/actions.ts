export const ActionList= [
  "LOGIN",
  "LOGOUT",
  "UPDATE_USER",
  "START_MAP",
  "REMOVE_MAP",
  "ADD_BUILDING",
  "OPEN_BUILDING",
  "CLOSE_BUILDING",
  "UPDATE_BUILDING",
  "DELETE_BUILDING",
  "UPLOAD_MODEL",
  "DELETE_MODEL",
] as const;
type ActionListType = typeof ActionList;
export type ActionType = ActionListType[number];

export interface Action {
  type: ActionType;
  payload?: any;
}
