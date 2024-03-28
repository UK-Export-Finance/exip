import { BUTTONS, PAGES, ERROR_MESSAGES } from '../../../../content-strings';
import { FIELD_IDS, TEMPLATES, ROUTES } from '../../../../constants';
import { DECLARATIONS_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance/declarations';
import api from '../../../../api';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import keystoneDocumentRendererConfig from '../../../../helpers/keystone-document-renderer-config';
import generateValidationErrors from '../../../../shared-validation/yes-no-radios-form';
import save from '../save-data';
import canSubmitApplication from '../../../../helpers/can-submit-application';
import { Request, Response } from '../../../../../types';

export const FIELD_ID = FIELD_IDS.INSURANCE.DECLARATIONS.AGREE_HOW_YOUR_DATA_WILL_BE_USED;

const {
  INSURANCE_ROOT,
  APPLICATION_SUBMITTED,
  DECLARATIONS: { HOW_YOUR_DATA_WILL_BE_USED_SAVE_AND_BACK },
  PROBLEM_WITH_SERVICE,
} = ROUTES.INSURANCE;

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
  SUBMIT_BUTTON_COPY: BUTTONS.SUBMIT_APPLICATION,
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${HOW_YOUR_DATA_WILL_BE_USED_SAVE_AND_BACK}`,
});

export const TEMPLATE = TEMPLATES.INSURANCE.DECLARATIONS.DECLARATION;

/**
 * get
 * Render the Declarations - How data will be used page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Declarations - How data will be used page
 */
export const get = async (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  try {
    const declarationContent = await api.keystone.application.declarations.getLatestHowDataWillBeUsed();

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.DECLARATIONS.HOW_YOUR_DATA_WILL_BE_USED,
        BACK_LINK: req.headers.referer,
      }),
      ...pageVariables(application.referenceNumber),
      userName: getUserNameFromSession(req.session.user),
      documentContent: declarationContent.content.document,
      documentConfig: keystoneDocumentRendererConfig(),
      application: mapApplicationToFormFields(res.locals.application),
    });
  } catch (err) {
    console.error("Error getting declarations - how data will be used and rendering 'how data will be used' page %O", err);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

/**
 * post
 * Check Declarations - How data will be used validation errors and if successful, redirect to the next part of the flow.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow or error page
 */
export const post = async (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const { referenceNumber } = application;

  const payload = constructPayload(req.body, [FIELD_ID]);

  const validationErrors = generateValidationErrors(payload, FIELD_ID, ERROR_MESSAGES.INSURANCE.DECLARATIONS[FIELD_ID].IS_EMPTY);

  if (validationErrors) {
    try {
      const declarationContent = await api.keystone.application.declarations.getLatestHowDataWillBeUsed();

      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.DECLARATIONS.HOW_YOUR_DATA_WILL_BE_USED,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(referenceNumber),
        userName: getUserNameFromSession(req.session.user),
        documentContent: declarationContent.content.document,
        documentConfig: keystoneDocumentRendererConfig(),
        validationErrors,
      });
    } catch (err) {
      console.error("Error getting declarations - how data will be used and rendering 'how data will be used' page %O", err);

      return res.redirect(PROBLEM_WITH_SERVICE);
    }
  }

  try {
    // save the application
    const saveResponse = await save.declaration(application, req.body);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    /**
     * Combine the latest application with the saved declaration answer.
     * Otherwise, we need to make another API call to get the latest full application.
     */
    const latestApplication = {
      ...application,
      declaration: {
        ...application.declaration,
        ...saveResponse,
      },
    };

    const canSubmit = canSubmitApplication(latestApplication);

    if (canSubmit) {
      // submit the application
      const submissionResponse = await api.keystone.application.submit(application.id);

      if (submissionResponse.success) {
        return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${APPLICATION_SUBMITTED}`);
      }
    }

    return res.redirect(PROBLEM_WITH_SERVICE);
  } catch (err) {
    console.error('Error updating application - declarations - how data will be used %O', err);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
