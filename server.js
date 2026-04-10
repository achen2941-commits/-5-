const express = require('express');
const path = require('path');
const db = require('./db');

const app = express();
app.use(express.json());

// 简单 CORS 支持，允许本地文件或其他来源访问 API
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// API: 添加会员
app.post('/api/members', (req, res) => {
  const { name, email, phone, note } = req.body || {};
  if (!name || !email) return res.status(400).json({ error: 'name and email required' });

  const stmt = db.prepare('INSERT INTO members (name,email,phone,note) VALUES (?,?,?,?)');
  stmt.run(name, email, phone || null, note || null, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID });
  });
  stmt.finalize();
});

// API: 列出会员（示例）
app.get('/api/members', (req, res) => {
  db.all('SELECT id,name,email,phone,note,created_at FROM members ORDER BY id DESC LIMIT 100', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// 可选：托管静态文件（若将站点放到 public/ 下）
const publicDir = path.join(__dirname, 'public');
app.use(express.static(publicDir));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
