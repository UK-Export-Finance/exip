import { ROUTES } from '../../constants';
import { Request, Response } from '../../../types';

const get = (req: Request, res: Response) => {
  // clean session data
  req.session.submittedData = {
    ...req.session.submittedData,
    quoteEligibility: {},
    insuranceEligibility: {},
  };

  return res.redirect(ROUTES.QUOTE.BUYER_COUNTRY);
};

export default get;
