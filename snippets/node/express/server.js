const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;



app.use('/books/:book', (req, res) => {
    res.send('Path /books/:book');
});

app.use('/books', (req, res) => {
    res.send('Path /books');
});

app.use('/', (req, res) => {
    res.send('Path /');
});


app.listen(PORT);