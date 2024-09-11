// src/routes/source/index.routes.ts
import { Router } from "express";

import roleRoutes from "./role.routes";

const router = Router();

router.use(roleRoutes);

export default router;
