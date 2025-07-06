// Dos funciones para enviar solicitudes al backend (registro y login).
// Se usa fetch() para enviar datos como JSON.

export const registerUser = async (data:  { email: string; password: string }) =>
  fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

export const loginUser = async (data:  { email: string; password: string }) =>
  fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });