export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  isError?: boolean;
  sources?: Array<{
    title: string;
    uri: string;
  }>;
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}