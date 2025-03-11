import { createUser, findUser } from '../models/users.js';
import validator from 'validator';

export function signup(req, res) {
  const { username, password } = req.body;

  if (!validator.isEmail(username)) {
    return res.status(400).send('Invalid email format');
  }

  if (!validator.isLength(password, { min: 6 })) {
    return res.status(400).send('Password must be at least 6 characters long');
  }

  debugger;
  try {
    createUser(username, password);
    res.status(201).send('User registered successfully');
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      res.status(409).send('Username already exists');
    } else {
      res.status(500).send('Internal server error');
    }
  }
};

export function login(req, res) {
  const { username, password } = req.body;
  const user = findUser(username, password);
  if (user) {
    res.status(200).send('Login successful');
  } else {
    res.status(401).send('Invalid credentials');
  }
};
