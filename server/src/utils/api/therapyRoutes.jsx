import express from 'express';
import { getConversations } from '../../schemas/therapyController.jsx';

const router = express.Router();

router.post('/therapy', getConversations);

export default router;
