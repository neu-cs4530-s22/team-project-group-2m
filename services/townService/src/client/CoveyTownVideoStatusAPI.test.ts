import CORS from 'cors';
import Express from 'express';
import http from 'http';
import { nanoid } from 'nanoid';
import { AddressInfo } from 'net';
import { mock, mockReset } from 'jest-mock-extended';
import CoveyTownController from '../lib/CoveyTownController';
import CoveyTownsStore from '../lib/CoveyTownsStore';
import addTownRoutes from '../router/towns';
import * as requestHandlers from '../requestHandlers/CoveyTownRequestHandlers';
import { createVideoStatusForTesting } from './TestUtils';
import TownsServiceClient from './TownsServiceClient';
import { VideoStatus } from '../CoveyTypes';

type TestTownData = {
  friendlyName: string;
  coveyTownID: string;
  isPubliclyListed: boolean;
  townUpdatePassword: string;
};

describe('Video Status API', () => {
  let server: http.Server;
  let apiClient: TownsServiceClient;

  async function createTownForTesting(
    friendlyNameToUse?: string,
    isPublic = false,
  ): Promise<TestTownData> {
    const friendlyName =
      friendlyNameToUse !== undefined
        ? friendlyNameToUse
        : `${isPublic ? 'Public' : 'Private'}TestingTown=${nanoid()}`;
    const ret = await apiClient.createTown({
      friendlyName,
      isPubliclyListed: isPublic,
    });
    return {
      friendlyName,
      isPubliclyListed: isPublic,
      coveyTownID: ret.coveyTownID,
      townUpdatePassword: ret.coveyTownPassword,
    };
  }

  beforeAll(async () => {
    const app = Express();
    app.use(CORS());
    server = http.createServer(app);

    addTownRoutes(server, app);
    await server.listen();
    const address = server.address() as AddressInfo;

    apiClient = new TownsServiceClient(`http://127.0.0.1:${address.port}`);
  });
  afterAll(async () => {
    await server.close();
  });
  it('Executes without error when creating a new video status and retrieving that video status', async () => {
    const testingTown = await createTownForTesting(undefined, true);
    const testingSession = await apiClient.joinTown({
      userName: nanoid(),
      coveyTownID: testingTown.coveyTownID,
    });
    await apiClient.updateVideoStatus({
      videoStatus: createVideoStatusForTesting({
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        length: 232,
        elapsed: 0,
        isPaused: false,
      }),
      coveyTownID: testingTown.coveyTownID,
      sessionToken: testingSession.coveySessionToken,
    });
  });
});
describe('videoStatusUpdateHandler', () => {

  const mockCoveyTownStore = mock<CoveyTownsStore>();
  const mockCoveyTownController = mock<CoveyTownController>();
  beforeAll(() => {
    // Set up a spy for CoveyTownsStore that will always return our mockCoveyTownsStore as the singleton instance
    jest.spyOn(CoveyTownsStore, 'getInstance').mockReturnValue(mockCoveyTownStore);
  });
  beforeEach(() => {
    // Reset all mock calls, and ensure that getControllerForTown will always return the same mock controller
    mockReset(mockCoveyTownController);
    mockReset(mockCoveyTownStore);
    mockCoveyTownStore.getControllerForTown.mockReturnValue(mockCoveyTownController);
  });
  it('Checks for a valid session token before updating a video status', ()=>{
    const coveyTownID = nanoid();
    const videoStatus: VideoStatus = createVideoStatusForTesting();
    const invalidSessionToken = nanoid();

    // Make sure to return 'undefined' regardless of what session token is passed
    mockCoveyTownController.getSessionByToken.mockReturnValueOnce(undefined);

    requestHandlers.videoStatusUpdateHandler({
      videoStatus,
      coveyTownID,
      sessionToken: invalidSessionToken,
    });
    expect(mockCoveyTownController.getSessionByToken).toBeCalledWith(invalidSessionToken);
    expect(mockCoveyTownController.updateVideoStatus).not.toHaveBeenCalled();
  });
});
