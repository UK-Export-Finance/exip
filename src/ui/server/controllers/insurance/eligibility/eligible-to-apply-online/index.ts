import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import corePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import canCreateAnApplication from '../../../../helpers/can-create-an-application';
import application from '../../../../helpers/create-an-application';
import { Request, Response } from '../../../../../types';

const {
  INSURANCE_ROOT,
  ALL_SECTIONS,
  ELIGIBILITY: { HAVE_AN_ACCOUNT },
  DASHBOARD,
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

export const PAGE_VARIABLES = {
  PAGE_CONTENT_STRINGS: PAGES.INSURANCE.ELIGIBILITY.ELIGIBLE_TO_APPLY_ONLINE,
};

export const TEMPLATE = TEMPLATES.INSURANCE.ELIGIBILITY.ELIGIBLE_TO_APPLY_ONLINE;

/**
 * get
 * Render the "Eligible to apply online" page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} "Eligible to apply online" page
 */
export const get = (req: Request, res: Response) =>
  res.render(TEMPLATE, { ...corePageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer }), userName: getUserNameFromSession(req.session.user) });

/**
 * post
 * Post the "Eligible to apply online" form.
 * If there are valid eligibility answers in the session,
 * create an application before redirecting.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow
 */
export const post = async (req: Request, res: Response) => {
  try {
    if (req.session.user) {
      console.info('Eligible to apply online - user is signed in %s', req.session.user.id);

      if (canCreateAnApplication(req.session)) {
        console.info('Eligible to apply online - can create an application for user %s', req.session.user.id);

        const createdApplication = await application.create(req.session.submittedData.insuranceEligibility, req.session.user.id);

        if (!createdApplication.success) {
          console.error('Error creating application');

          return res.redirect(PROBLEM_WITH_SERVICE);
        }

        if (createdApplication.success) {
          req.session.submittedData.insuranceEligibility = {};

          const applicationUrl = `${INSURANCE_ROOT}/${createdApplication.referenceNumber}${ALL_SECTIONS}`;

          return res.redirect(applicationUrl);
        }
      }

      /**
       * User is signed in, but cannot create an application.
       * Therefore, redirect to the dashboard.
       */
      return res.redirect(DASHBOARD);
    }

    /**
     * User is not signed in.
     * Therefore, redirect to account creation/sign in flow.
     */
    return res.redirect(HAVE_AN_ACCOUNT);
  } catch (error) {
    console.error('Error creating application %O', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
