import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import { PAGES } from '../../../../content-strings';
import { FIELDS } from '../../../../content-strings/fields/insurance';
import { Request, Response } from '../../../../../types';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';

const { INSURANCE_ROOT } = ROUTES.INSURANCE;
const { POLICY_AND_EXPORTS } = FIELD_IDS.INSURANCE;
const {
  INSURANCE: {
    POLICY_AND_EXPORTS: { CHECK_YOUR_ANSWERS_SAVE_AND_BACK },
    EXPORTER_BUSINESS: { COMPANY_DETAILS_ROOT },
  },
} = ROUTES;

export const pageVariables = (referenceNumber: number) => ({
  FIELD: FIELDS[POLICY_AND_EXPORTS.POLICY_TYPE],
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS_SAVE_AND_BACK}`,
});

export const TEMPLATE = TEMPLATES.INSURANCE.POLICY_AND_EXPORTS.CHECK_YOUR_ANSWERS;

/**
 * get
 * Get the application and render Type of policy and exports - check your answers page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Type of policy and exports - check your answers page
 */
export const get = (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }

  const { referenceNumber } = req.params;
  const refNumber = Number(referenceNumber);

  return res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY_AND_EXPORTS.CHECK_YOUR_ANSWERS,
      BACK_LINK: req.headers.referer,
    }),
    ...pageVariables(refNumber),
    application,
  });
};

/**
 * post
 * Redirect to the next part of the flow.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow
 */
export const post = (req: Request, res: Response) => {
  const { referenceNumber } = req.params;

  return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${COMPANY_DETAILS_ROOT}`);
};
