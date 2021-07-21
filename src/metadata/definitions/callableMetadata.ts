export interface CallableMetadata {
  name: string;
  target: Function;
  fn: Function;
  parameters: any;
  returnType: any;
  bindThis?: boolean;
}
