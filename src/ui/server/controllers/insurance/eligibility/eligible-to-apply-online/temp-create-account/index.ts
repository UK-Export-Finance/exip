import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import { Request, Response } from '../../../../../../types';

export const post = async (req: Request, res: Response) => res.redirect(INSURANCE_ROUTES.ELIGIBILITY.ALREADY_HAVE_ACCOUNT);
