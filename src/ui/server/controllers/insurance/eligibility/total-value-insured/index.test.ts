import { FIELD_ID, PAGE_VARIABLES, TEMPLATE, get, post } from '.';
import { FIELDS_ELIGIBILITY as FIELDS } from '../../../../content-strings/fields/insurance/eligibility';
import { PAGES, ERROR_MESSAGES } from '../../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import singleInputPageVariables from '../../../../helpers/page-variables/single-input/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from '../../../../shared-validation/yes-no-radios-form';
import { updateSubmittedData } from '../../../../helpers/update-submitted-data/insurance';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes } from '../../../../test-mocks';

describe('controllers/insurance/eligibility/total-value-insured', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('FIELD_ID', () => {
    it('should have the correct ID', () => {
      const expected = FIELD_IDS.INSURANCE.ELIGIBILITY.TOTAL_CONTRACT_VALUE;

      expect(FIELD_ID).toEqual(expected);
    });
  });

  describe('PAGE_VARIABLES', () => {
    it('should have correct properties', () => {
      const fieldId = FIELD_IDS.INSURANCE.ELIGIBILITY.TOTAL_CONTRACT_VALUE;

      const expected = {
        FIELD_ID: fieldId,
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.ELIGIBILITY.TOTAL_VALUE_INSURED,
        FIELD: {
          ID: fieldId,
          ...FIELDS[fieldId],
        },
      };

      expect(PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.ELIGIBILITY.TOTAL_VALUE_INSURED);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
        ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer }),
        userName: getUserNameFromSession(req.session.user),
        submittedValues: req.session.submittedData.insuranceEligibility,
        ...PAGE_VARIABLES,
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
          validationErrors: generateValidationErrors(payload, PAGE_VARIABLES.FIELD_ID, ERROR_MESSAGES.INSURANCE.ELIGIBILITY[PAGE_VARIABLES.FIELD_ID].IS_EMPTY),
          ...PAGE_VARIABLES,
        });
      });
    });

    describe('when there are no validation errors', () => {
      const validBody = {
        [FIELD_ID]: 3,
      };

      beforeEach(() => {
        req.body = validBody;
      });

      it('should update the session with submitted data, populated with the answer', () => {
        post(req, res);

        const expectedPopulatedData = {
          [FIELD_ID]: validBody[FIELD_ID],
        };

        const expected = {
          ...req.session.submittedData,
          insuranceEligibility: updateSubmittedData(expectedPopulatedData, req.session.submittedData.insuranceEligibility),
        };

        expect(req.session.submittedData).toEqual(expected);
      });

      it(`should redirect to ${ROUTES.INSURANCE.ELIGIBILITY.INSURED_PERIOD}`, () => {
        post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.INSURED_PERIOD);
      });
    });
  });
});
