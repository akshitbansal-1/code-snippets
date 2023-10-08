const ws = require('ws');
const client = new ws('ws://localhost:3000');
client.on('open', () => {
  //the server would now print "Hello"
  client.send('Hello');
});
client.on('message', async (data) => {
    await new Promise((res, rej) => {
        setTimeout(res, 1000);
    });
    console.log(data);
    client.send('abcd');
})
