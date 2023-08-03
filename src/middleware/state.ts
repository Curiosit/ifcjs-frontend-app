
import { Building } from "../core/map/types";

import { Floorplan, Property } from "../core/map/types";
import { User } from "firebase/auth";


export interface State {
  user: User | null;
  building: Building | null;
  floorplans: Floorplan[];
  properties: Property[];
}

export const initialState: State = {
  user: null,
  building: null,
  floorplans: [],
  properties: [],
};
