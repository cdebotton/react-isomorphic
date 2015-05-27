"use strict";

import compress from "koa-compress";
import session from "koa-session";
import react from "./middleware/react";
import alt from "../app/alt";
import HTMLDocument from "../app/components/HTMLDocument";
import {
  appKey,
  appSecret,
  port
} from "./config/app";

const app = require("koa")();

app.keys = [appKey, appSecret];

app.use(session(app));
app.use(compress());
app.use(react({ alt, HTMLDocument }));

const server = require("http").createServer(app.callback());

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export default app;
