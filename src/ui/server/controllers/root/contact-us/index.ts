import { PAGES, PRODUCT } from '../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../constants';
import { Request, Response } from '../../../../types';
import singleInputPageVariables from '../../../helpers/page-variables/single-input';

const FIELD_ID = FIELD_IDS.CONTACT_US;

const startRoute = ROUTES.QUOTE.START;

export const PAGE_VARIABLES = {
  FIELD_ID,
  PAGE_CONTENT_STRINGS: PAGES.CONTACT_US_PAGE,
  PRODUCT: { DESCRIPTION: PRODUCT.DESCRIPTION.GENERIC },
};

export const TEMPLATE = TEMPLATES.CONTACT_US;

export const get = (req: Request, res: Response) => {
  return res.render(TEMPLATE, {
    ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer, START_ROUTE: startRoute }),
  });
};
