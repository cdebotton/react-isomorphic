"use strict";

import sinonChai from "sinon-chai";
import chai, { expect } from "chai";
import { spy } from "sinon";
import koa from "koa";
import request from "supertest";
import react, { DOCTYPE, createRouter, resolveRoutes } from "../react";
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
  it("should set <!doctype html> on this.body.", done => {
    let app = koa();

    app.use(react());

    request(app.listen())
      .get("/")
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        res.text.should.match(/^\<\!doctype html\>/);
        done();
      });
  });

  it("should statically render the HTMLDocument as a layout.", done => {
    let app = koa();
    const result = DOCTYPE + React.renderToStaticMarkup(
      <HTMLDocument />
    );

    app.use(react({ HTMLDocument }));

    request(app.listen())
      .get("/")
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        res.text.should.equal(result);

        done();
      });
  });

  it("should embed the rendered routes as markup", done => {
    let app = koa();

    // const router = createRouter(routes, "/");
    // const [Handler, state] = resolveRoutes(router);
    const result = DOCTYPE + React.renderToStaticMarkup(
      <HTMLDocument
        markup={ "markup" } />
    );

    app.use(react({ HTMLDocument, routes }));

    request(app.listen())
      .get("/")
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        done();
      });
  });
});
