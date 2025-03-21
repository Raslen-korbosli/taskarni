import { Router } from 'express';
import { getTeam } from '../controllers/teamController';

const router = Router();

router.route('/').get(getTeam);
export default router;
