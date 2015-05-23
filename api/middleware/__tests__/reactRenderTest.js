"use strict";

import chai from "chai";
import koa from "koa";
import request from "supertest";

chai.should();

describe("reactRender", () => {
  beforeEach(() => {
    global.app = koa();
  });

  afterEach(() => {
    delete global.app;
  });

  it("should set `this.body` to a string.", () => {

  });
});
