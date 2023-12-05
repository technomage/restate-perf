
import * as restate from "@restatedev/restate-sdk";
import { testApi, testRouter } from "./test";

const args = process.argv;
const port = parseInt(args[args.length-1]);

restate
  .createServer()
  .bindRouter(testApi.path, testRouter)
  .listen(port);
