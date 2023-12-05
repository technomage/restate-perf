
import * as restate from "@restatedev/restate-sdk";

const args = process.argv;
const port = parseInt(args[args.length-2]);
const n = parseInt(args[args.length-1]);

const receive = async (
  ctx: restate.RpcContext,
  uid: string,
  data: object,
) => {
  console.log(`@@@@ Reveived "${JSON.stringify(data)}" for ${uid} in Agg${n}`)
};

export const aggRouter = restate.keyedRouter({
  receive: receive,
});

const aggApi: restate.ServiceApi<typeof aggRouter> = {
  path: `Agg${n}`,
};

console.log(`@@@@ Serving agg API: ${aggApi.path}`)

restate
  .createServer()
  .bindKeyedRouter(aggApi.path, aggRouter)
  .listen(port);
