const express = require('express');
const cors = require('cors');
const { events, createEvent } = require('./data');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;

// Obtener todos los eventos
app.get('/api/events', (req, res) => {
  res.json(events);
});

// Obtener un evento por ID
app.get('/api/events/:id', (req, res) => {
  const event = events.find(e => e.id === req.params.id);
  if (!event) return res.status(404).json({ error: 'No encontrado' });
  res.json(event);
});

// Crear evento
app.post('/api/events', (req, res) => {
  const newEvent = createEvent(req.body);
  res.status(201).json(newEvent);
});

// Actualizar evento
app.put('/api/events/:id', (req, res) => {
  const index = events.findIndex(e => e.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'No encontrado' });

  events[index] = { ...events[index], ...req.body };
  res.json(events[index]);
});

// Eliminar evento
app.delete('/api/events/:id', (req, res) => {
  const index = events.findIndex(e => e.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'No encontrado' });

  events.splice(index, 1);
  res.status(204).send();
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Backend corriendo en http://localhost:${PORT}`);
});