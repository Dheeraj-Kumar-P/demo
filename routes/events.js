import express from 'express';
import { createEvent, editEvent, deleteEvent, getAllEvents, getSingleEvent } from '../controllers/events-controller.js';
import { authenticateToken } from '../utils/auth.js';

const router = express.Router();

router.post('/', authenticateToken, createEvent);
router.put('/:id', authenticateToken, editEvent);
router.delete('/:id', authenticateToken, deleteEvent);
router.get('/', getAllEvents);
router.get('/:id', getSingleEvent);

export default router;
