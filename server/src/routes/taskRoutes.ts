import { Router } from 'express';
import {
  createTask,
  getTasks,
  updateTask,
  getUserTasks,
} from '../controllers/taskController';

const router = Router();

router.route('/').get(getTasks).post(createTask);
router.route('/all').get(getUserTasks);
router.route('/:taskId/status').patch(updateTask);
export default router;
