import { RPCClient } from "../../../index";

const client = new RPCClient("ws://localhost:3000");
client.connect();

client
  .call("test", null)
  .then((result) => {
    console.log("test", result);
  })
  .catch((err) => {
    console.error(err);
  });

client.call("add", [1, 2, 3]).then((result) => {
  console.log("add", result);
});

client.call("asyncAdd", [1, 2]).then((result) => {
  console.log("asyncAdd", result);
});

client.call("promiseAdd", [1, 2]).then((result) => {
  console.log("promiseAdd", result);
});
