import { PAGES } from '../../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import singleInputPageVariables from '../../../../helpers/single-input-page-variables';
import generateValidationErrors from '../../../../shared-validation/exporter-location';
import { Request, Response } from '../../../../../types';

const PAGE_VARIABLES = {
  FIELD_ID: FIELD_IDS.VALID_EXPORTER_LOCATION,
  PAGE_CONTENT_STRINGS: PAGES.EXPORTER_LOCATION,
};

const get = (req: Request, res: Response) =>
  res.render(TEMPLATES.SHARED_PAGES.EXPORTER_LOCATION, singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer }));

const post = (req: Request, res: Response) => {
  const validationErrors = generateValidationErrors(req.body);

  if (validationErrors) {
    return res.render(TEMPLATES.SHARED_PAGES.EXPORTER_LOCATION, {
      ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer }),
      validationErrors,
    });
  }

  const answer = req.body[FIELD_IDS.VALID_EXPORTER_LOCATION];

  if (answer === 'false') {
    const { CANNOT_APPLY } = PAGES;
    const { REASON } = CANNOT_APPLY;

    req.flash('exitReason', REASON.UNSUPPORTED_COMPANY_COUNTRY);

    return res.redirect(ROUTES.INSURANCE.ELIGIBILITY.CANNOT_APPLY);
  }

  return res.redirect(ROUTES.INSURANCE.ELIGIBILITY.HAS_MINIMUM_UK_GOODS_OR_SERVICES);
};

export { PAGE_VARIABLES, get, post };
