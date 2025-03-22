import { Router } from 'express';
import {
  createTask,
  getTasks,
  updateTask,
  getTasksDistributions,
} from '../controllers/taskController';

const router = Router();

router.route('/').get(getTasks).post(createTask);
router.route('/all').get(getTasksDistributions);
router.route('/:taskId/status').patch(updateTask);
export default router;
