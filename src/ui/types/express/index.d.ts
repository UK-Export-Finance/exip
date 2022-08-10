export { }
import { RequestSession } from '../index';


declare global {
  namespace Express {
    interface Request {
      session: RequestSession
    }
  }
}
