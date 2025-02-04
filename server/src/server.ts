import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import projectRouter from './routes/projectRoutes';
import taskRouter from './routes/taskRoutes';
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
// /routes
app.get('/', (req, res) => {
  res.send('this is home');
});
app.use('/projects', projectRouter);
app.use('/tasks', taskRouter);
// /server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log('server running on port' + PORT);
});
