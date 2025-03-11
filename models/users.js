import { getDatabase } from '../database.js';

export function createUser(username, password) {
  const db = getDatabase();
  const stmt = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
  stmt.run(username, password);
}

export function findUser(username, password) {
  const db = getDatabase();
  const stmt = db.prepare('SELECT * FROM users WHERE username = ? AND password = ?');
  return stmt.get(username, password);
}
