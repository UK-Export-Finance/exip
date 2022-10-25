import { PAGES } from '../../../content-strings';
import { TEMPLATES } from '../../../constants';
import corePageVariables from '../../../helpers/core-page-variables';
import { Request, Response } from '../../../../types';

const get = (req: Request, res: Response) =>
  res.render(TEMPLATES.PROBLEM_WITH_SERVICE, corePageVariables({ PAGE_CONTENT_STRINGS: PAGES.PROBLEM_WITH_SERVICE_PAGE, BACK_LINK: req.headers.referer }));

export default get;
