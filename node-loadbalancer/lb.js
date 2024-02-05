const net = require('node:net');

const backendServers = [
    { host: 'localhost', port: '8000' },
    { host: 'localhost', port: '8001' },
    { host: 'localhost', port: '8002' },
    { host: 'localhost', port: '8003' },
];

function getServerStrategy() {
    let currentServer = 0;
    return () => {
        currentServer++;
        return backendServers[currentServer % backendServers.length];
    };
}
const serverSelector = getServerStrategy();
const server = net.createServer((socket) => {
    makeConnection(serverSelector(), socket);
});

function makeConnection({ port, host }, socket) {
    const client = new net.Socket();
    
    client.connect(port, host, () => {
        console.log(`Connected to server at ${port}`);  
        socket.pipe(client); // stream data from server to client
        client.pipe(socket); // stream data from client to server
    });
    
    client.on('data', (data) => {
        socket.write(data);
    });
    client.on('close', () => {
        console.log('Connection closed');
    });

    client.on('error', (error) => {
        console.error(`Error connecting to server at ${port}: ${error.message}`);
        socket.destroy();
    });

    socket.on('error', (error) => {
        console.error(`Socket error: ${error.message}`);
        client.destroy();
    });
}

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});