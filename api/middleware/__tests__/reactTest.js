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

class HTMLDocument extends Component {
  render() {
    return (
      <html lang="en">
      <head>
        <title>HTML Document</title>
      </head>
      <body>
        <div dangerouslySetInnerHTML={{ __html: this.props.markup }} />
      </body>
      </html>
    );
  }
}

class HandlerComponent extends Component {
  render() {
    return (
      <p>Hello, world!</p>
    );
  }
}

const routes = (<Route handler={ HandlerComponent } />);

describe("react", () => {

});
