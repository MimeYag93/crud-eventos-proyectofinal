//Crear un enrutador modular para agrupar las rutas de autenticación (login y registro)
const express = require('express');
const router = express.Router();
// Se crea un arreglo para almacenar usuarios en memoria. 

let users = []; // temporal en memoria // Por estar sin base de datos }
// Ruta de registro 
// Definir una ruta POST 
router.post('/register', (req, res) => {
  const { email, password } = req.body; // Extrae email y password del cuerpo de la solicitud JSON 
  if (users.find(u => u.email === email)) { // Verifica si ya existe un usuario con ese email. Si sí, devuelve error 400
    return res.status(400).json({ error: 'Usuario ya registrado' });
  }
  users.push({ email, password }); //Si no existe, lo añade al arreglo users.
  res.status(201).json({ message: 'Registrado con éxito' }); // Responde con éxito (201 creado).
});
// Ruta de logeo 
router.post('/login', (req, res) => { //De la ruta POST Extrae email y password del cuerpo de la solicitud JSON
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password); // Busca si hay un usuario que coincida con las credenciales.
  if (user) {
    res.json({ message: 'Login exitoso', user });
  } else {
    res.status(401).json({ error: 'Credenciales inválidas' }); // Si existe, responde con éxito. Si no, error 401 (no autorizado).
  }
});

module.exports = router; //Exporta el enrutador para usarlo en el archivo principal (index.js).