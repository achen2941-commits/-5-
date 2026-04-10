const http = require('http');

function postMember(cb) {
  const data = JSON.stringify({ name: '测试', email: 'test@example.com' });
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/members',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data),
    },
  };

  const req = http.request(options, (res) => {
    let body = '';
    res.on('data', (c) => (body += c));
    res.on('end', () => {
      console.log('POST', res.statusCode, body);
      cb && cb();
    });
  });

  req.on('error', (e) => {
    console.error('POST error', e);
    cb && cb(e);
  });

  req.write(data);
  req.end();
}

function getMembers() {
  http.get('http://localhost:3000/api/members', (res) => {
    let body = '';
    res.on('data', (c) => (body += c));
    res.on('end', () => {
      console.log('GET', res.statusCode, body);
    });
  }).on('error', (e) => console.error('GET error', e));
}

postMember((err) => {
  if (err) process.exit(1);
  setTimeout(getMembers, 500);
});
