import express from 'express';
import cors from 'cors';

import usersRoutes from './routes/users.routes.js';
import authRoutes from './routes/auth.routes.js';
import studentsRoutes from './routes/students.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
  res.json({
    message: 'Backend funcionando correctamente'
  });
});

app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/students', studentsRoutes);
app.use('/api/dashboard', dashboardRoutes);

export default app;