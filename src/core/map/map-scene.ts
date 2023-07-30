import * as THREE from "three";
import * as OBC from "openbim-components";
import * as MAPBOX from "mapbox-gl";
import { Building, GisParameters, LngLat } from "./types";
import { MAPBOX_KEY } from "../../config";
import { User } from "firebase/auth";
import { AnyAaaaRecord } from "dns";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer";

export class MapScene {
  private components = new OBC.Components();
  private readonly style = "mapbox://styles/mapbox/light-v10";
  private clickedCoordinates: LngLat = { lat: 0, lng: 0};
  private center: LngLat = {lat: 0, lng: 0 };
  private map: MAPBOX.Map;
  private labels: {[id: string]: CSS2DObject} = {};



  constructor(container: HTMLDivElement) {
    const config = this.getConfig(container);
    this.map = this.createMap(config);
    this.initializeComponent(config);
    this.createScene();
  }

  dispose() {
    this.components.dispose();
    (this.map as any) = null;
    (this.components as any) = null;
    for(const id in this.labels) {
      const label = this.labels[id];
      label.removeFromParent();
      label.element.remove();
    }
    this.labels = {};
  }

  

  private createHtmlElement() {
    const div = document.createElement("div");
    div.textContent = "🏢";
    div.classList.add("thumbnail");
    return div;

  }
  async addBuilding(user: User) {
    const {lat, lng} = this.clickedCoordinates;
    console.log ({lat, lng});
    const userID = user.uid;
    const building = {userID, lat, lng, id: "" };
    console.log(building);
    this.addToScene([building]);
  }

  private addToScene(buildings: Building[]) {
    for (const building of buildings) {
      const {id, lng, lat} = building;
      const htmlElement = this.createHtmlElement();
      const label = new CSS2DObject(htmlElement);

      const center = MAPBOX.MercatorCoordinate.fromLngLat(
        { ...this.center},
        0
      );

      const units = center.meterInMercatorCoordinateUnits();
      const model = MAPBOX.MercatorCoordinate.fromLngLat({lng,lat}, 0);
      model.x /= units;
      model.y /= units;

      center.x /= units;
      center.y /= units;

      label.position.set(model.x - center.x, 0, model.y - center.y);

      this.components.scene.get().add(label);
      this.labels[id] = label;
    }
  }


  private initializeComponent(config: GisParameters) {
    this.components.scene = new OBC.SimpleScene(this.components);
    this.components.camera = new OBC.MapboxCamera();
    this.components.renderer = this.createRenderer(config);
    this.components.init();
  }

  private getCoordinates(config: GisParameters) {
    const merc = MAPBOX.MercatorCoordinate;
    return merc.fromLngLat(config.center, 0);
  }

  private createRenderer(config: GisParameters) {
    
    const coords = this.getCoordinates(config);
    return new OBC.MapboxRenderer(this.components, this.map, coords);
  }

  private createMap(config: GisParameters) {
    const map=  new MAPBOX.Map({
      ...config,
      style: this.style,
      antialias: true,
    });
    map.on("contextmenu", this.storeMousePosition);
    return map;
  }

  private storeMousePosition = (event: MAPBOX.MapMouseEvent) => {
    this.clickedCoordinates = {...event.lngLat};
  }


  private createScene() {
    const scene = this.components.scene.get();
    scene.background = null;
    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(0, -70, 100).normalize();
    scene.add(directionalLight);
    const directionalLight2 = new THREE.DirectionalLight(0xffffff);
    directionalLight2.position.set(0, 70, 100).normalize();
    scene.add(directionalLight2);
  }

  private getConfig(container: HTMLDivElement) {
    const center = [7.730277288470006, 63.110047455818375] as [number, number];
    this.center = { lng: center[0], lat: center[1] };
    return {
      container,
      accessToken: MAPBOX_KEY,
      zoom: 15.35,
      pitch: 60,
      bearing: -40,
      center,
      buildings: [],
    };
  }
}
