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

const receive = async (
  ctx: restate.RpcContext,
  uid: string,
  data: object,
) => {
  const n : number = uid[uid.length-1] > '4' ? 1 : 2
  const aggNApi: restate.ServiceApi<typeof aggRouter> = {
    path: `Agg${n}`,
  }
  // console.log(`@@@@ Reveived "${JSON.stringify(data)}" for ${uid} in Agg`)
  ctx.send(aggNApi).receive(uid, data);
};

export const aggRouter = restate.keyedRouter({
  receive: receive,
});

export const aggApi: restate.ServiceApi<typeof aggRouter> = {
  path: "Agg",
};
