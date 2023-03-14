import { PAGES, ERROR_MESSAGES } from '../../../../content-strings';
import { FIELD_IDS, TEMPLATES, ROUTES } from '../../../../constants';
import { DECLARATIONS_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance/declarations';
import { Request, Response } from '../../../../../types';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import api from '../../../../api';
import generateValidationErrors from '../../../../shared-validation/yes-no-radios-form';

const FIELD_ID = FIELD_IDS.INSURANCE.DECLARATIONS.AGREE_CONFIDENTIALITY;

const { INSURANCE, PROBLEM_WITH_SERVICE } = ROUTES;

const {
  INSURANCE_ROOT,
  ALL_SECTIONS,
  DECLARATIONS: { ANTI_BRIBERY },
} = INSURANCE;

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {Number} Application reference number
 * @returns {Object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  FIELD: {
    ID: FIELD_ID,
    ...FIELDS[FIELD_ID],
  },
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`,
});

export const TEMPLATE = TEMPLATES.INSURANCE.DECLARATIONS.CONFIDENTIALITY;

/**
 * get
 * Render the Declarations - confidentiality
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Dashboard page
 */
export const get = async (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const { referenceNumber } = req.params;
  const refNumber = Number(referenceNumber);

  try {
    const confidentialityContent = await api.keystone.application.declarations.getLatestConfidentiality();

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.DECLARATIONS.CONFIDENTIALITY,
        BACK_LINK: req.headers.referer,
      }),
      ...pageVariables(refNumber),
      content: confidentialityContent.content.document,
    });
  } catch (err) {
    console.error("Error getting declarations - confidentiality and rendering 'confidentiality' page ", { err });

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

/**
 * post
 * Check Declarations - confidentiality validation errors and if successful, redirect to the next part of the flow.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow or error page
 */
export const post = async (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const { referenceNumber } = req.params;
  const refNumber = Number(referenceNumber);

  const validationErrors = generateValidationErrors(req.body, FIELD_ID, ERROR_MESSAGES.INSURANCE.DECLARATIONS[FIELD_ID].IS_EMPTY);

  if (validationErrors) {
    try {
      const confidentialityContent = await api.keystone.application.declarations.getLatestConfidentiality();

      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.DECLARATIONS.CONFIDENTIALITY,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(refNumber),
        content: confidentialityContent.content.document,
        validationErrors,
      });
    } catch (err) {
      console.error("Error getting declarations - confidentiality and rendering 'confidentiality' page ", { err });

      return res.redirect(PROBLEM_WITH_SERVICE);
    }
  }

  return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${ANTI_BRIBERY}`);
};
