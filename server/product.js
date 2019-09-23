const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const chalk = require("chalk");

const productResolvers = require("./resolvers/product");

const PROTO_PATH = "../typeDefs/product.proto";
const options = require("../typeDefs/options");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const productproto = grpc.loadPackageDefinition(packageDefinition);

const main = () => {
    const server = new grpc.Server()

    server.addService(productproto.ProductService.service, productResolvers)
    const port = "127.0.0.1:50051";

    server.bind(port, grpc.ServerCredentials.createInsecure());
    const blue = chalk.blue
    const target = blue(`http://${port}`)

    console.log(`🚀 gRPC server ready at ${target}`);
    server.start();
}

main();



