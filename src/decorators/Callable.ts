import { MetadataStorage } from "../metadata/MetadataStorage";
import { CallableMetadata } from "../metadata/definitions/callableMetadata";
export function Callable(): MethodDecorator;
export function Callable(name: string): MethodDecorator;
export function Callable(name?: string): MethodDecorator {
  return function (target, propertyKey, descriptor) {
    if (typeof propertyKey === "symbol") {
      throw new Error("symbol propertyKey is not supported!");
    }

    const params = Reflect.getMetadata(
      "design:paramtypes",
      target,
      propertyKey
    );
    const returnType = Reflect.getMetadata(
      "design:returntype",
      target,
      propertyKey
    );

    const metadata: CallableMetadata = {
      name: name || propertyKey,
      target: target.constructor,
      fn: target[propertyKey],
      parameters: params,
      returnType,
    };
    const metadataStorage = MetadataStorage.getInstance();
    metadataStorage.collectCallableMetadata(metadata);
  };
}
