const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  const decodedUrl = decodeURIComponent(req.url.split('?')[0]);
  let targetFile = decodedUrl === '/' ? 'index.html' : decodedUrl;

  // Clean Route Mappings
  if (decodedUrl === '/leadership' || decodedUrl === '/leadership-deck') targetFile = 'leadership.html';
  else if (decodedUrl === '/cv' || decodedUrl === '/resume') targetFile = 'cv.html';
  else if (decodedUrl === '/case-ericsson') targetFile = 'case-ericsson.html';
  else if (decodedUrl === '/case-ibm-watson') targetFile = 'case-ibm-watson.html';
  else if (decodedUrl === '/case-zebra') targetFile = 'case-zebra.html';
  else if (decodedUrl === '/case-ibm-carbon') targetFile = 'case-ibm-carbon.html';
  else if (decodedUrl === '/case-zf-wabco') targetFile = 'case-zf-wabco.html';
  else if (decodedUrl === '/vsign') targetFile = 'academic_vsign.html';
  else if (decodedUrl === '/scope') targetFile = 'academic_scope.html';
  else if (decodedUrl === '/academic') targetFile = 'academic_resume.html';
  else if (decodedUrl === '/general') targetFile = 'academic_general.html';
  else if (decodedUrl === '/prep-first-call') targetFile = 'prep_first_call.html';
  else if (decodedUrl === '/prep-interview-stages') targetFile = 'prep_interview_stages.html';
  else if (decodedUrl === '/tracker') targetFile = 'tracker.html';
  
  let filePath = path.join(__dirname, targetFile);
  
  const ext = path.extname(filePath).toLowerCase();
  let contentType = 'text/html';
  if (ext === '.css') contentType = 'text/css';
  else if (ext === '.png') contentType = 'image/png';
  else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
  else if (ext === '.js') contentType = 'application/javascript';
  else if (ext === '.pdf') contentType = 'application/pdf';
  else if (ext === '.svg') contentType = 'image/svg+xml';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File not found: ' + targetFile);
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
