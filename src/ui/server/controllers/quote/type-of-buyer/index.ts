import { ERROR_MESSAGES, PAGES } from '../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../constants';
import singleInputPageVariables from '../../../helpers/page-variables/single-input/quote';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import constructPayload from '../../../helpers/construct-payload';
import generateValidationErrors from '../../../shared-validation/yes-no-radios-form';
import { updateSubmittedData } from '../../../helpers/update-submitted-data/quote';
import { Request, Response } from '../../../../types';

const {
  SHARED_PAGES,
  PARTIALS: {
    QUOTE: { TYPE_OF_BUYER },
  },
} = TEMPLATES;

export const FIELD_ID = FIELD_IDS.ELIGIBILITY.VALID_TYPE_OF_BUYER;

export const PAGE_VARIABLES = {
  FIELD_ID,
  PAGE_CONTENT_STRINGS: PAGES.QUOTE.TYPE_OF_BUYER,
};

/**
 * HTML_FLAGS
 * Conditional flags for the nunjucks template to match design
 */
export const HTML_FLAGS = {
  CUSTOM_CONTENT_HTML: TYPE_OF_BUYER.CUSTOM_CONTENT_HTML,
};

export const TEMPLATE = SHARED_PAGES.SINGLE_RADIO;

/**
 * mapAnswer
 * Map yes/no answer to true/false boolean.
 * The saved field ID includes 'valid' so we need to reverse the answer to save it correctly.
 * If the answer is 'false', the 'type of buyer' is valid. Return true.
 * If the answer is 'true', the 'type of buyer' is invalid. Return false.
 * @returns {boolean}
 */
export const mapAnswer = (answer: string) => {
  if (answer === 'false') {
    return true;
  }

  return false;
};

/**
 * mapSubmittedAnswer
 * Map yes/no answer to true/false boolean.
 * The saved field ID includes 'valid' so we need to reverse the answer in order to render correctly.
 * If the answer is 'false', the 'type of buyer' is valid and saved as true. Return false.
 * If the answer is 'true', the 'type of buyer' is invalid and saved as false. Return true.
 * @returns {boolean}
 */
export const mapSubmittedAnswer = (answer?: boolean) => {
  if (answer === false) {
    return true;
  }

  if (answer === true) {
    return false;
  }

  return null;
};

export const get = (req: Request, res: Response) => {
  const mappedAnswer = mapSubmittedAnswer(req.session.submittedData.quoteEligibility[FIELD_ID]);

  return res.render(TEMPLATE, {
    ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer, ORIGINAL_URL: req.originalUrl, HTML_FLAGS }),
    userName: getUserNameFromSession(req.session.user),
    submittedValues: {
      ...req.session.submittedData.quoteEligibility,
      [FIELD_ID]: mappedAnswer,
    },
  });
};

export const post = (req: Request, res: Response) => {
  const payload = constructPayload(req.body, [FIELD_ID]);

  const validationErrors = generateValidationErrors(payload, FIELD_ID, ERROR_MESSAGES.ELIGIBILITY[FIELD_ID]);

  if (validationErrors) {
    return res.render(TEMPLATE, {
      ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer, ORIGINAL_URL: req.originalUrl, HTML_FLAGS }),
      userName: getUserNameFromSession(req.session.user),
      validationErrors,
    });
  }

  const answer = payload[FIELD_ID];

  const mappedAnswer = mapAnswer(answer);

  req.session.submittedData.quoteEligibility = updateSubmittedData({ [FIELD_ID]: mappedAnswer }, req.session.submittedData.quoteEligibility);

  if (answer === 'true') {
    req.flash('previousRoute', ROUTES.QUOTE.TYPE_OF_BUYER);

    const { GET_A_QUOTE_BY_EMAIL } = PAGES.QUOTE;
    const { REASON } = GET_A_QUOTE_BY_EMAIL;

    req.flash('exitReason', REASON.TYPE_OF_BUYER);
    req.flash('exitDescription', REASON.TYPE_OF_BUYER_DESCRIPTION);

    return res.redirect(ROUTES.QUOTE.GET_A_QUOTE_BY_EMAIL);
  }

  return res.redirect(ROUTES.QUOTE.EXPORTER_LOCATION);
};
