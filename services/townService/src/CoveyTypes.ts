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
  // The total number of seconds in the video.
  length: number;
  // The number of seconds that have passed since the video has begun.
  elapsed: number;
  // Whether or not the video is currently paused.
  isPaused: boolean;
};
