import { ROUTES } from '../../constants';
import { Request, Response } from '../../../types';

const get = (req: Request, res: Response) => {
  // new quote eligibility data in session
  req.session.submittedData = {
    ...req.session.submittedData,
    quoteEligibility: {},
  };

  return res.redirect(ROUTES.QUOTE.BUYER_COUNTRY);
};

export default get;
