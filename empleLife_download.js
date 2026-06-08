const https = require("https");
const fs = require("fs");
const url = 'https://github.com/manuellnanor/empleLife/archive/refs/heads/main.zip';
const opts = { headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'application/octet-stream' } };
const file = fs.createWriteStream('empleLife_node.zip');
https.get(url, opts, (res) => {
  console.log('status', res.statusCode, 'content-type', res.headers['content-type']);
  res.pipe(file);
  file.on('finish', () => {
    file.close();
    const buf = Buffer.alloc(16);
    const fd = fs.openSync('empleLife_node.zip', 'r');
    fs.readSync(fd, buf, 0, 16, 0);
    fs.closeSync(fd);
    console.log('first bytes', buf.toString('hex'));
  });
}).on('error', (e) => {
  console.error('error', e.message);
});
