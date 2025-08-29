export interface Message {
  text: string;
  type: string;
}

export interface Config {
  theme?: string;
  radius: number;
}

export type Color =
  | 'zinc'
  | 'red'
  | 'rose'
  | 'orange'
  | 'blue'
  | 'violet';

export interface Theme {
  name: Color;
  color: string;
}