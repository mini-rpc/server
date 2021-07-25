import { CallableMetadata } from "./definitions/callableMetadata";
import { Container } from "typedi";
import { ServiceMetadataKey } from "./definitions/serviceMetadata";

export class MetadataStorage {
  private static instance: MetadataStorage;
  private constructor() {}
  private callableMap = new Map<string, CallableMetadata>();

  public static getInstance() {
    if (!MetadataStorage.instance) {
      MetadataStorage.instance = new MetadataStorage();
    }
    return MetadataStorage.instance;
  }

  public collectCallableMetadata(metadata: CallableMetadata) {
    const serviceName = metadata.target.name;
    this.callableMap.set(`${serviceName}.${metadata.name}`, metadata);
  }

  public getCallableMetadata(name: string): CallableMetadata {
    const metadata = this.callableMap.get(name);
    if (!metadata) return undefined;
    if (metadata?.bindThis) {
      return metadata;
    }
    const classInstance = Container.get(metadata.target);
    if (!classInstance) {
      throw new Error(`
       Can not find Service ${metadata.target.name}
       please make sure you have 
        1. decorated this service with the @Service;
        2. server.registerService([${metadata.target.name}]);
      `);
    }
    const serviceName =
      Reflect.getMetadata(ServiceMetadataKey, metadata.target) ||
      metadata.target.name;
    const newMetadata = {
      ...metadata,
      bindThis: true,
      fn: metadata.fn.bind(classInstance),
    };
    this.callableMap.set(name, newMetadata);
    return newMetadata;
  }
}
