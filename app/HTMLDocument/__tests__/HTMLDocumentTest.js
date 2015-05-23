"use strict";

import React from "react/addons";
import { jsdom } from "node-jsdom";
import chai from "chai";

chai.should();

const { TestUtils } = React.addons;

describe("HTMLDocument", () => {
  beforeEach(() => {
    global.document = jsdom();
    global.window = document.parentWindow;
    global.HTMLDocument = require("..");
  });

  afterEach(() => {
    delete global.document;
    delete global.window;
    delete global.HTMLDocument;
  });

  it("should render markup passed into the root div", () => {
    let renderedComponent = TestUtils.renderIntoDocument(
      <HTMLDocument markup="Hello!" />
    );
    let rootDiv = TestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      "root"
    );
    let domElement = rootDiv.getDOMNode();

    domElement.textContent.should.equal("Hello!");

    renderedComponent = TestUtils.renderIntoDocument(
      <HTMLDocument markup="Foo!" />
    );
    rootDiv = TestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      "root"
    );
    domElement = rootDiv.getDOMNode();

    domElement.textContent.should.equal("Foo!");
  });

  it("should render serialized snapshot", () => {
    const payloadContent = JSON.stringify({ foo: "bar" });

    let renderedComponent = TestUtils.renderIntoDocument(
      <HTMLDocument
        markup="Hello"
        payload={ payloadContent } />
    );

    let payload = TestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      "payload"
    );

    let domElement = payload.getDOMNode();
    domElement.textContent.should.equal(payloadContent);
  });

  it("should include styles passed as props in the <head /> tag.", () => {
    let stylesheets = [
      "/stylesheets/app.min.css",
      "http://fonts.google.com/foo.css"
    ];

    let renderedComponent = TestUtils.renderIntoDocument(
      <HTMLDocument
        styles={ stylesheets } />
    );

    let styles = TestUtils.scryRenderedDOMComponentsWithClass(
      renderedComponent,
      "asset-style"
    );

    styles.length.should.equal(2);

    styles.forEach((style, i) => {
      style.props.type.should.equal("text/css");
      style.props.href.should.equal(stylesheets[i]);
    });
  });

  it("should include scripts passed as props in the <body /> tag.", () => {
    let javascripts = [
      "/bundle.min.js",
      "http://cdn.google.com/modernizr.js"
    ];

    let renderedComponent = TestUtils.renderIntoDocument(
      <HTMLDocument
        scripts={ javascripts } />
    );

    let scripts = TestUtils.scryRenderedDOMComponentsWithClass(
      renderedComponent,
      "asset-script"
    );

    scripts.length.should.equal(2);

    scripts.forEach((script, i) => {
      script.props.src.should.equal(javascripts[i]);
    });
  });
});
