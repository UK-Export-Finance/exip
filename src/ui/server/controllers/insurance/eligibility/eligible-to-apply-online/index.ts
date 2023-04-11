import { PAGES } from '../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import corePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import api from '../../../../api';

import { Request, Response } from '../../../../../types';

export const PAGE_VARIABLES = {
  PAGE_CONTENT_STRINGS: PAGES.INSURANCE.ELIGIBILITY.ELIGIBLE_TO_APPLY_ONLINE,
};

export const TEMPLATE = TEMPLATES.INSURANCE.ELIGIBILITY.ELIGIBLE_TO_APPLY_ONLINE;

export const get = (req: Request, res: Response) =>
  res.render(TEMPLATE, { ...corePageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer }), userName: getUserNameFromSession(req.session.user) });

export const post = async (req: Request, res: Response) => {
  try {
    // if user is logged in, create application.
    const eligibilityAnswers = sanitiseData(req.session.submittedData.insuranceEligibility);

    if (req.session.user && eligibilityAnswers) {
      const application = await api.keystone.application.create(eligibilityAnswers, req.session.user.id);

      if (!application) {
        console.error('Error creating application');
        return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
      }

      return res.redirect(INSURANCE_ROUTES.DASHBOARD);
    }

    // otherwise, redirect to the next part of the flow - account creation/sign in
    return res.redirect(INSURANCE_ROUTES.ELIGIBILITY.ACCOUNT_TO_APPLY_ONLINE);
  } catch (err) {
    console.error('Error creating application ', { err });
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};
