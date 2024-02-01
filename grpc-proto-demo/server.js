const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const todoPackageDef = protoLoader.loadSync('todo.proto', {});
const grpcObject = grpc.loadPackageDefinition(todoPackageDef);
const todoPackage = grpcObject.todoPackage;

const server = new grpc.Server();
server.bindAsync('0.0.0.0:2828', grpc.ServerCredentials.createInsecure(), function() {
    console.log('done');
    server.start();
});

const todos = [];

server.addService(todoPackage.TodoService.service, {
    'createTodo': (call, callback) => {
        todos.push(call.request);
        callback(null, {
            id: todos.length,
        })
    },
    'getTodos': (call, callback) => {
        console.log(call);
        callback(null, { "items": todos });
    }
});



