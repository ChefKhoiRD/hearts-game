import { ColyseusTestServer } from "@colyseus/testing";
import { setupColyseusServer } from "../setupColyseusServer";

describe("Player Actions in BlackjackRoom", () => {
  let testServer: ColyseusTestServer;

  beforeAll(async () => {
    const colyseusServer = setupColyseusServer();
    testServer = new ColyseusTestServer(colyseusServer);
    await testServer.listen(2567);
  });

  afterAll(async () => await testServer.shutdown());

  beforeEach(async () => {
    await testServer.cleanup();
  });

  it("should allow a player to join and perform a 'hit' action", async () => {
    // The rest of your test code here...
  });

  // Additional tests...
});