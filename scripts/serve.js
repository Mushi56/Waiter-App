const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = path.resolve(__dirname, '..');

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg'
};

const server = http.createServer((req, res) => {
  // Parse URL
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  if (pathname === '/') {
    pathname = '/index.html';
  }

  const safePath = path.normalize(path.join(ROOT, pathname));

  // Security check to avoid path traversal
  if (!safePath.startsWith(ROOT)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(safePath, (err, stats) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`500 Server Error: ${err.code}`);
      }
      return;
    }

    let filePathToRead = safePath;
    if (stats.isDirectory()) {
      filePathToRead = path.join(safePath, 'index.html');
    }

    const ext = path.extname(filePathToRead).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePathToRead, (readErr, content) => {
      if (readErr) {
        res.writeHead(readErr.code === 'ENOENT' ? 404 : 500, { 'Content-Type': 'text/plain' });
        res.end(`Error loading file: ${readErr.code}`);
        return;
      }

      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      });
      res.end(content);
    });
  });
});

server.listen(PORT, () => {
  console.log('\n==================================================');
  console.log('🚀 Smart Menu Local Server Running!');
  console.log(`- Restaurant Floor App:   http://localhost:${PORT}/`);
  console.log(`- Customer QR Order App:  http://localhost:${PORT}/order.html?r=smart-menu-bistro&table=B4`);
  console.log(`- Platform Admin Portal:  http://localhost:${PORT}/admin.html`);
  console.log('==================================================\n');
});
