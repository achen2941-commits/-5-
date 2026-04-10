const https = require('https');

function postMember(cb) {
  const data = JSON.stringify({ name: '测试隧道', email: 'tunnel@example.com' });
  const url = process.env.TUNNEL_URL || 'https://beige-comics-hear.loca.lt/api/members';
  const opts = new URL(url);
  opts.method = 'POST';
  opts.headers = {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data),
  };

  const req = https.request(opts, (res) => {
    let body = '';
    res.on('data', (c) => (body += c));
    res.on('end', () => {
      console.log('POST', res.statusCode, body);
      cb && cb();
    });
  });

  req.on('error', (e) => {
    console.error('POST error', e.message);
    cb && cb(e);
  });

  req.write(data);
  req.end();
}

function getMembers() {
  const url = process.env.TUNNEL_URL || 'https://beige-comics-hear.loca.lt/api/members';
  https.get(url, (res) => {
    let body = '';
    res.on('data', (c) => (body += c));
    res.on('end', () => {
      console.log('GET', res.statusCode, body);
    });
  }).on('error', (e) => console.error('GET error', e.message));
}

postMember((err) => {
  if (err) process.exit(1);
  setTimeout(getMembers, 500);
});
