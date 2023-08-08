import { Request, Response } from '../../../../types';

const post = (req: Request, res: Response) => {
  req.session.cookieConsentNewDecision = true;

  return res.redirect(req.headers.referer);
};

export default post;
