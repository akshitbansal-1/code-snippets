const http = require('http');
const https = require('https');
const url = require('url');

const server = http.createServer((clientReq, clientRes) => {
    try {
        const targetUrl = url.parse(clientReq.url, true);
        const targetOptions = {
            method: clientReq.method,
            headers: clientReq.headers,
            path: targetUrl.path,
            search: targetUrl.search,
        };

        const targetProtocol = targetUrl.protocol === 'https:' ? https : http;

        const proxyReq = targetProtocol.request(targetOptions, (proxyRes) => {
            clientRes.writeHead(proxyRes.statusCode, proxyRes.headers);
            proxyRes.pipe(clientRes, { end: true });
        });

        clientReq.pipe(proxyReq, { end: true });

        proxyReq.on('error', (error) => {
            console.error('Proxy Request Error:', error.message);
            clientRes.writeHead(500, { 'Content-Type': 'text/plain' });
            clientRes.end('Proxy Request Error');
        });
    } catch (error) {
        console.error('Error:', error.message);
        clientRes.writeHead(500, { 'Content-Type': 'text/plain' });
        clientRes.end('Internal Server Error');
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Proxy server is running on port ${port}`);
});