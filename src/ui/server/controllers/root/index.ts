import { ROUTES } from '../../constants';
import { Request, Response } from '../../../types';

const get = (req: Request, res: Response) => {
  // new submitted data session
  req.session.submittedData = {};

  return res.redirect(ROUTES.QUOTE.BUYER_COUNTRY);
};

export default get;
