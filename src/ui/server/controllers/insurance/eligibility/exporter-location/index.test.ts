import { FIELD_ID, PAGE_VARIABLES, TEMPLATE, get, post } from '.';
import { PAGES, ERROR_MESSAGES } from '../../../../content-strings';
import { ELIGIBILITY_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance/eligibility';
import { FIELD_IDS, TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import singleInputPageVariables from '../../../../helpers/page-variables/single-input/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from '../../../../shared-validation/yes-no-radios-form';
import { updateSubmittedData } from '../../../../helpers/update-submitted-data/insurance';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes } from '../../../../test-mocks';

const {
  ELIGIBILITY: { EXPORTER_LOCATION_CHANGE, COMPANIES_HOUSE_NUMBER, CANNOT_APPLY_EXIT, CHECK_YOUR_ANSWERS },
} = INSURANCE_ROUTES;

describe('controllers/insurance/eligibility/exporter-location', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('FIELD_ID', () => {
    it('should have the correct ID', () => {
      const expected = FIELD_IDS.INSURANCE.ELIGIBILITY.VALID_EXPORTER_LOCATION;

      expect(FIELD_ID).toEqual(expected);
    });
  });

  describe('PAGE_VARIABLES', () => {
    it('should have correct properties', () => {
      const expected = {
        FIELD_ID: FIELD_IDS.ELIGIBILITY.VALID_EXPORTER_LOCATION,
        FIELD: FIELDS[FIELD_ID],
        PAGE_CONTENT_STRINGS: PAGES.EXPORTER_LOCATION,
      };

      expect(PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.SHARED_PAGES.SINGLE_RADIO);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
        ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer }),
        userName: getUserNameFromSession(req.session.user),
        submittedValues: req.session.submittedData.insuranceEligibility,
      });
    });

    describe('when a there is no submittedData in req.session', () => {
      it('should add empty submittedData.insuranceEligibility to the session', () => {
        // @ts-ignore
        req.session = {};

        get(req, res);

        const expected = {
          ...req.session,
          submittedData: {
            insuranceEligibility: {},
          },
        };

        expect(req.session).toEqual(expected);
      });
    });

    describe('when a there is no insuranceEligibility in req.session.submittedData', () => {
      it('should add empty submittedData.insuranceEligibility to the session and retain existing req.session.submittedData', () => {
        // @ts-ignore
        req.session.submittedData = {
          quoteEligibility: {},
        };

        get(req, res);

        const expected = {
          ...req.session.submittedData,
          insuranceEligibility: {},
        };

        expect(req.session.submittedData).toEqual(expected);
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
          validationErrors: generateValidationErrors(payload, PAGE_VARIABLES.FIELD_ID, ERROR_MESSAGES.ELIGIBILITY[PAGE_VARIABLES.FIELD_ID]),
        });
      });
    });

    describe('when submitted answer is false', () => {
      beforeEach(() => {
        req.body = {
          [FIELD_IDS.ELIGIBILITY.VALID_EXPORTER_LOCATION]: 'false',
        };
      });

      it(`should redirect to ${CANNOT_APPLY_EXIT}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(CANNOT_APPLY_EXIT);
      });

      it('should add exitReason to req.flash', async () => {
        await post(req, res);

        const expectedReason = PAGES.CANNOT_APPLY_EXIT.REASON.UNSUPPORTED_COMPANY_COUNTRY;
        expect(req.flash).toHaveBeenCalledWith('exitReason', expectedReason);
      });
    });

    describe('when there are no validation errors', () => {
      const validBody = {
        [FIELD_IDS.ELIGIBILITY.VALID_EXPORTER_LOCATION]: 'true',
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

      it(`should redirect to ${COMPANIES_HOUSE_NUMBER}`, () => {
        post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(COMPANIES_HOUSE_NUMBER);
      });

      describe("when the url's last substring is `change`", () => {
        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, async () => {
          req.originalUrl = EXPORTER_LOCATION_CHANGE;

          await post(req, res);

          const expected = CHECK_YOUR_ANSWERS;
          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });
    });
  });
});
