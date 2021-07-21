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
});
