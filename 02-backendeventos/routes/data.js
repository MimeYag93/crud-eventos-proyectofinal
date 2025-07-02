const { v4: uuidv4 } = require('uuid');

const events = [];

function createEvent(data) {
  const newEvent = { id: uuidv4(), ...data };
  events.push(newEvent);
  return newEvent;
}

module.exports = { events, createEvent };