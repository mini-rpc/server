import { io, Socket } from "socket.io-client";

export class RPCClient {
  socket: Socket;
  constructor(url: string) {
    this.socket = io(url);
  }

  connect() {
    this.socket.connect();
  }

  isConnected() {
    return this.socket.connected;
  }

  close() {
    this.socket.close();
  }

  call(funcName: string, args?: any[]) {
    return new Promise((resolve, reject) => {
      this.socket.emit("call", funcName, args || [], (data, err) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}
