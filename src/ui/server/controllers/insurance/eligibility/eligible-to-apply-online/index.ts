import { PAGES } from '../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../constants';
import corePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import canCreateAnApplication from '../../../../helpers/can-create-an-application';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import api from '../../../../api';
import { Request, Response } from '../../../../../types';

const {
  INSURANCE: {
    INSURANCE_ROOT,
    ALL_SECTIONS,
    ELIGIBILITY: { ACCOUNT_TO_APPLY_ONLINE },
    PROBLEM_WITH_SERVICE,
  },
} = ROUTES;

export const PAGE_VARIABLES = {
  PAGE_CONTENT_STRINGS: PAGES.INSURANCE.ELIGIBILITY.ELIGIBLE_TO_APPLY_ONLINE,
};

export const TEMPLATE = TEMPLATES.INSURANCE.ELIGIBILITY.ELIGIBLE_TO_APPLY_ONLINE;

export const get = (req: Request, res: Response) =>
  res.render(TEMPLATE, { ...corePageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer }), userName: getUserNameFromSession(req.session.user) });

export const post = async (req: Request, res: Response) => {
  try {
    /**
     * If there are eligibility answers in the session:
     * 1) Sanitise and store eligibility answers.
     * 2) Remove eligibility answers from the session.
     * 3) Create an application
     * 4) Redirect to the application
     */
    if (req.session.user && canCreateAnApplication(req.session)) {
      const eligibilityAnswers = sanitiseData(req.session.submittedData.insuranceEligibility);

      req.session.submittedData.insuranceEligibility = {};

      const application = await api.keystone.application.create(eligibilityAnswers, req.session.user.id);

      if (!application) {
        console.error('Error creating application');

        return res.redirect(PROBLEM_WITH_SERVICE);
      }

      const applicationUrl = `${INSURANCE_ROOT}/${application.referenceNumber}${ALL_SECTIONS}`;

      return res.redirect(applicationUrl);
    }

    // otherwise, redirect to the next part of the flow - account creation/sign in
    return res.redirect(ACCOUNT_TO_APPLY_ONLINE);
  } catch (err) {
    console.error('Error creating application ', { err });
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
