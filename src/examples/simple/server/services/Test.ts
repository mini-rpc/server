import { Callable, Service } from "../../../../decorators";

@Service()
export class Test {
  private base = 1;

  @Callable()
  add(...args: number[]): number {
    return args.reduce((acc, arg) => acc + arg) + this.base;
  }

  @Callable()
  async asyncAdd(a: number, b: number): Promise<number> {
    return new Promise<number>((resolve) => {
      setTimeout(() => resolve(a + b), 1000);
    });
  }

  @Callable()
  promiseAdd(a: number, b: number): Promise<number> {
    return new Promise<number>((resolve) => {
      setTimeout(() => resolve(a + b), 1000);
    });
  }
}
