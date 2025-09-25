import { Router } from 'express';
import Joi from 'joi';
import pool from '../db/pool.js';
import { authMiddleware, requireRoles } from '../utils/auth.js';

const router = Router();

const eventSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  description: Joi.string().allow('').max(2000).optional(),
  location: Joi.string().max(255).required(),
  start_time: Joi.date().iso().required(),
  end_time: Joi.date().iso().required(),
  capacity: Joi.number().integer().min(1).required(),
});

router.get('/', async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, title, description, location, start_time, end_time, capacity, created_by FROM events ORDER BY start_time ASC'
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM events WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Event not found' });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

router.post('/', authMiddleware, requireRoles('organizer', 'admin'), async (req, res, next) => {
  try {
    const { value, error } = eventSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const { title, description, location, start_time, end_time, capacity } = value;
    const [result] = await pool.query(
      'INSERT INTO events (title, description, location, start_time, end_time, capacity, created_by) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, description || '', location, new Date(start_time), new Date(end_time), capacity, req.user.id]
    );
    const [rows] = await pool.query('SELECT * FROM events WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', authMiddleware, requireRoles('organizer', 'admin'), async (req, res, next) => {
  try {
    const { value, error } = eventSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    const eventId = req.params.id;

    // Ensure owner or admin
    const [existing] = await pool.query('SELECT created_by FROM events WHERE id = ?', [eventId]);
    if (!existing.length) return res.status(404).json({ message: 'Event not found' });
    const isOwner = existing[0].created_by === req.user.id;
    if (!isOwner && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });

    const { title, description, location, start_time, end_time, capacity } = value;
    await pool.query(
      'UPDATE events SET title=?, description=?, location=?, start_time=?, end_time=?, capacity=? WHERE id=?',
      [title, description || '', location, new Date(start_time), new Date(end_time), capacity, eventId]
    );
    const [rows] = await pool.query('SELECT * FROM events WHERE id = ?', [eventId]);
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', authMiddleware, requireRoles('organizer', 'admin'), async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const [existing] = await pool.query('SELECT created_by FROM events WHERE id = ?', [eventId]);
    if (!existing.length) return res.status(404).json({ message: 'Event not found' });
    const isOwner = existing[0].created_by === req.user.id;
    if (!isOwner && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });

    await pool.query('DELETE FROM events WHERE id = ?', [eventId]);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;


