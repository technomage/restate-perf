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
import { aggRouter } from "../agg/app";

const data = (i:number):object => {
  return {val: i, name: `Test_${i}`};
}

const test = async (
  ctx: restate.RpcContext,
  request: { n: number },
) => {
  const start = Date.now();
  const agg1Api: restate.ServiceApi<typeof aggRouter> = {
    path: `Agg1`,
  }
  const agg2Api: restate.ServiceApi<typeof aggRouter> = {
    path: `Agg2`,
  }
  const agg3Api: restate.ServiceApi<typeof aggRouter> = {
    path: `Agg3`,
  }
  const agg4Api: restate.ServiceApi<typeof aggRouter> = {
    path: `Agg4`,
  }

  console.log(`@@@@ Run test ${request.n} times.`);
  var buffer = []
  var priorAPI = null;
  for (var i=0; i<request.n; i++) {
    try {
      const uid = `${i}`;
      const d = (i%100)
      // console.log(`@@@@ d: ${d}`)
      const api = d < 25 ? agg1Api :
                 (d < 50 ? agg2Api :
                 (d < 75 ? agg3Api : agg4Api))
      if (priorAPI == api) {
        buffer.push(data(i));
      } else if (priorAPI == null) {
        priorAPI = api;
        buffer.push(data(i));
      } else {
        console.log(`@@@@ Calling Receive service: ${i} @ ${api.path} : ${JSON.stringify(buffer)}`);
        const res = ctx.send(api).receive(uid, buffer);
        priorAPI = api;
        buffer = [];
        buffer.push(data(i));
      }
      // console.log(`@@@@ Receive result: ${res}`);
    } catch (ex) {
      console.log(`#### Error ${ex}`)
    }
  }
  console.log(`@@@@ Calling Receive service: ${i} @ ${agg4Api}`);
  const res = ctx.send(agg4Api).receive(`${request.n}`, buffer);
  console.log(`@@@@ Time ${(Date.now()-start)/1000.0} secs. Sec/request: ${(Date.now()-start)/1000.0/request.n}`);
  return request.n;
};

export const testRouter = restate.router({
  test: test,
});

export const testApi: restate.ServiceApi<typeof testRouter> = {
  path: "Test",
};
