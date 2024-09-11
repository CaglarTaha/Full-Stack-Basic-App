// src/routes/source/index.routes.ts
import { Router } from "express";

import taskRoutes from './task.routes'

const router = Router();

router.use(taskRoutes);

export default router;
