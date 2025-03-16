import {
  createEvent as createEventModel,
  updateEvent, deleteEvent as deleteEventModel,
  fetchAllEvents, fetchEventById,
  registerEvent as registerEventModel, unregisterEvent as unregisterEventModel
} from '../models/events.js';

export function createEvent(req, res) {
  const { title, description, date } = req.body;

  try {
    if (!title || !description || !date || title.trim() === '' || description.trim() === '' || isNaN(Date.parse(date))) {
      return res.status(400).json({ message: 'Title, description, and date are required and must be valid values' });
    }

    const event = createEventModel(title, description, date, req.user.id);
    res.status(201).json({ message: 'Event created successfully', event });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export function editEvent(req, res) {
  const { id } = req.params;
  const { title, description, date } = req.body;
  if (!title || !description || !date || title.trim() === '' || description.trim() === '' || isNaN(Date.parse(date))) {
    return res.status(400).json({ message: 'Title, description, and date are required and must be valid values' });
  }

  try {
    const event = fetchEventById(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.user_id !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to edit this event' });
    }

    const updatedEvent = updateEvent(id, title, description, date);
    res.status(200).json({ message: 'Event updated successfully', updatedEvent });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export function deleteEvent(req, res) {
  const { id } = req.params;

  try {
    const event = fetchEventById(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.user_id !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to delete this event' });
    }

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

export function registerEvent(req, res) {
  const { id } = req.params;

  try {
    const event = fetchEventById(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    registerEventModel(id, req.user.id);
    res.status(200).json({ message: 'You have successfully registered for this event' });
  }
  catch (error) {
    res.status(500).send(error.message);
  }
}

export function unregisterEvent(req, res) {
  const { id } = req.params;

  try {
    const event = fetchEventById(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    unregisterEventModel(id, req.user.id);
    res.status(200).json({ message: 'You have successfully unregistered from this event' });
  }
  catch (error) {
    res.status(500).send(error.message);
  }
}