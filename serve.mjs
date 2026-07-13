import { createServer } from 'http';
import { readFile } from 'fs';
import { resolve, extname } from 'path';

const server = createServer((req, res) => {
  const url = decodeURIComponent(req.url === '/' ? '/index.html' : req.url);
  let filePath = resolve('.', url.slice(1));
  const ext = extname(filePath).toLowerCase();

  let contentType = 'text/html';
  if (ext === '.css') contentType = 'text/css';
  else if (ext === '.js') contentType = 'application/javascript';
  else if (ext === '.png') contentType = 'image/png';
  else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
  else if (ext === '.gif') contentType = 'image/gif';
  else if (ext === '.mp4') contentType = 'video/mp4';
  else if (ext === '.mov') contentType = 'video/quicktime';
  else if (ext === '.webp') contentType = 'image/webp';

  readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

server.listen(3000, () => console.log('Server running on http://localhost:3000'));