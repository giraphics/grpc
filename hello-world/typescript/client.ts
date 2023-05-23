import path from 'path'
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import {ProtoGrpcType} from './proto/helloworld'

const PORT = 50051
const PROTO_FILE = './proto/helloworld.proto'

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE))
const grpcObj = (grpc.loadPackageDefinition(packageDef) as unknown) as ProtoGrpcType

const client = new grpcObj.helloworld.Greeter(
    `127.0.0.1:${PORT}`, grpc.credentials.createInsecure()
  )

const deadline = new Date()
deadline.setSeconds(deadline.getSeconds() + 5)
client.waitForReady(deadline, (err) => {
  if (err) {
    console.error(err)
    return
  }
  onClientReady()
})

function onClientReady() {
  const username = process.argv[2]
  client.sayHello({name: username}, (err, response) => {
      if (err) {
        console.error(err)
        return
      }
      console.log(response?.message)
    })
}