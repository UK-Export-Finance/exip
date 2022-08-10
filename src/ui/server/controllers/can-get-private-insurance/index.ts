import { BUTTONS, FIELDS, FOOTER, LINKS, PAGES, PRODUCT } from '../../content-strings';
import {
  FIELD_IDS,
  ROUTES,
  TEMPLATES,
} from '../../constants';
import generateValidationErrors from './validation';
import { updateSubmittedData } from '../../helpers/update-submitted-data';
import isChangeRoute from '../../helpers/is-change-route';
import { Request, Response } from '../../../types';

const PAGE_VARIABLES = {
  CONTENT_STRINGS: {
    PRODUCT,
    FOOTER,
    BUTTONS,
    LINKS,
    ...PAGES.CAN_GET_PRIVATE_INSURANCE_PAGE,
  },
  FIELDS: {
    CAN_GET_PRIVATE_INSURANCE: {
      ID: FIELD_IDS.CAN_GET_PRIVATE_INSURANCE,
      ...FIELDS[FIELD_IDS.CAN_GET_PRIVATE_INSURANCE],
    },
    // note: "tried private cover yes" is only required for scenario where
    // empty form is submitted. Then, error message link can link to
    // the first policy type radio button (single).
    CAN_GET_PRIVATE_INSURANCE_YES: {
      ID: FIELD_IDS.CAN_GET_PRIVATE_INSURANCE_YES,
      ...FIELDS[FIELD_IDS.CAN_GET_PRIVATE_INSURANCE_YES],
    },
  },
};

const get = (req: Request, res: Response) =>
  res.render(TEMPLATES.CAN_GET_PRIVATE_INSURANCE, {
    ...PAGE_VARIABLES,
    BACK_LINK: req.headers.referer,
    submittedValues: req.session.submittedData,
  });

const post = (req: Request, res: Response) => {
  const validationErrors = generateValidationErrors(req.body);

  if (validationErrors) {
    return res.render(TEMPLATES.CAN_GET_PRIVATE_INSURANCE, {
      ...PAGE_VARIABLES,
      BACK_LINK: req.headers.referer,
      validationErrors,
    });
  }

  const answer = req.body[FIELD_IDS.CAN_GET_PRIVATE_INSURANCE];

  const redirectToExitPage = (answer === 'true');

  if (redirectToExitPage) {
    req.flash('previousRoute', ROUTES.CAN_GET_PRIVATE_INSURANCE);

    const { CANNOT_OBTAIN_COVER_PAGE } = PAGES;
    const { REASON } = CANNOT_OBTAIN_COVER_PAGE;

    req.flash('exitReason', REASON.CAN_GET_PRIVATE_INSURANCE);

    return res.redirect(ROUTES.CANNOT_OBTAIN_COVER);
  }

  req.session.submittedData = updateSubmittedData(
    req.body,
    req.session.submittedData,
  );

  if (isChangeRoute(req.originalUrl)) {
    return res.redirect(ROUTES.CHECK_YOUR_ANSWERS);
  }

  return res.redirect(ROUTES.HAS_MINIMUM_UK_GOODS_OR_SERVICES);
};

export { PAGE_VARIABLES, get, post };
