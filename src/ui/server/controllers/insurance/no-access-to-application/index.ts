import { PAGES } from '../../../content-strings';
import { TEMPLATES } from '../../../constants';
import insuranceCorePageVariables from '../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import { Request, ResponseInsurance } from '../../../../types';

export const TEMPLATE = TEMPLATES.INSURANCE.NO_ACCESS_TO_APPLICATION;

export const get = (req: Request, res: ResponseInsurance) =>
  res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS: PAGES.INSURANCE.NO_ACCESS_TO_APPLICATION_PAGE,
    }),
    userName: getUserNameFromSession(req.session.user),
  });
