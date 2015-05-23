"use strict";

import compress from "koa-compress";
import session from "koa-session";
import {
  appKey,
  appSecret,
  port
} from "./config/app";

const app = require("koa")();

app.keys = [appKey, appSecret];

app.use(session(app));
app.use(compress());
app.use(function *(next) {
  this.body = "Test";
});

const server = require("http").createServer(app.callback());

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
