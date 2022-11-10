import { PAGES } from '../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../constants';
import { Request, Response } from '../../../../types';
import insuranceCorePageVariables from '../../../helpers/page-variables/core/insurance';
import api from '../../../api';

const get = async (req: Request, res: Response) => {
  const { referenceNumber } = req.params;

  try {
    const application = await api.keystone.getApplication(Number(referenceNumber));

    return res.render(TEMPLATES.INSURANCE.ALL_SECTIONS, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.START,
        BACK_LINK: req.headers.referer,
      }),
      application,
    });
  } catch (err) {
    console.error('Error getting application ', { err });

    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};

export { get };
