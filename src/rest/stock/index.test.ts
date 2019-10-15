import * as sinon from "sinon";
import * as chai from "chai";

import * as request from "../transport/request";
import {
  exchanges,
  v1HistoricQuotes,
  v1HistoricTrades,
  v2HistoricTrades
} from ".";

describe("[REST] Stock / equities", () => {
  chai.should();
  let requestStub;
  const sandbox = sinon.createSandbox();
  beforeEach(() => {
    requestStub = sandbox.stub(request, "get");
  });
  afterEach(() => {
    sandbox.restore();
  });

  it("exchanges call /v1/meta/exchanges", async () => {
    await exchanges();
    requestStub.callCount.should.eql(1);
    requestStub.getCalls()[0].args[0].should.eql("/v1/meta/exchanges");
  });

  it("v1HistoricTrades call /v1/historic/trades/{symbol}/{date}", async () => {
    await v1HistoricTrades("AAPL", "2018-2-2");
    requestStub.callCount.should.eql(1);
    requestStub
      .getCalls()[0]
      .args[0].should.eql("/v1/historic/trades/AAPL/2018-2-2");
  });

  it("v2HistoricTrades call /v2/ticks/stocks/trades/{ticker}/{date}", async () => {
    await v2HistoricTrades("AAPL", "2018-2-2");
    requestStub.callCount.should.eql(1);
    requestStub
      .getCalls()[0]
      .args[0].should.eql("/v2/ticks/stocks/trades/AAPL/2018-2-2");
  });

  it("v1HistoricQuotes call /v1/historic/quotes/{symbol}/{date}", async () => {
    await v1HistoricQuotes("AAPL", "2018-2-2");
    requestStub.callCount.should.eql(1);
    requestStub
      .getCalls()[0]
      .args[0].should.eql("/v1/historic/quotes/AAPL/2018-2-2");
  });
});
