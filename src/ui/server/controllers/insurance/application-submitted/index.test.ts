import { TEMPLATE, get } from '.';
import { PAGES } from '../../../content-strings';
import { ROUTES, TEMPLATES, APPLICATION } from '../../../constants';
import insuranceCorePageVariables from '../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import mapApplicationToFormFields from '../../../helpers/mappings/map-application-to-form-fields';
import { Request, ResponseInsurance } from '../../../../types';
import { mockReq, mockResInsurance, mockApplication, referenceNumber } from '../../../test-mocks';

const {
  INSURANCE: { INSURANCE_ROOT, ALL_SECTIONS },
} = ROUTES;

describe('controllers/insurance/application-submitted', () => {
  let req: Request;
  let res: ResponseInsurance;

  beforeEach(() => {
    req = mockReq();
    res = mockResInsurance();

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

    describe(`when the application does not have a status of ${APPLICATION.STATUS.SUBMITTED}`, () => {
      beforeEach(() => {
        res.locals.application = {
          ...mockApplication,
          status: APPLICATION.STATUS.IN_PROGRESS,
        };
      });

      it(`should redirect to ${ALL_SECTIONS}`, () => {
        get(req, res);

        const expected = `${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });
    });
  });
});
