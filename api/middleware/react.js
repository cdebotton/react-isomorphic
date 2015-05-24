"use strict";

import Router from "react-router";

const DOCTYPE = "<!doctype html>";

export default function react() {
  return function *(next) {
    if (!this.app.react) {
      throw new Error(
        "You must properly config a react object on your koa app."
      );
    }

    if (!this.app.react.routes) {
      throw new Error(
        "You must set app.react.routes to an instance of ReactRouter.Routes."
      );
    }

    const router = createRouter(this.app.react.routes, this.req.url);
    const [History, state] = yield resolveRoutes(router);

    this.body = DOCTYPE;
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
