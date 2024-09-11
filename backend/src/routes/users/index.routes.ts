// src/routes/source/index.routes.ts
import { Router } from "express";

import UserRoutes from "./user.routes";

const router = Router();

router.use(UserRoutes);

export default router;
