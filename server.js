const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Rota para criar um livro
app.post('/livros', (req, res) => {
  const { nome, valor } = req.body;
  const sql = 'INSERT INTO livros (nome, valor) VALUES (?, ?)';
  db.run(sql, [nome, valor], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID });
  });
});

// Rota para listar todos os livros
app.get('/livros', (req, res) => {
  const sql = 'SELECT * FROM livros';
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Rota para atualizar um livro
app.put('/livros/:id', (req, res) => {
  const { id } = req.params;
  const { nome, valor } = req.body;
  const sql = 'UPDATE livros SET nome = ?, valor = ? WHERE id = ?';
  db.run(sql, [nome, valor, id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ changes: this.changes });
  });
});

// Rota para deletar um livro
app.delete('/livros/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM livros WHERE id = ?';
  db.run(sql, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ changes: this.changes });
  });
});

// Inicializa o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

const path = require('path');

// Servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));
