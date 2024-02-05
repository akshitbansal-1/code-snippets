const http = require('http');

// Our client sends a POST request to the load balancer every second
setInterval(() => {
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/',
        method: 'POST',
    };

    // Sending a request to the load balancer
    const req = http.request(options, (res) => {
        let data = '';
        // Listening for data from the server
        res.on('data', (chunk) => {
            data += chunk;
        });
        // When response is complete, log the data received
        res.on('end', () => {
            console.log(`Received from server: ${data}`);
        });
    });

    // Writing some sample data to send to the server
    req.write('Hello');

    // Handling errors in case of connection issues
    req.on('error', (error) => {
        console.error(`Error connecting to server: ${error.message}`);
    });

    // Ending the request
    req.end();
}, 1000);