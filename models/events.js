import { getDatabase } from '../database.js';

export function createEvent(title, description, date, userId) {
  const db = getDatabase();
  const stmt = db.prepare('INSERT INTO events (title, description, date, user_id) VALUES (?, ?, ?, ?)');

  try {
    const result = stmt.run(title, description, date, userId);
    return { id: result.lastInsertRowid, title, description, date, userId };
  } catch (error) {
    throw error;
  }
}

export function updateEvent(id, title, description, date) {
  const db = getDatabase();
  const stmt = db.prepare('UPDATE events SET title = ?, description = ?, date = ? WHERE id = ?');

  try {
    stmt.run(title, description, date, id);
    return { id, title, description, date };
  } catch (error) {
    throw error;
  }
}

export function deleteEvent(id) {
  const db = getDatabase();
  const stmt = db.prepare('DELETE FROM events WHERE id = ?');

  try {
    stmt.run(id);
    return { id };
  } catch (error) {
    throw error;
  }
}

export function fetchEventById(id) {
  const db = getDatabase();
  const stmt = db.prepare('SELECT * FROM events WHERE id = ?');

  try {
    const event = stmt.get(id);
    return event;
  } catch (error) {
    throw error;
  }
}

export function fetchAllEvents() {
  const db = getDatabase();
  const stmt = db.prepare('SELECT * FROM events');

  try {
    const events = stmt.all();
    return events;
  } catch (error) {
    throw error;
  }
}
