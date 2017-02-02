import * as Promise from "bluebird";
import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import { MineplexAPI, APIError } from "../";

chai.use(chaiAsPromised);
chai.should();

const VALID_API_KEY = ""; // api key required for proper testing

describe("MineplexAPI", () => {
  let validApi = new MineplexAPI(VALID_API_KEY);
  describe("Endpoint Interface", () => {
    describe("player", () => {
      it("getPlayer", () => {
        return validApi.getPlayer("Phinary").then(player => {
          player.should.exist;
          player.name.should.equal("Phinary");
          player.uuid.should.equal("b33207e2-0dc5-4cbd-b3ee-6c860727f722");
          player.rank.should.be.a("string");
          player.shards.should.be.a("number");
          player.gems.should.be.a("number");
          player.lastLogin.should.be.a("string");
          player.level.should.include.keys(["value", "color"]);
          player.friends.should.be.an.instanceof(Array);

          player.friends.forEach(f => {
            f.should.have.all.keys("name", "uuid");
          });
        });
      });
      it("getPlayerFriends", () => {
        return validApi.getPlayerFriends("Phinary").then(friends => {
          friends.should.exist;
          friends.should.be.an.instanceof(Array);
        });
      });
      it("getPlayerStatus", () => {
        return validApi.getPlayerStatus("Phinary").then(status => {
          status.should.exist;
          status.online.should.be.a("boolean");
        });
      });
    });
    describe("network", () => {
      it("getNetworkStatus", () => {
        return validApi.getNetworkStatus().then(status => {
          status.should.exist;
          status.US.should.exist.and.have.all.keys("status", "playerCount", "motd");
          status.EU.should.exist.and.have.all.keys("status", "playerCount", "motd");
          status.playerCount.should.be.a("number");
        });
      });
      it("getRegionStatus", () => {
        let us = validApi.getRegionStatus("US");
        let eu = validApi.getRegionStatus("EU");

        return Promise.join(us, eu, (usStatus, euStatus) => {
          usStatus.should.exist;
          euStatus.should.exist;
          usStatus.should.exist.and.have.all.keys("status", "playerCount", "motd");
          euStatus.should.exist.and.have.all.keys("status", "playerCount", "motd");
        });
      });
    });
    describe("amplifier", () => {
      it("getAmplifierGroups", () => {
        return validApi.getAmplifierGroups().then(groups => {
          groups.should.exist.and.be.an.instanceof(Array);
        });
      });
      it("getAmplifiers", () => {
        // This makes the assumption that UHC is an amplifier group
        return validApi.getAmplifiers("UHC").then(amps => {
          amps.should.be.an.instanceof(Array);
          if (amps.length > 0) {
            let amp = amps[0];
            amp.should.exist.and.have.all.keys("playerName", "uuid", "duration",
              "activationTime", "multiplier", "startTime", "endTime");
          }
        });
      });
    });
  });
  describe("Errors", () => {
    it("invalid api key", () => {
      let api = new MineplexAPI("poop");
      return api.getPlayer("Phinary").should.eventually.be.rejected.and.be.an.instanceof(APIError);
    });
  });
});
