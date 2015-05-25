"use strict";

import React from "react";
import Router from "react-router";

export const DOCTYPE = "<!doctype html>";

export default function react(params = {}) {
  return function *(next) {
    const { HTMLDocument, routes } = params;
    let html, markup;

    if (routes) {
      const router = createRouter(params.routes, this.req.url);
      const [Handler, state] = yield resolveRoutes(router);
      markup = React.renderToString(
        <Handler { ...state } />
      );
    }

    if (HTMLDocument) {
      html = React.renderToStaticMarkup(
        <HTMLDocument
          markup={ markup } />
      );
    }

    this.body = DOCTYPE + html;
  };
};

export const createRouter = (routes, url) => {
  return Router.create({
    routes: routes,
    location: url
  });
};

export const resolveRoutes = (router) => new Promise((resolve, reject) => {
  try {
    router.run((...args) => resolve(args));
  }
  catch (err) {
    reject(err);
  }
});
