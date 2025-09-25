import { Router } from 'express';
import pool from '../db/pool.js';
import { authMiddleware } from '../utils/auth.js';

const router = Router();

router.post('/:eventId', authMiddleware, async (req, res, next) => {
  try {
    const eventId = req.params.eventId;
    const userId = req.user.id;

    const [events] = await pool.query('SELECT id, capacity FROM events WHERE id = ?', [eventId]);
    if (!events.length) return res.status(404).json({ message: 'Event not found' });

    const [countRows] = await pool.query('SELECT COUNT(*) AS count FROM registrations WHERE event_id = ?', [eventId]);
    const registeredCount = countRows[0].count;
    if (registeredCount >= events[0].capacity) return res.status(400).json({ message: 'Event is full' });

    await pool.query('INSERT IGNORE INTO registrations (event_id, user_id) VALUES (?, ?)', [eventId, userId]);
    res.status(201).json({ message: 'Registered' });
  } catch (err) {
    next(err);
  }
});

router.delete('/:eventId', authMiddleware, async (req, res, next) => {
  try {
    const eventId = req.params.eventId;
    const userId = req.user.id;
    await pool.query('DELETE FROM registrations WHERE event_id = ? AND user_id = ?', [eventId, userId]);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

router.get('/my', authMiddleware, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const [rows] = await pool.query(
      `SELECT e.* FROM registrations r
       JOIN events e ON e.id = r.event_id
       WHERE r.user_id = ?
       ORDER BY e.start_time ASC`,
      [userId]
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

export default router;


