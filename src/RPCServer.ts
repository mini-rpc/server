import { Server as SocketServer, ServerOptions } from "socket.io";
import { Server as httpServer } from "http";
import { Container } from "typedi";
import { MetadataStorage } from "./metadata";

export class RPCServer extends SocketServer {
  metadataStorage: MetadataStorage;

  constructor(
    srv?: Partial<ServerOptions> | httpServer | number,
    opts?: Partial<ServerOptions>
  ) {
    super(srv, opts);
    this.metadataStorage = MetadataStorage.getInstance();
    this.init();
  }

  registerServices(services: Function[]) {
    Container.import(services);
  }

  init() {
    this.on("connection", (socket) => {
      socket.on("call", async (funcName, args, callback) => {
        const metadata = this.metadataStorage.getCallableMetadata(funcName);
        if (!metadata) {
          callback(null, "not implemented");
          return;
        }

        const { fn } = metadata;
        if (fn !== undefined && typeof fn === "function") {
          callback(await fn(...args));
        }
      });
    });
  }
}
