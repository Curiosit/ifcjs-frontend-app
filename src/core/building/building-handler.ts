import { Events } from "../../middleware/event-handler";
import { Building, Floorplan } from "../map/types";
import { BuildingScene } from "./building-scene";

export const buildingHandler = {
  viewer: null as BuildingScene | null,

  async start(container: HTMLDivElement, building:Building, events: Events) {
    if (!this.viewer) {
      this.viewer = new BuildingScene(container, building, events);
    }
  },

  remove() {
    if (this.viewer) {
      console.log("building disposed!");
      this.viewer.dispose();
      this.viewer = null;
    }
  },

  async convertIfcToFragments(ifc: File) {
    if (!this.viewer) {
      throw new Error("Building viewer not active!");
    }
    return this.viewer.convertIfcToFragments(ifc);
  },

   async deleteModels(id:string[]) {
    if(this.viewer) {
       await this.viewer.database.deleteModels(id);
    }
   },

   async refreshModels(building:Building, events: Events) {
    if(this.viewer){
      const container = this.viewer.container;
      this.viewer.dispose();
      this.viewer = null;
      this.viewer = new BuildingScene(container, building, events);
    }
   },
   explode(active: boolean) {
    if (this.viewer) {
      this.viewer.explode(active);
    }
  },
  toggleFloorplan(active: boolean, floorplan?: Floorplan) {
    if (this.viewer) {
      console.log(floorplan);
      this.viewer.toggleFloorplan(active, floorplan);
    }
  },
};