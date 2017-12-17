/*
 *
 * Copyright 2015 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import {grpc, Code, Metadata} from "grpc-web-client";
import {Greeter} from "./generated/helloworld_pb_service";
import {HelloRequest, HelloReply} from "./generated/helloworld_pb";

declare const USE_TLS: boolean;
const host = USE_TLS ? "https://localhost:9091" : "http://localhost:9090";

export function helloGRPC() {
  const  helloRequest = new HelloRequest();
  helloRequest.setName('Hana');
  grpc.unary(Greeter.SayHello,{
    request: helloRequest,
    host: host,
    onEnd: res => {
      const { status, statusMessage, headers, message, trailers } = res;
      console.log("sayHello.onEnd.status", status, statusMessage);
      console.log("SayHello.onEnd.headers", headers);
      if (status === Code.OK && message) {
        console.log("sayHello.onEnd.message", message.toObject());
      }
      console.log("sayHello.onEnd.trailers", trailers);
    }
  });
  // grpc.invoke(Greeter.SayHello, {
  //   debug: false,// optional - enable to output events to console.log
  //   request: helloRequest,
  //   host: "http://localhost:9090",
  //   onHeaders: (headers: Metadata) => {
  //     console.log("got headers: ", headers);
  //   },
  //   onMessage: (message: HelloReply) => {
  //     console.log("got book: ", message.toObject());
  //   },
  //   onEnd: (code: Code, msg: string | undefined, trailers: Metadata) => {
  //     if (code == Code.OK) {
  //       console.log("all ok");
  //     } else {
  //       console.log("hit an error", code, msg, trailers);
  //     }
  //   }
  // });
}
