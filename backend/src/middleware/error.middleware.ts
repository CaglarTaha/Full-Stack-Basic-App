// src/middleware/error.middleware.ts
import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error caught by error middleware:', error);

  const status = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  res.status(status).json({ error: message });
};
