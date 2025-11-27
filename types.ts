export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface PlaceSource {
  title: string;
  uri: string;
}

export interface AttractionResult {
  text: string;
  places: PlaceSource[];
}

export enum ViewState {
  HOME = 'HOME',
  ATTRACTIONS = 'ATTRACTIONS',
  TRANSPORT = 'TRANSPORT'
}
