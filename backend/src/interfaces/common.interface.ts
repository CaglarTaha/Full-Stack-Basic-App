// src/interfaces/common.interface.ts
import { Request } from 'express';

export interface AuthenticatedUser {
  id: number;
  email: string;
  type: string;
}

export interface AuthenticatedRequest extends Request {
  user: AuthenticatedUser;
}

export interface BaseOutput {
  id: number;
  createDate: Date;
  updateDate: Date;
  active: boolean;
}