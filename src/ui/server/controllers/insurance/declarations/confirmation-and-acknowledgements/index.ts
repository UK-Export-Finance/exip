import { PAGES, ERROR_MESSAGES } from '../../../../content-strings';
import { FIELD_IDS, TEMPLATES, ROUTES } from '../../../../constants';
import { DECLARATIONS_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance/declarations';
import api from '../../../../api';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import keystoneDocumentRendererConfig from '../../../../helpers/keystone-document-renderer-config';
import generateValidationErrors from '../../../../shared-validation/yes-no-radios-form';
import save from '../save-data';
import { Request, Response } from '../../../../../types';

const FIELD_ID = FIELD_IDS.INSURANCE.DECLARATIONS.AGREE_CONFIRMATION_ACKNOWLEDGEMENTS;

const { INSURANCE, PROBLEM_WITH_SERVICE } = ROUTES;

const {
  INSURANCE_ROOT,
  DECLARATIONS: { CONFIRMATION_AND_ACKNOWLEDGEMENTS_SAVE_AND_BACK, HOW_DATA_WILL_BE_USED },
} = INSURANCE;

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * * @param {Number} Application reference number
 * @returns {Object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  FIELD: {
    ID: FIELD_ID,
    ...FIELDS[FIELD_ID],
  },
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${CONFIRMATION_AND_ACKNOWLEDGEMENTS_SAVE_AND_BACK}`,
});

export const TEMPLATE = TEMPLATES.INSURANCE.DECLARATIONS.DECLARATION;

/**
 * get
 * Render the Declarations - Confirmation and acknowledgements page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Declarations - Confirmation and acknowledgements page
 */
export const get = async (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const { referenceNumber } = req.params;
  const refNumber = Number(referenceNumber);

  try {
    const declarationContent = await api.keystone.application.declarations.getLatestConfirmationAndAcknowledgement();

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.DECLARATIONS.CONFIRMATION_AND_ACKNOWLEDGEMENTS,
        BACK_LINK: req.headers.referer,
      }),
      ...pageVariables(refNumber),
      documentContent: declarationContent.content.document,
      documentConfig: keystoneDocumentRendererConfig(),
      application,
    });
  } catch (err) {
    console.error("Error getting declarations - confirmation and acknowledgements and rendering 'confirmation and acknowledgements' page ", { err });

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

/**
 * post
 * Check Declarations - Confirmation and acknowledgements validation errors and if successful, redirect to the next part of the flow.
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
      const declarationContent = await api.keystone.application.declarations.getLatestConfirmationAndAcknowledgement();

      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.DECLARATIONS.CONFIRMATION_AND_ACKNOWLEDGEMENTS,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(refNumber),
        documentContent: declarationContent.content.document,
        documentConfig: keystoneDocumentRendererConfig(),
        validationErrors,
      });
    } catch (err) {
      console.error("Error getting declarations - confirmation and acknowledgements and rendering 'confirmation and acknowledgements' page ", { err });

      return res.redirect(PROBLEM_WITH_SERVICE);
    }
  }

  try {
    // save the application
    const saveResponse = await save.declaration(application, req.body);

    if (!saveResponse) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${HOW_DATA_WILL_BE_USED}`);
  } catch (err) {
    console.error('Error updating application - declarations - confirmation and acknowledgements ', { err });

    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};
