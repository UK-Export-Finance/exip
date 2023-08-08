import { Request, Response } from '../../../../types';

const post = (req: Request, res: Response) => {
  console.log('Headers = ', req.headers); // eslint-disable-line no-console
  console.log('Referrer', req.headers.referer); // eslint-disable-line no-console

  req.session.cookieConsentNewDecision = true;

  return res.redirect(req.headers.referer);
};

export default post;
