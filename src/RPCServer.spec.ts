import { RPCServer } from "./RPCServer";
import { Callable, Service } from "./decorators";

describe("RPCServer", () => {
  let server: RPCServer;

  beforeAll(() => {
    server = new RPCServer();

    @Service()
    class Test {
      @Callable()
      randomNumber() {
        return Math.random();
      }
    }

    server.registerServices([Test]);

    server.listen(3000);
  });

  afterAll(() => {
    server.close();
  });

  test("Server should listen", () => {
    expect(server).not.toBeNull();
  });

  test("call Test.randomNumber should return number", async () => {
    const result = await server.test("Test.randomNumber", null);
    expect(result).not.toBeNull();
    expect(typeof result).toBe("number");
  });
});
