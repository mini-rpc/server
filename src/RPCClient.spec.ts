import { RPCServer } from "./RPCServer";
import { Callable, Service } from "./decorators";
import { RPCClient } from "./RPCClient";

describe("ROCClient", () => {
  let server: RPCServer;
  let client: RPCClient;

  beforeAll(() => {
    server = new RPCServer();

    @Service()
    class Test {
      @Callable()
      randomNumber() {
        return Math.random();
      }

      @Callable()
      async asyncAdd(a: number, b: number) {
        return a + b;
      }

      @Callable()
      async promiseAdd(a: number, b: number) {
        return new Promise((resolve, reject) => {
          setTimeout(() => resolve(a + b), 100);
        });
      }
    }

    server.registerServices([Test]);

    server.listen(3000);
  });

  afterAll(() => {
    server.close();
  });

  beforeEach(() => {
    client = new RPCClient("ws://localhost:3000");
    client.connect();
  });

  afterEach(() => {
    client.close();
  });

  test("Client call randomNumber", async () => {
    const result = await client.call("randomNumber");
    expect(result).toBeLessThanOrEqual(1);
  });

  test("Client call nullMethod", () => {
    expect(client.call("nullMethod")).rejects.toMatch("not implemented");
  });

  test("Client call asyncAdd", async () => {
    const result = await client.call("asyncAdd", [1, 2]);
    expect(result).toBe(3);
  });

  test("Client call promiseAdd", async () => {
    const result = await client.call("promiseAdd", [1, 3]);
    expect(result).toBe(4);
  });
});
