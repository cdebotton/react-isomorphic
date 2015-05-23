"use strict";

import React, { Component, PropTypes } from "react";

export default class HTMLDocument extends Component {
  static propTypes = {
    markup: PropTypes.string.isRequired,
    payload: PropTypes.string.isRequired,
    styles: PropTypes.arrayOf(PropTypes.string)
  }

  get stylesheets() {
    let { styles } = this.props;

    if (!styles) {
      return false;
    }

    return styles.map((href, key) => (
      <link
        key={ key }
        className="asset-style"
        type="text/css"
        href={ href } />
    ));
  }

  get javascripts() {
    let { scripts } = this.props;

    if (!scripts) {
      return false;
    }

    return scripts.map((src, key) => (
      <script
        className="asset-script"
        key={ key }
        src={ src } />
    ));
  }

  render() {
    let {
      markup,
      payload
    } = this.props;
    let {
      stylesheets,
      javascripts
    } = this;

    return (
      <html lang="en">
      <head>
        <title>debotton.io</title>
        { stylesheets }
      </head>
      <body>
        <div
          dangerouslySetInnerHTML={{ __html: markup }}
          className="root" />
        <script
          dangerouslySetInnerHTML={{ __html: payload }}
          className="payload" />
        { javascripts }
      </body>
      </html>
    );
  }
}
