// package: helloworld2
// file: helloworld2.proto

import * as helloworld2_pb from "./helloworld2_pb";
export class Greeter {
  static serviceName = "helloworld2.Greeter";
}
export namespace Greeter {
  export class SayHello {
    static readonly methodName = "SayHello";
    static readonly service = Greeter;
    static readonly requestStream = false;
    static readonly responseStream = true;
    static readonly requestType = helloworld2_pb.HelloRequest;
    static readonly responseType = helloworld2_pb.HelloReply;
  }
}
