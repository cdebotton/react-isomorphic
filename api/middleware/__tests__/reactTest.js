"use strict";

import sinonChai from "sinon-chai";
import chai, { expect } from "chai";
import { spy } from "sinon";
import koa from "koa";
import request from "supertest";
import React, { Component } from "react";
import { Route } from "react-router";

chai.should();
chai.use(sinonChai);

class HandlerComponent extends Component {
  render() {
    return (
      <p>Hello, world!</p>
    );
  }
}

const routes = (<Route handler={ HandlerComponent } />);

describe("react", () => {
  beforeEach(() => {
    global.react = require("../react").default;
    global.resolveRoutes = require("../react").resolveRoutes;
  });

  afterEach(() => {
    delete global.react;
  });

  describe("#resolveRoutes()", () => {
    it("should resolve a handler and state.", done => {
      let app = koa();

      app.react = { routes };
      app.use(react());

      let resolveRoutes = spy(resolveRoutes);

      request(app.listen())
        .get("/")
        .end((err, res) => {
          console.log(resolveRoutes.should.have.been.calledOnce);
          done();
        });
    });
  });
});
