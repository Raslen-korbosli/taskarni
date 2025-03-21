import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import projectRouter from './routes/projectRoutes';
import taskRouter from './routes/taskRoutes';
import searchRouter from './routes/searchRoute';
import userRouter from './routes/userRoutes';
import teamRouter from './routes/teamRoutes';
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
app.use('/search', searchRouter);
app.use('/users', userRouter);
app.use('/teams', teamRouter);
// /server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log('server running on port ' + PORT);
});
