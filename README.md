yarn start

protoc \
--plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
--js_out=import_style=commonjs,binary:./src/service/generated \
--ts_out=service=true:./src/service/generated \
-I ./src/service \
gatewayContract.proto