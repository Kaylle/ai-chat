export interface Message {
  content: string;
  role: string;
  created: number;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  isPinned: boolean;
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