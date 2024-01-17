import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import YOUR_BUYER_FIELD_IDS from '../../../../constants/field-ids/insurance/your-buyer';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { Request, Response } from '../../../../../types';

const { HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER, PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER } = YOUR_BUYER_FIELD_IDS;

const {
  INSURANCE_ROOT,
  PROBLEM_WITH_SERVICE,
  YOUR_BUYER: { CREDIT_INSURANCE_COVER_SAVE_AND_BACK },
} = INSURANCE_ROUTES;

const {
  SHARED_PAGES,
  PARTIALS: {
    INSURANCE: { BUYER },
  },
} = TEMPLATES;

export const FIELD_ID = HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.YOUR_BUYER.CREDIT_INSURANCE_COVER;

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {Number} Application reference number
 * @returns {Object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  FIELD_ID: HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER,
  FIELDS: {
    HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER: {
      ID: HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER,
      ...FIELDS[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER],
    },
    PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER: {
      ID: PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER,
      ...FIELDS[PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER],
    },
  },
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${CREDIT_INSURANCE_COVER_SAVE_AND_BACK}`,
});

/**
 * HTML_FLAGS
 * Conditional flags for the nunjucks template to match design
 */
export const HTML_FLAGS = {
  HORIZONTAL_RADIOS: true,
  NO_RADIO_AS_FIRST_OPTION: true,
  CONDITIONAL_YES_HTML: BUYER.CREDIT_INSURANCE_COVER.CONDITIONAL_YES_HTML,
};

export const TEMPLATE = SHARED_PAGES.SINGLE_RADIO;

/**
 * get
 * Render the Buyer - Credit insurance cover page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Buyer - Credit insurance cover page
 */
export const get = (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const { referenceNumber } = req.params;
  const refNumber = Number(referenceNumber);

  return res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS,
      BACK_LINK: req.headers.referer,
      HTML_FLAGS,
    }),
    ...pageVariables(refNumber),
    userName: getUserNameFromSession(req.session.user),
  });
};
