import { getDatabase } from '../database.js';
import bcrypt from 'bcryptjs';

export async function createUser(username, password) {
  const db = getDatabase();
  const hashedPassword = await bcrypt.hash(password, 10);
  const stmt = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');

  try {
    const result = stmt.run(username, hashedPassword);
    return { id: result.lastInsertRowid, username };
  } catch (error) {
    throw error;
  }
}

export function findUser(username) {
  const db = getDatabase();
  const stmt = db.prepare('SELECT * FROM users WHERE username = ?');
  return stmt.get(username);
}

export async function verifyUserCredentials(username, password) {
  const db = getDatabase();
  const stmt = db.prepare('SELECT * FROM users WHERE username = ?');
  const user = stmt.get(username);

  if (user && await bcrypt.compare(password, user.password)) {
    return { id: user.id, username: user.username };
  } else {
    return null;
  }
}
