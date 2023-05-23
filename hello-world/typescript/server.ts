import path from 'path'
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import {ProtoGrpcType} from './proto/helloworld'
import { GreeterHandlers } from './proto/helloworld/Greeter'

const PORT = 50051
const PROTO_FILE = './proto/helloworld.proto'

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE))
const grpcObj = (grpc.loadPackageDefinition(packageDef) as unknown) as ProtoGrpcType
const helloworld = grpcObj.helloworld

function main() {
  const server = getServer()

  server.bindAsync(`127.0.0.1:${PORT}`, grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error(err)
      return
    }
    console.log(`Your server as started on port ${port}`)
    server.start()
  })
}

function getServer() {
    const server = new grpc.Server()
    server.addService(helloworld.Greeter.service, {
      SayHello: (req, res) => {
        // console.log(req.request)
        res(null, {message: "Hello " + req.request.name})
      },
    } as GreeterHandlers)
  
    return server
  }
  
main()