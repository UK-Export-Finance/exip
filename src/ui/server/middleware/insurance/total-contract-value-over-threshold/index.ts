import { Next, Request, Response } from '../../../../types';
import { TOTAL_CONTRACT_VALUE } from '../../../constants';

/**
 * totalContractValueOverThreshold
 * checks if eligibility totalContractValue is above or below threshold
 * if below, then sets application totalContractValueOverThreshold to false
 * if above, then sets application totalContractValueOverThreshold to true
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 * @returns {Next}
 */
const totalContractValueOverThreshold = (req: Request, res: Response, next: Next) => {
  if (res.locals.application) {
    const { application } = res.locals;

    if (application?.eligibility?.totalContractValue?.value === TOTAL_CONTRACT_VALUE.MORE_THAN_250K.VALUE) {
      res.locals.application.totalContractValueOverThreshold = true;
    } else {
      res.locals.application.totalContractValueOverThreshold = false;
    }
  }

  return next();
};

export default totalContractValueOverThreshold;
