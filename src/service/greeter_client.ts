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
import {Greeter} from "./generated/gatewayContract_pb_service";
import {HelloRequest, HelloReply} from "./generated/gatewayContract_pb";

const host = "http://localhost:8080";

var prev_response = "";

export function helloGRPC(input_type: string, input_camera_id: number, output_response: Function) {
  const  helloRequest = new HelloRequest();
  helloRequest.setType(input_type);
  helloRequest.setId(input_camera_id);
  grpc.invoke(Greeter.SayHello, {
    // debug: false,// optional - enable to output events to console.log
    request: helloRequest,
    host: host,
    onHeaders: (headers: Metadata) => {
      console.log("got headers: ", headers);
    },
    onMessage: (message: HelloReply) => {
      var reply = message.toObject();
      if (prev_response !== reply.response){
        console.log("response: ", reply.response);
        output_response(reply.response);
        prev_response = reply.response;
      }
    },
    onEnd: (code: Code, msg: string | undefined, trailers: Metadata) => {
      console.log("onEnd", code, msg, trailers);
    }
  });
}
