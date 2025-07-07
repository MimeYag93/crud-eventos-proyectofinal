const { v4: uuidv4 } = require('uuid');

let events = [
  {
    id: "1",
    title: "Evento 1",
    location: "Quito",
    date: "2025-07-08",
    category: "Cultural",
    type: "Presencial",
    lat: -0.1807,
    lng: -78.4678,
  },
  {
    id: "2",
    title: "Evento 2",
    location: "Guayaquil",
    date: "2025-07-10",
    category: "Tecnología",
    type: "Virtual",
    lat: -2.1962,
    lng: -79.8862,
  },
];

function createEvent(data) {
  const newEvent = { id: uuidv4(), ...data };
  events.push(newEvent);
  return newEvent;
}

module.exports = { events, createEvent };