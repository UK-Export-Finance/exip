import { ERROR_MESSAGES, PAGES } from '../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../constants';
import singleInputPageVariables from '../../../helpers/page-variables/single-input/quote';
import generateValidationErrors from '../../../shared-validation/yes-no-radios-form';
import { updateSubmittedData } from '../../../helpers/update-submitted-data/quote';
import { Request, Response } from '../../../../types';

const FIELD_ID = FIELD_IDS.VALID_BUYER_BODY;

export const PAGE_VARIABLES = {
  FIELD_ID,
  PAGE_CONTENT_STRINGS: PAGES.QUOTE.BUYER_BODY,
};

export const TEMPLATE = TEMPLATES.QUOTE.BUYER_BODY;

/**
 * mapAnswer
 * Map yes/no answer to true/false boolean.
 * The saved field ID includes 'valid' so we need to reverse the answer to save it correctly.
 * If the answer is 'false', the 'buyer body' is valid. Return true.
 * If the answer is 'true', the 'buyer body' is invalid. Return false.
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
 * If the answer is 'false', the 'buyer body' is valid and saved as true. Return false.
 * If the answer is 'true', the 'buyer body' is invalid and saved as false. Return true.
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
    ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer }),
    user: req.session.user,
    submittedValues: {
      ...req.session.submittedData.quoteEligibility,
      [FIELD_ID]: mappedAnswer,
    },
  });
};

export const post = (req: Request, res: Response) => {
  const validationErrors = generateValidationErrors(req.body, FIELD_ID, ERROR_MESSAGES[FIELD_ID]);

  if (validationErrors) {
    return res.render(TEMPLATE, {
      ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer }),
      user: req.session.user,
      validationErrors,
    });
  }

  const answer = req.body[FIELD_ID];

  const mappedAnswer = mapAnswer(req.body[FIELD_ID]);

  req.session.submittedData.quoteEligibility = updateSubmittedData({ [FIELD_ID]: mappedAnswer }, req.session.submittedData.quoteEligibility);

  if (answer === 'true') {
    req.flash('previousRoute', ROUTES.QUOTE.BUYER_BODY);

    const { GET_A_QUOTE_BY_EMAIL } = PAGES.QUOTE;
    const { REASON } = GET_A_QUOTE_BY_EMAIL;

    req.flash('exitReason', REASON.BUYER_BODY);
    req.flash('exitDescription', REASON.BUYER_BODY_DESCRIPTION);

    return res.redirect(ROUTES.QUOTE.GET_A_QUOTE_BY_EMAIL);
  }

  return res.redirect(ROUTES.QUOTE.EXPORTER_LOCATION);
};
