import express from 'express';
import { getTranslations } from '../../controllers/therapyController.jsx';

const router = express.Router();

router.post('/therapy', getTranslations);

export default router;
