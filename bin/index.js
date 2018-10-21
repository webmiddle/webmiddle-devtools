#!/usr/bin/env node

const handler = require("serve-handler");
const http = require("http");
const path = require("path");
const opn = require("opn");

const PORT = process.env.PORT || 3001;

const server = http.createServer((req, res) => {
  // You pass two more arguments for config and middleware
  // More details here: https://github.com/zeit/serve-handler#options
  return handler(req, res, {
    public: path.join(__dirname, "../build"),
    directoryListing: false
  });
});

server.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log(`Running at ${url}`);
  opn(url);
});
