import * as Promise from "bluebird";
import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import { Mineplex } from "../";

chai.use(chaiAsPromised);
chai.should();

describe("MineplexAPI", () => {
  it("invalid api key", () => {
    let api = new Mineplex.MineplexAPI("poop");
    return api.getPlayer("Phinary").should.eventually.be.rejected
      .and.be.an.instanceof(Mineplex.APIError);
  });
});
