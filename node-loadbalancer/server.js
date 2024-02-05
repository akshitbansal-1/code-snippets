const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.argv[2];

// Parsing incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Defining a route to handle POST requests
app.post('/', (req, res) => {
    // Logging the receipt of a POST request and its body
    console.log('Received a POST request:', req.body);

    // Sending a response containing the port on which the server is running
    res.json({ "data": port });
});



// Starting the server and listening on the specified port
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});