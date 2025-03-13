import { createUser, verifyUserCredentials } from '../models/users.js';
import validator from 'validator';
import { generateToken } from '../utils/auth.js';

export async function signup(req, res) {
  const { username, password } = req.body;

  if (!validator.isEmail(username)) {
    return res.status(400).send('Invalid email format');
  }

  if (!validator.isLength(password, { min: 6 })) {
    return res.status(400).send('Password must be at least 6 characters long');
  }

  try {
    const user = await createUser(username, password);
    const token = generateToken({ id: user.id, username: user.username });
    res.status(201).json({ message: 'User registered successfully', user: { id: user.id, username: user.username }, token: token });
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      res.status(409).send('Username already exists');
    } else {
      res.status(500).send(error.message);
    }
  }
};

export async function login(req, res) {
  const { username, password } = req.body;

  try {
    const user = await verifyUserCredentials(username, password);
    if (user) {
      const token = generateToken({ id: user.id, username: user.username });
      res.status(200).json({ message: 'Login successful', user: { id: user.id, username: user.username }, token: token });
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    res.status(500).send('Internal server error');
  }
};
