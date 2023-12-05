/*
 * Copyright (c) 2023 - Restate Software, Inc., Restate GmbH
 *
 * This file is part of the Tour of Restate Typescript handler API,
 * which is released under the MIT license.
 *
 * You can find a copy of the license in the file LICENSE
 * in the root directory of this repository or package or at
 * https://github.com/restatedev/tour-of-restate-typescript
 */

import * as restate from "@restatedev/restate-sdk";
import { aggApi, aggRouter } from "./agg";

const args = process.argv;
const port = parseInt(args[args.length-1]);

restate
  .createServer()
  .bindKeyedRouter(aggApi.path, aggRouter)
  .listen(port);
