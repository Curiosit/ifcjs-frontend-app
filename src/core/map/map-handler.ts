import { User } from "firebase/auth";
import { MapScene } from "./map-scene";
import { Events } from "../../middleware/event-handler";

export const mapHandler = {
  viewer: null as MapScene | null,

  async start(container: HTMLDivElement, user: User, events: Events) {
    if (!this.viewer) {
      console.log(container);
      this.viewer = new MapScene(container, events);
      await this.viewer.getAllBuildings(user); 
    }
  },

  remove() {
    if (this.viewer) {
      console.log("Hei");
      this.viewer.dispose();
      this.viewer = null;
    }
  },


  addBuilding(user: User) {
    console.log("Adding building");
    if(this.viewer) {
      this.viewer.addBuilding(user);
    }
  }
};
