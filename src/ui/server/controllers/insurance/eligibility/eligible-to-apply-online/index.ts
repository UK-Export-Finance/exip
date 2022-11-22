import { PAGES } from '../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES, ROOT } from '../../../../constants/routes/insurance';
import corePageVariables from '../../../../helpers/page-variables/core/insurance';
import api from '../../../../api';

import { Request, Response } from '../../../../../types';

const PAGE_VARIABLES = {
  PAGE_CONTENT_STRINGS: PAGES.INSURANCE.ELIGIBILITY.ELIGIBLE_TO_APPLY_ONLINE,
};

const get = (req: Request, res: Response) =>
  res.render(TEMPLATES.INSURANCE.ELIGIBILITY.ELIGIBLE_TO_APPLY_ONLINE, corePageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer }));

// const post = (req: Request, res: Response) => res.redirect(ROUTES.INSURANCE.ELIGIBILITY.ALREADY_HAVE_ACCOUNT);

const post = async (req: Request, res: Response) => {
  try {
    const eligibilityAnswers = req.session.submittedData.insuranceEligibility;

    const application = await api.keystone.createApplication(eligibilityAnswers);

    if (!application) {
      console.error('Error creating application');
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    const { referenceNumber } = application;

    return res.redirect(`${ROOT}/${referenceNumber}${INSURANCE_ROUTES.ALL_SECTIONS}`);
  } catch (err) {
    console.error('Error creating application ', { err });
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};

export { PAGE_VARIABLES, get, post };
