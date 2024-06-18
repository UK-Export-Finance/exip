import { FIELD_ID, PAGE_VARIABLES, TEMPLATE, get, post } from '.';
import { PAGES, ERROR_MESSAGES } from '../../../../content-strings';
import { COVER_PERIOD, FIELD_IDS, TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import { FIELDS_ELIGIBILITY as FIELDS } from '../../../../content-strings/fields/insurance/eligibility';
import singleInputPageVariables from '../../../../helpers/page-variables/single-input/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from '../../../../shared-validation/yes-no-radios-form';
import { updateSubmittedData } from '../../../../helpers/update-submitted-data/insurance';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes } from '../../../../test-mocks';

const {
  ELIGIBILITY: { COVER_PERIOD_CHANGE, UK_GOODS_OR_SERVICES, LONG_TERM_COVER, CHECK_YOUR_ANSWERS },
} = INSURANCE_ROUTES;

describe('controllers/insurance/eligibility/cover-period', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('FIELD_ID', () => {
    it('should have the correct ID', () => {
      const expected = FIELD_IDS.INSURANCE.ELIGIBILITY.COVER_PERIOD;

      expect(FIELD_ID).toEqual(expected);
    });
  });

  describe('PAGE_VARIABLES', () => {
    it('should have correct properties', () => {
      const expected = {
        FIELD_ID: FIELD_IDS.INSURANCE.ELIGIBILITY.COVER_PERIOD,
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.ELIGIBILITY.COVER_PERIOD,
        FIELD: {
          ID: FIELD_ID,
          ...FIELDS[FIELD_ID],
        },
      };

      expect(PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.ELIGIBILITY.COVER_PERIOD);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
        ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer }),
        userName: getUserNameFromSession(req.session.user),
        ...PAGE_VARIABLES,
        submittedValues: req.session.submittedData.insuranceEligibility,
      });
    });
  });

  describe('post', () => {
    describe('when there are validation errors', () => {
      it('should render template with validation errors from constructPayload function', () => {
        post(req, res);

        const payload = constructPayload(req.body, [FIELD_ID]);

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer }),
          userName: getUserNameFromSession(req.session.user),
          ...PAGE_VARIABLES,
          validationErrors: generateValidationErrors(payload, PAGE_VARIABLES.FIELD_ID, ERROR_MESSAGES.INSURANCE.ELIGIBILITY[PAGE_VARIABLES.FIELD_ID].IS_EMPTY),
        });
      });
    });

    describe(`when submitted answer is NOT '${COVER_PERIOD.LESS_THAN_2_YEARS.DB_ID}'`, () => {
      beforeEach(() => {
        req.body = {
          [FIELD_ID]: 'true',
        };
      });

      it(`should redirect to ${LONG_TERM_COVER}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(LONG_TERM_COVER);
      });
    });

    describe('when there are no validation errors', () => {
      const validBody = {
        [FIELD_ID]: COVER_PERIOD.LESS_THAN_2_YEARS.DB_ID,
      };

      beforeEach(() => {
        req.body = validBody;
      });

      it('should update the session with submitted data, populated with the answer', () => {
        post(req, res);

        const expectedPopulatedData = {
          [PAGE_VARIABLES.FIELD_ID]: validBody[PAGE_VARIABLES.FIELD_ID],
        };

        const expected = {
          ...req.session.submittedData,
          insuranceEligibility: updateSubmittedData(expectedPopulatedData, req.session.submittedData.insuranceEligibility),
        };

        expect(req.session.submittedData).toEqual(expected);
      });

      it(`should redirect to ${UK_GOODS_OR_SERVICES}`, () => {
        post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(UK_GOODS_OR_SERVICES);
      });

      describe("when the url's last substring is `change`", () => {
        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, async () => {
          req.originalUrl = COVER_PERIOD_CHANGE;

          await post(req, res);

          const expected = CHECK_YOUR_ANSWERS;
          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });
    });
  });
});
