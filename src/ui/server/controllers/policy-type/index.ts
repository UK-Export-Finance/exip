import { BUTTONS, FIELDS, FOOTER, PAGES, PRODUCT } from '../../content-strings';
import {
  FIELD_IDS,
  ROUTES,
  TEMPLATES,
} from '../../constants';
import generateValidationErrors from './validation';
import { updateSubmittedData } from '../../helpers/update-submitted-data';
import { Request, Response } from '../../../types';

const PAGE_VARIABLES = {
  CONTENT_STRINGS: {
    PRODUCT,
    FOOTER,
    BUTTONS,
    ...PAGES.POLICY_TYPE_PAGE,
  },
  FIELDS: {
    POLICY_TYPE: {
      ID: FIELD_IDS.POLICY_TYPE,
      ...FIELDS[FIELD_IDS.POLICY_TYPE],
    },
    SINGLE_POLICY_TYPE: {
      ID: FIELD_IDS.SINGLE_POLICY_TYPE,
      ...FIELDS[FIELD_IDS.POLICY_TYPE],
    },
    SINGLE_POLICY_LENGTH: {
      ID: FIELD_IDS.SINGLE_POLICY_LENGTH,
      ...FIELDS[FIELD_IDS.SINGLE_POLICY_LENGTH],
    },
    MULTI_POLICY_LENGTH: {
      ID: FIELD_IDS.MULTI_POLICY_LENGTH,
      ...FIELDS[FIELD_IDS.MULTI_POLICY_LENGTH],
    },
  },
};

const get = (req: Request, res: Response) =>
  res.render(TEMPLATES.POLICY_TYPE, {
    ...PAGE_VARIABLES,
    BACK_LINK: req.headers.referer,
    submittedValues: req.session.submittedData,
  });

const post = (req: Request, res: Response) => {
  const validationErrors = generateValidationErrors(req.body);

  if (validationErrors) {
    return res.render(TEMPLATES.POLICY_TYPE, {
      ...PAGE_VARIABLES,
      BACK_LINK: req.headers.referer,
      validationErrors,
      submittedValues: req.body,
    });
  }

  req.session.submittedData = updateSubmittedData(
    req.body,
    req.session.submittedData,
  );

  return res.redirect(ROUTES.TELL_US_ABOUT_YOUR_POLICY);
};

export {
  PAGE_VARIABLES,
  get,
  post,
};
