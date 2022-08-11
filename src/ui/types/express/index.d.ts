/* eslint-disable no-unused-vars */
export {};
import { RequestSession } from '../index';

declare global {
  namespace Express {
    interface Request {
      session: RequestSession;
    }
  }
}
