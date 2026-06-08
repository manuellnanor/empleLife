const https = require("https");
const url = 'https://github.com/manuellnanor/empleLife/archive/refs/heads/main.zip';
const opts = { headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'application/octet-stream' } };
https.get(url, opts, (res) => {
  console.log('status', res.statusCode);
  console.log('location', res.headers.location || '(none)');
  console.log('content-type', res.headers['content-type']);
  res.on('data', () => {});
  res.on('end', () => console.log('end'));
}).on('error',(e)=>{ console.error('error',e.message); });
