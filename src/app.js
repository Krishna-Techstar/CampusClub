import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { errorHandler, notFound } from './middleware/error.js';
import authRouter from './routes/auth.js';
import eventsRouter from './routes/events.js';
import registrationsRouter from './routes/registrations.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: '*'}));
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRouter);
app.use('/api/events', eventsRouter);
app.use('/api/registrations', registrationsRouter);

app.use(notFound);
app.use(errorHandler);

export default app;


