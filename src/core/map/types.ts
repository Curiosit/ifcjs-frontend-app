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
  
}

export interface LngLat {
  lng: number;
  lat: number;
}
