import { Request, Response } from '../../../types';

export const csrf = () =>
  function csrfToken(req: Request, res: Response, next: () => void) {
    res.locals.csrfToken = req.csrfToken();
    next();
  };
