export type Direction = 'front' | 'back' | 'left' | 'right';
export type UserLocation = {
  x: number;
  y: number;
  rotation: Direction;
  moving: boolean;
  conversationLabel?: string;
};
export type CoveyTownList = { friendlyName: string; coveyTownID: string; currentOccupancy: number; maximumOccupancy: number }[];

export type ChatMessage = {
  author: string;
  sid: string;
  body: string;
  dateCreated: Date;
};

/**
 * VideoStatus represents the state of a video.
 */
export type VideoStatus = {
  // The URL of the video.
  url: string;
  // The timestamp of the video, in the format "HH:MM:SS".
  timestamp: string;
  // Whether or not the video is currently paused.
  isPaused: boolean;
};
