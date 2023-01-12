import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import { PAGES } from '../../../../content-strings';
import { FIELDS } from '../../../../content-strings/fields/insurance';
import { Request, Response } from '../../../../../types';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import { objectHasValues } from '../../../../helpers/object';
import generateValidationErrors from './validation';
import { isMultiPolicyType, isSinglePolicyType } from '../../../../helpers/policy-type';
import mapAndSave from '../map-and-save';

const { INSURANCE_ROOT } = ROUTES.INSURANCE;
const { POLICY_AND_EXPORTS } = FIELD_IDS.INSURANCE;
const { INSURANCE } = ROUTES;

export const pageVariables = (referenceNumber: number) => ({
  FIELD: FIELDS[POLICY_AND_EXPORTS.POLICY_TYPE],
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY_SAVE_AND_BACK}`,
});

const FIELD_ID = POLICY_AND_EXPORTS.POLICY_TYPE;

export const TEMPLATE = TEMPLATES.INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY;

/**
 * get
 * Get the application and render the Type of policy page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Type of policy page
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
      PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY,
      BACK_LINK: req.headers.referer,
    }),
    ...pageVariables(refNumber),
    application,
  });
};

/**
 * post
 * Check Type of policy validation errors and if successful, send to the API and redirect to the next part of the flow.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow or error page
 */
export const post = async (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }

  const { referenceNumber } = req.params;
  const refNumber = Number(referenceNumber);

  // check for form errors.
  const validationErrors = generateValidationErrors(req.body);

  if (objectHasValues(validationErrors)) {
    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY,
        BACK_LINK: req.headers.referer,
      }),
      ...pageVariables(refNumber),
      validationErrors,
    });
  }

  try {
    // save the application
    const saveResponse = await mapAndSave.policyAndExport(req.body, application);

    if (!saveResponse) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    if (isSinglePolicyType(req.body[FIELD_ID])) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${ROUTES.INSURANCE.POLICY_AND_EXPORTS.SINGLE_CONTRACT_POLICY}`);
    }
    if (isMultiPolicyType(req.body[FIELD_ID])) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${ROUTES.INSURANCE.POLICY_AND_EXPORTS.MULTIPLE_CONTRACT_POLICY}`);
    }

    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  } catch (err) {
    console.error('Error updating application', { err });

    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};
