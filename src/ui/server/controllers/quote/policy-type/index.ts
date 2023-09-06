import { FIELDS, PAGES } from '../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../constants';
import SHARED_FIELD_IDS from '../../../constants/field-ids/shared';
import corePageVariables from '../../../helpers/page-variables/core/quote';
import generateValidationErrors from './validation';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import constructPayload from '../../../helpers/construct-payload';
import { updateSubmittedData } from '../../../helpers/update-submitted-data/quote';
import { Request, Response } from '../../../../types';

const { MULTIPLE_POLICY_TYPE, POLICY_TYPE, SINGLE_POLICY_TYPE } = SHARED_FIELD_IDS;

export const FIELD_IDS = [POLICY_TYPE, MULTIPLE_POLICY_TYPE];

export const PAGE_VARIABLES = {
  FIELDS: {
    MULTIPLE_POLICY_TYPE: {
      ID: MULTIPLE_POLICY_TYPE,
      ...FIELDS[POLICY_TYPE],
    },
    POLICY_TYPE: {
      ID: POLICY_TYPE,
      ...FIELDS[POLICY_TYPE],
    },
    SINGLE_POLICY_TYPE: {
      ID: SINGLE_POLICY_TYPE,
      ...FIELDS[POLICY_TYPE],
    },
  },
};

export const TEMPLATE = TEMPLATES.QUOTE.POLICY_TYPE;

export const get = (req: Request, res: Response) =>
  res.render(TEMPLATE, {
    ...corePageVariables({ PAGE_CONTENT_STRINGS: PAGES.QUOTE.POLICY_TYPE, BACK_LINK: req.headers.referer, ORIGINAL_URL: req.originalUrl }),
    userName: getUserNameFromSession(req.session.user),
    ...PAGE_VARIABLES,
    submittedValues: req.session.submittedData.quoteEligibility,
  });

export const post = (req: Request, res: Response) => {
  const payload = constructPayload(req.body, FIELD_IDS);

  const validationErrors = generateValidationErrors(payload);

  if (validationErrors) {
    return res.render(TEMPLATE, {
      ...corePageVariables({ PAGE_CONTENT_STRINGS: PAGES.QUOTE.POLICY_TYPE, BACK_LINK: req.headers.referer, ORIGINAL_URL: req.originalUrl }),
      userName: getUserNameFromSession(req.session.user),
      ...PAGE_VARIABLES,
      validationErrors,
      submittedValues: payload,
    });
  }

  const populatedData = {
    [POLICY_TYPE]: payload[POLICY_TYPE],
  };

  req.session.submittedData.quoteEligibility = updateSubmittedData(populatedData, req.session.submittedData.quoteEligibility);

  return res.redirect(ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY);
};
