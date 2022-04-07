import { Socket } from 'socket.io-client';
import { UserLocation } from './classes/Player';
import TownsServiceClient from './classes/TownsServiceClient';

export type CoveyEvent = 'playerMoved' | 'playerAdded' | 'playerRemoved';

export type VideoRoom = {
  twilioID: string,
  id: string
};
export type UserProfile = {
  displayName: string,
  id: string
};
export type CoveyAppState = {
  sessionToken: string,
  userName: string,
  currentTownFriendlyName: string,
  currentTownID: string,
  currentTownIsPubliclyListed: boolean,
  myPlayerID: string,
  emitMovement: (location: UserLocation) => void,
  socket: Socket | null,
  apiClient: TownsServiceClient
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
