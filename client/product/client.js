const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = "../../typeDefs/product.proto";

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
};

// Returns value in camelCase
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    options
);
const productproto = grpc.loadPackageDefinition(packageDefinition);

const ProductService = productproto.ProductService;

const client = new ProductService('localhost:50051', grpc.credentials.createInsecure());

module.exports = client;