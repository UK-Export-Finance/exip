import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import EXPORT_CONTRACT_FIELD_IDS from '../../../../constants/field-ids/insurance/export-contract';
import { PAGES } from '../../../../content-strings';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance/export-contract';
import singleInputPageVariables from '../../../../helpers/page-variables/single-input/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import { Request, Response } from '../../../../../types';

const { INSURANCE_ROOT, PROBLEM_WITH_SERVICE } = INSURANCE_ROUTES;

const {
  PRIVATE_MARKET: { DECLINED_DESCRIPTION },
} = EXPORT_CONTRACT_FIELD_IDS;

const {
  INSURANCE: {
    EXPORT_CONTRACT: { DECLINED_BY_PRIVATE_MARKET },
  },
} = TEMPLATES;

export const FIELD_ID = DECLINED_DESCRIPTION;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.EXPORT_CONTRACT.DECLINED_BY_PRIVATE_MARKET;

export const TEMPLATE = DECLINED_BY_PRIVATE_MARKET;

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {Number} Application reference number
 * @returns {Object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  FIELD: {
    ID: FIELD_ID,
    ...FIELDS.PRIVATE_MARKET[FIELD_ID],
  },
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}#`,
});

/**
 * get
 * Get the application and render the "Declined by private market" page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} "Declined by private market" page
 */
export const get = (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const { referenceNumber } = req.params;
  const refNumber = Number(referenceNumber);

  return res.render(TEMPLATE, {
    ...singleInputPageVariables({ FIELD_ID, PAGE_CONTENT_STRINGS, BACK_LINK: req.headers.referer }),
    ...pageVariables(refNumber),
    userName: getUserNameFromSession(req.session.user),
    application: mapApplicationToFormFields(application),
  });
};
