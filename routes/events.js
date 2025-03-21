import express from 'express';
import {
  createEvent, editEvent, deleteEvent, getAllEvents,
  getSingleEvent, registerEvent, unregisterEvent
} from '../controllers/events-controller.js';
import { authenticateToken } from '../utils/auth.js';

const router = express.Router();

router.post('/', authenticateToken, createEvent);
router.put('/:id', authenticateToken, editEvent);
router.delete('/:id', authenticateToken, deleteEvent);
router.get('/', getAllEvents);
router.get('/:id', getSingleEvent);
router.post('/:id/register', authenticateToken, registerEvent);
router.post('/:id/unregister', authenticateToken, unregisterEvent);

export default router;
