import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import { PAGES } from '../../../../content-strings';
import { FIELDS } from '../../../../content-strings/fields/insurance';
import { Request, Response } from '../../../../../types';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import generateValidationErrors from './validation';
import mapAndSave from '../map-and-save';

const {
  INSURANCE: {
    INSURANCE_ROOT,
    ALL_SECTIONS,
    POLICY_AND_EXPORTS: { ABOUT_GOODS_OR_SERVICES_SAVE_AND_BACK },
  },
} = ROUTES;

const {
  POLICY_AND_EXPORTS: { ABOUT_GOODS_OR_SERVICES },
} = FIELD_IDS.INSURANCE;

const { DESCRIPTION, FINAL_DESTINATION } = ABOUT_GOODS_OR_SERVICES;

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {Number} Application reference number
 * @returns {Object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  FIELDS: {
    DESCRIPTION: {
      ID: DESCRIPTION,
      ...FIELDS.ABOUT_GOODS_OR_SERVICES[DESCRIPTION],
    },
    FINAL_DESTINATION: {
      ID: FINAL_DESTINATION,
      ...FIELDS.ABOUT_GOODS_OR_SERVICES[FINAL_DESTINATION],
    },
  },
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${ABOUT_GOODS_OR_SERVICES_SAVE_AND_BACK}`,
});

export const TEMPLATE = TEMPLATES.INSURANCE.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES;

/**
 * get
 * Get the application and render the About goods or services page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} About goods or services page
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
      PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES,
      BACK_LINK: req.headers.referer,
    }),
    ...pageVariables(refNumber),
    application,
  });
};

/**
 * post
 * Check About goods or services validation errors and if successful, redirect to the next part of the flow.
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

  const validationErrors = generateValidationErrors(req.body);

  if (validationErrors) {
    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES,
        BACK_LINK: req.headers.referer,
      }),
      ...pageVariables(refNumber),
      application,
      submittedValues: req.body,
      validationErrors,
    });
  }

  try {
    // save the application
    const saveResponse = await mapAndSave.policyAndExport(req.body, application);

    if (!saveResponse) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`);
  } catch (err) {
    console.error('Error updating application', { err });

    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};
