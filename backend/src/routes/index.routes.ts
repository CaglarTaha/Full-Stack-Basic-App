// src/routes/index.routes.ts
import { Router } from "express";
import roleRoutes from "./roles/index.routes";
import userRoutes from "./users/index.routes";
import taskRoutes from "./tasks/index.routes"
const router = Router();

// Tüm router'ları bir listede topla
const allRoutes = [roleRoutes, userRoutes,taskRoutes];

for (const route of allRoutes) {
  router.use(route);
}

export default router;
