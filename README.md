# Mini-RPC
simple but effective RPC framework. Both server and [client](https://github.com/mini-rpc/client).

## Usage

- [Get start](#Get-start)
  - [Install](#install)
  - [Config](#config)
  - [Server](#server)
  - [Client](#client)

### Get start

#### Install
```sh
npm i @mini-rpc/server
# or
pnpm add @mini-rpc/server
# or
yarn add @mini-rpc/server
```

#### Config

- `tsconfig.json` in server
```json
{
  "compilerOptions": {
    "target": "ES2018",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
  }
}
```

- install `reflect-metadata`
```sh
npm i reflect-metadata
# or
pnpm add reflect-metadata
# or
yarn add reflect-metadata
```

- import `reflect-metadata` on entry
  (e.g: `index.ts`)

#### Server

```ts
import { Service, Callable } from "@mini-rpc/server";

@Service()
class MyService {

	@Callable()
	add(...nums: number[]) {
		return nums.reduce((acc, cur) => acc + cur);
	}

}

const server = new RPCServer();
server.registerServices([MyService]);

server.listen(3000);
```

### Client

```ts
/*
 * you need to install `@mini-rpc/client` on the client side
 */
import { RPCClient } from "@mini-rpc/client";

const client = new RPCClient("ws://localhost:3000");
client.connect();

client
  .call("MyService.add", [1,2,3])
  .then((result) => {
    console.log(result); // 6
  })
  .catch((err) => {
    console.error(err);
  });
```

### Tips

- the `@Callable` method can be asynchronous.

```ts

class x {
	//...

	@Callable()
	async add(a:number,b:number) {
		// asynchronous code
	}

	// or declare the return type Promise

	@Callable()
	promiseAdd(a:number,b:number):Promise<number> {
		return Promise<number>()
	}
}

```
