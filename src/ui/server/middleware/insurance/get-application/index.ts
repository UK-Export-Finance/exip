import { ROUTES } from '../../../constants';
import { Next, Request, Response } from '../../../../types';
import getApplication from '../../../helpers/get-application';

const getApplicationMiddleware = async (req: Request, res: Response, next: Next) => {
  const { referenceNumber } = req.params;

  if (referenceNumber) {
    try {
      const application = await getApplication(Number(referenceNumber));

      if (application) {
        res.locals.application = application;
        return next();
      }

      return res.redirect(ROUTES.INSURANCE.PAGE_NOT_FOUND);
    } catch (err) {
      console.error('Error getting application ', { err });

      return res.redirect(ROUTES.INSURANCE.PAGE_NOT_FOUND);
    }
  }

  return res.redirect(ROUTES.INSURANCE.PAGE_NOT_FOUND);
};

export default getApplicationMiddleware;
