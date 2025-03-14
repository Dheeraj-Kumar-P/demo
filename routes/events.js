import express from 'express';
import { createEvent, editEvent, deleteEvent, getAllEvents, getSingleEvent } from '../controllers/events-controller.js';

const router = express.Router();

router.post('/', createEvent);
router.put('/:id', editEvent);
router.delete('/:id', deleteEvent);
router.get('/', getAllEvents);
router.get('/:id', getSingleEvent);

export default router;
