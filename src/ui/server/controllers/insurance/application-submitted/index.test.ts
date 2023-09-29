import { TEMPLATE, get } from '.';
import { PAGES } from '../../../content-strings';
import { ROUTES, TEMPLATES, APPLICATION } from '../../../constants';
import insuranceCorePageVariables from '../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import mapApplicationToFormFields from '../../../helpers/mappings/map-application-to-form-fields';
import { Request, Response } from '../../../../types';
import { mockReq, mockRes, mockApplication } from '../../../test-mocks';

const {
  INSURANCE: { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE },
} = ROUTES;

describe('controllers/insurance/application-submitted', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    res.locals.application = {
      ...mockApplication,
      status: APPLICATION.STATUS.SUBMITTED,
    };
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.APPLICATION_SUBMITTED);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.APPLICATION_SUBMITTED,
          BACK_LINK: req.headers.referer,
        }),
        userName: getUserNameFromSession(req.session.user),
        application: mapApplicationToFormFields(res.locals.application),
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });

    describe('when there is no application', () => {
      beforeEach(() => {
        delete res.locals.application;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, () => {
        get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe(`when the application does not have a status of ${APPLICATION.STATUS.SUBMITTED}`, () => {
      beforeEach(() => {
        res.locals = {
          ...res.locals,
          application: {
            ...mockApplication,
            status: APPLICATION.STATUS.IN_PROGRESS,
          },
        };
      });

      it(`should redirect to ${ALL_SECTIONS}`, () => {
        get(req, res);

        const expected = `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${ALL_SECTIONS}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });
    });
  });
});
