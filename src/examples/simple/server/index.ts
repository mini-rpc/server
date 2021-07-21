import { RPCServer } from "../../../index";
import services from "./services";

function bootstrap() {
  const server = new RPCServer();
  server.registerServices(services);

  server.listen(3000);
}

bootstrap();
