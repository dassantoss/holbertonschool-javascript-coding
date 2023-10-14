const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello Holberton School!');
});

const PORT = 1245;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = server;
