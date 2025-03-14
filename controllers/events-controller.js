import {
  createEvent as createEventModel,
  updateEvent, deleteEvent as deleteEventModel,
  fetchAllEvents, fetchEventById
} from '../models/events.js';

export function createEvent(req, res) {
  const { title, description, date } = req.body;

  try {
    const event = createEventModel(title, description, date);
    res.status(201).json({ message: 'Event created successfully', event });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export function editEvent(req, res) {
  const { id } = req.params;
  const { title, description, date } = req.body;

  try {
    const event = updateEvent(id, title, description, date);
    res.status(200).json({ message: 'Event updated successfully', event });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export function deleteEvent(req, res) {
  const { id } = req.params;

  try {
    deleteEventModel(id);
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export function getAllEvents(_req, res) {
  try {
    const events = fetchAllEvents();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export function getSingleEvent(req, res) {
  const { id } = req.params;

  try {
    const event = fetchEventById(id);
    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}
