import { StringLiteral } from "typescript";

export interface GisParameters {
  container: HTMLDivElement;
  accessToken: string;
  zoom: number;
  center: [number, number];
  pitch: number;
  bearing: number;
  buildings: Building[];
}

export interface Building {
  id: string;
  lat: number;
  lng: number;
  userID: string;
  buildingName: string;
  models: Model[];
}

export interface Model {
  name: string;
  id: string;

}

export interface LngLat {
  lng: number;
  lat: number;
}

export interface Tool {
  name: string;
  active: boolean;
  icon: any;
  action: (...args: any) => void;
}
