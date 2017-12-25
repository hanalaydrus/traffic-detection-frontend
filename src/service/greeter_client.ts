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

const host = "http://localhost:8080";
var car = "-1";

export function helloGRPC() {
  const  helloRequest = new HelloRequest();
  helloRequest.setName('Hana');

  grpc.invoke(Greeter.SayHello, {
    // debug: false,// optional - enable to output events to console.log
    request: helloRequest,
    host: host,
    onHeaders: (headers: Metadata) => {
      console.log("got headers: ", headers);
    },
    onMessage: (message: HelloReply) => {
      var reply = message.toObject();
      if (car !== reply.message) {
        console.log("car: ", reply.message);
        car = reply.message;
      }
    },
    onEnd: (code: Code, msg: string | undefined, trailers: Metadata) => {
      console.log("onEnd", code, msg, trailers);
    }
  });
}
