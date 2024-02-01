const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const todoPackageDef = protoLoader.loadSync('todo.proto', {});
const protoDescriptor = grpc.loadPackageDefinition(todoPackageDef);
const todoPackage = protoDescriptor.todoPackage;

const client = new todoPackage.TodoService("localhost:2828", 
    grpc.ChannelCredentials.createInsecure());

for (let i = 0; i < 3; i++) {
    client.createTodo({
        "id": -1,
        "task": "Hello"
    }, (err, resp) => {
        console.log(err, resp);
    });
}

client.getTodos({}, (err, resp) => {
    console.log(err, resp);
})