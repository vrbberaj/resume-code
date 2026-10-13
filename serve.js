const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  const decodedUrl = decodeURIComponent(req.url);
  let targetFile = decodedUrl === '/' ? 'index.html' : decodedUrl;
  if (decodedUrl === '/vsign') targetFile = 'academic_vsign.html';
  else if (decodedUrl === '/scope') targetFile = 'academic_scope.html';
  else if (decodedUrl === '/academic') targetFile = 'academic_resume.html';
  
  let filePath = path.join(__dirname, targetFile);
  
  const ext = path.extname(filePath).toLowerCase();
  let contentType = 'text/html';
  if (ext === '.css') contentType = 'text/css';
  else if (ext === '.png') contentType = 'image/png';
  else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
  else if (ext === '.js') contentType = 'application/javascript';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File not found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Server error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
