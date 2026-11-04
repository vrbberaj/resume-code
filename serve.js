const http = require('http');
const fs = require('fs');
const path = require('path');

const SCRATCH_TURN_FILE = '/Users/bjslabs/.gemini/antigravity/brain/e79ebd6d-20ca-49cd-a502-ef384e8a2ec9/scratch/war-room-turn.json';
const WAR_ROOM_STATE_FILE = path.join(__dirname, 'war-room-state.json');

const server = http.createServer((req, res) => {
  const decodedUrl = decodeURIComponent(req.url.split('?')[0]);

  // Interactive War Room Turn Endpoint
  if (req.method === 'POST' && decodedUrl === '/api/war-room/speak') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const action = payload.action || 'speak';
        const text = (payload.text || '').trim();

        let state = {};
        try {
          state = JSON.parse(fs.readFileSync(WAR_ROOM_STATE_FILE, 'utf8'));
        } catch (e) {}

        state.transcript = state.transcript || [];
        if (action === 'speak' && text) {
          state.transcript.push({
            round: state.round || 1,
            speakerKey: 'balaajee',
            speakerName: 'Balaajee V.R.',
            role: 'Director of Product Design (Facilitator)',
            text
          });
          state.status = 'thinking';
          state.statusText = 'Sarah, Marcus & Elena are listening and formulating their response...';
        } else if (action === 'debrief') {
          state.status = 'debriefing';
          state.statusText = 'Silent Bar-Raiser Coach is scoring your facilitation and writing your debrief...';
        } else if (action === 'switch_scenario') {
          state.status = 'thinking';
          state.statusText = `Switching room to scenario: ${payload.scenarioId}...`;
        }
        state.updatedAt = new Date().toISOString();
        fs.writeFileSync(WAR_ROOM_STATE_FILE, JSON.stringify(state, null, 2));

        fs.mkdirSync(path.dirname(SCRATCH_TURN_FILE), { recursive: true });
        fs.writeFileSync(SCRATCH_TURN_FILE, JSON.stringify({
          timestamp: state.updatedAt,
          action,
          text,
          scenarioId: payload.scenarioId || null
        }, null, 2));

        res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
        res.end(JSON.stringify({ ok: true, status: state.status }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: err.message }));
      }
    });
    return;
  }

  let targetFile = decodedUrl === '/' ? 'index.html' : decodedUrl;

  // Clean Route Mappings
  if (decodedUrl === '/work' || decodedUrl === '/work.html' || decodedUrl === '/portfolio' || decodedUrl === '/selected-work') {
    res.writeHead(302, { 'Location': '/#featured-work' });
    res.end();
    return;
  }
  else if (decodedUrl === '/archive' || decodedUrl === '/visual-archive' || decodedUrl === '/visuals' || decodedUrl === '/gallery') targetFile = 'archive.html';
  else if (decodedUrl === '/leadership') targetFile = 'leadership.html';
  else if (decodedUrl === '/leadership-deck') targetFile = 'leadership-deck.html';
  else if (decodedUrl === '/cv' || decodedUrl === '/resume') targetFile = 'resume-swiss.html';
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
  else if (ext === '.json') contentType = 'application/json';
  else if (ext === '.mp4') contentType = 'video/mp4';
  else if (ext === '.mp3') contentType = 'audio/mpeg';
  else if (ext === '.m4a') contentType = 'audio/mp4';
  else if (ext === '.webm') contentType = 'video/webm';

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
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      });
      res.end(content);
    }
  });
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
