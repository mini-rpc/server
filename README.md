# Mini-RPC
simple but effective RPC framework. Both server and client.

## Usage

- [Get start](#Get-start)
  - [Install](#install)
  - [Config](#config)
  - [Server](#server)
  - [Client](#client)

### Get start

#### Install
```bash
npm i mini-rpc
# or
pnpm add mini-rpc
# or
yarn add mini-rpc
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

#### Server

```ts
import {Service, Callable} from "mini-rpc";

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
import { RPCClient } from "mini-rpc";

const client = new RPCClient("ws://localhost:3000");
client.connect();

client
  .call("add", [1,2,3])
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
		  return new Promise<number>((resolve)=>{
		  // ...
   	  })
  }
}
```
