import { mapHandler } from "../core/map/map-handler";
import { databaseHandler } from "../core/db/db-handler";
import { Action } from "./actions";
import { Events } from "./event-handler";

export const executeCore = (action: Action, events: Events) => {
  if (action.type === "LOGIN") {
    return databaseHandler.login();
  }
  if (action.type === "LOGOUT") {
    return databaseHandler.logout();
  }
  if (action.type === "START_MAP") {
    const {user, container} = action.payload;
    return mapHandler.start(container, user, events);
  }
  if (action.type === "REMOVE_MAP") {
    return mapHandler.remove();
  }
  if (action.type === "ADD_BUILDING") {
    return mapHandler.addBuilding(action.payload);
  }
  if (action.type === "DELETE_BUILDING") {

    return databaseHandler.deleteBuilding(action.payload, events);
  }
  if (action.type === "UPDATE_BUILDING") {
    return databaseHandler.updateBuilding(action.payload);
  }
  if (action.type === "UPLOAD_MODEL") {
    const {model,file,building} = action.payload;
    return databaseHandler.uploadModel(model,file,building, events);
  }
  if (action.type === "DELETE_MODEL") {
    
    const {model,building} = action.payload;
    console.log(building);
    console.log(model);
    return databaseHandler.deleteModel(model,building, events);
  }
};

