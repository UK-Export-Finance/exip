import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import { EXPORT_CONTRACT as EXPORT_CONTRACT_FIELD_IDS } from '../../../../constants/field-ids/insurance/export-contract';
import { PARTIALS as PARTIAL_TEMPLATES } from '../../../../constants/templates/partials';
import { PAGES } from '../../../../content-strings';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from './validation';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import mapAndSave from '../map-and-save/export-contract';
import { ObjectType, Request, Response } from '../../../../../types';

const {
  INSURANCE_ROOT,
  EXPORT_CONTRACT: { ABOUT_GOODS_OR_SERVICES },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const {
  HOW_WAS_THE_CONTRACT_AWARDED: { AWARD_METHOD, OTHER_AWARD_METHOD },
} = EXPORT_CONTRACT_FIELD_IDS;

const {
  INSURANCE: {
    EXPORT_CONTRACT: {
      HOW_WAS_THE_CONTRACT_AWARDED: { CONDITIONAL_OTHER_METHOD_HTML },
    },
  },
} = PARTIAL_TEMPLATES;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.EXPORT_CONTRACT.HOW_WAS_THE_CONTRACT_AWARDED;

export const TEMPLATE = TEMPLATES.INSURANCE.EXPORT_CONTRACT.HOW_WAS_THE_CONTRACT_AWARDED;

export const FIELD_IDS = [AWARD_METHOD, OTHER_AWARD_METHOD];

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @returns {Object} Page variables
 */
export const pageVariables = () => ({
  FIELDS: {
    AWARD_METHOD: {
      ID: AWARD_METHOD,
      ...FIELDS.HOW_WAS_THE_CONTRACT_AWARDED[AWARD_METHOD],
    },
    OTHER_AWARD_METHOD: {
      ID: OTHER_AWARD_METHOD,
      ...FIELDS.HOW_WAS_THE_CONTRACT_AWARDED[OTHER_AWARD_METHOD],
    },
  },
  SAVE_AND_BACK_URL: '#',
});

/**
 * get
 * Get the application and render the "How was the contract awarded" page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} "How was the contract awarded" page
 */
export const get = (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  return res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS,
      BACK_LINK: req.headers.referer,
    }),
    ...pageVariables(),
    CONDITIONAL_OTHER_METHOD_HTML,
    userName: getUserNameFromSession(req.session.user),
    submittedValues: application.exportContract,
  });
};

/**
 * post
 * Redirect to the next part of the flow.
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

  const payload = constructPayload(req.body, FIELD_IDS);

  const validationErrors = generateValidationErrors(payload);

  if (validationErrors) {
    const sanitised = sanitiseData(payload) as ObjectType;

    /**
     * Map the payload into an AWARD_METHOD object structure with an id property.
     * Otherwise, the nunjucks template needs 2x conditions.
     */
    const submittedValues = {
      ...sanitised,
      [AWARD_METHOD]: {
        id: sanitised[AWARD_METHOD],
      },
    };

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS,
        BACK_LINK: req.headers.referer,
      }),
      ...pageVariables(),
      CONDITIONAL_OTHER_METHOD_HTML,
      userName: getUserNameFromSession(req.session.user),
      submittedValues,
      validationErrors,
    });
  }

  try {
    // save the application

    const saveResponse = await mapAndSave.exportContract(payload, application, validationErrors);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${ABOUT_GOODS_OR_SERVICES}`);
  } catch (err) {
    console.error('Error updating application - export contract - how was the contract awarded %O', err);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
