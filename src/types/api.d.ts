import type { NextFunction, Response, Request } from 'express';

export interface ErrorOperation {
  status?: number;
  message?: string;
  errors?: string[] | object[];
}

export interface ValidationByCodeProps {
  isUpdateOperation: boolean;
  findWithFKField?: boolean;
  req: Request;
  res: Response;
  next: NextFunction;
}
