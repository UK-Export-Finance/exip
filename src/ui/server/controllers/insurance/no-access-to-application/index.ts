import { PAGES } from '../../../content-strings';
import { TEMPLATES } from '../../../constants';
import { Request, Response } from '../../../../types';
import insuranceCorePageVariables from '../../../helpers/page-variables/core/insurance';

export const TEMPLATE = TEMPLATES.INSURANCE.NO_ACCESS_TO_APPLICATION;

export const get = (req: Request, res: Response) =>
  res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS: PAGES.INSURANCE.NO_ACCESS_TO_APPLICATION_PAGE,
    }),
    user: req.session.user,
  });
