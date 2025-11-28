const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',      // your MySQL username
  password: 'Farhad2011!',      // your MySQL password
  database: 'eco_platform'
});

// Register
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, hashedPassword],
    (err, result) => {
      if (err) return res.status(400).json({ message: 'Email artıq mövcuddur' });
      res.json({ message: 'Uğurla qeydiyyatdan keçdi' });
    }
  );
});

// Login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Server xətası' });
    if (results.length === 0) return res.status(400).json({ message: 'Email tapılmadı' });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Şifrə düzgün deyil' });

    const token = jwt.sign({ id: user.id, name: user.name }, 'secret_key', { expiresIn: '1h' });
    res.json({ token });
  });
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));