import { Service as ContainerService } from "typedi";
import { ServiceMetadataKey } from "../metadata/definitions/serviceMetadata";

export function Service(): ClassDecorator {
  return function (target) {
    Reflect.defineMetadata(ServiceMetadataKey, target.name, target);
    ContainerService()(target);
  };
}
