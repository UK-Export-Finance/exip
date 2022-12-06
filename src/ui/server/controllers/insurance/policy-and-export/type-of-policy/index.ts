import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import { PAGES } from '../../../../content-strings';
import { FIELDS } from '../../../../content-strings/fields/insurance';
import { Request, Response } from '../../../../../types';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import generateValidationErrors from './validation';
import api from '../../../../api';
import save from '../save-data';

const { POLICY_AND_EXPORTS } = FIELD_IDS.INSURANCE;
const { INSURANCE } = ROUTES;

const pageVariables = (referenceNumber: number) => ({
  FIELD: FIELDS[POLICY_AND_EXPORTS.POLICY_TYPE],
  SAVE_AND_BACK_URL: `${INSURANCE.INSURANCE_ROOT}/${referenceNumber}${INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY_SAVE_AND_BACK}`,
});

/**
 * get
 * Get the application and render the Type of policy page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Type of policy page
 */
const get = async (req: Request, res: Response) => {
  const { referenceNumber } = req.params;

  try {
    const refNumber = Number(referenceNumber);
    const application = await api.keystone.application.get(refNumber);

    if (!application) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    return res.render(TEMPLATES.INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY,
        BACK_LINK: req.headers.referer,
      }),
      ...pageVariables(refNumber),
      application,
    });
  } catch (err) {
    console.error('Error getting application ', { err });

    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};

/**
 * post
 * Check Type of policy validation errors and if successful, send to the API and redirect to the next part of the flow.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow or error page
 */
const post = async (req: Request, res: Response) => {
  try {
    const { referenceNumber } = req.params;
    const refNumber = Number(referenceNumber);

    // check for form errors.
    const validationErrors = generateValidationErrors(req.body);

    if (validationErrors) {
      return res.render(TEMPLATES.INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(refNumber),
        validationErrors,
      });
    }

    // save the application
    const saveResponse = await save.policyAndExport(Number(referenceNumber), req.body);

    if (!saveResponse) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    // redirect to next part of the flow
    return res.redirect(`${INSURANCE.INSURANCE_ROOT}/${referenceNumber}${INSURANCE.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES}`);
  } catch (err) {
    console.error('Error getting application', { err });

    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};

export { pageVariables, get, post };
