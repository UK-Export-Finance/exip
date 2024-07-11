import { FIELD_ID, PAGE_VARIABLES, HTML_FLAGS, TEMPLATE, get, post } from '.';
import { PAGES, END_BUYERS_DESCRIPTION, ERROR_MESSAGES } from '../../../../content-strings';
import { FIELDS_ELIGIBILITY } from '../../../../content-strings/fields/insurance/eligibility';
import { FIELD_IDS, TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import singleInputPageVariables from '../../../../helpers/page-variables/single-input/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from '../../../../shared-validation/yes-no-radios-form';
import { updateSubmittedData } from '../../../../helpers/update-submitted-data/insurance';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes } from '../../../../test-mocks';

const { CANNOT_APPLY_MULTIPLE_RISKS, CHECK_YOUR_ANSWERS } = INSURANCE_ROUTES.ELIGIBILITY;

const {
  SHARED_PAGES,
  PARTIALS: {
    INSURANCE: { END_BUYER },
  },
} = TEMPLATES;

describe('controllers/insurance/eligibility/end-buyer', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('FIELD_ID', () => {
    it('should have the correct ID', () => {
      const expected = FIELD_IDS.INSURANCE.ELIGIBILITY.HAS_END_BUYER;

      expect(FIELD_ID).toEqual(expected);
    });
  });

  describe('PAGE_VARIABLES', () => {
    it('should have correct properties', () => {
      const expected = {
        FIELD_ID,
        PAGE_CONTENT_STRINGS: {
          ...PAGES.INSURANCE.ELIGIBILITY.END_BUYER,
          END_BUYERS_DESCRIPTION,
        },
        FIELD: {
          ID: FIELD_ID,
          ...FIELDS_ELIGIBILITY[FIELD_ID],
        },
      };

      expect(PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('HTML_FLAGS', () => {
    it('should have correct properties', () => {
      const expected = {
        CUSTOM_CONTENT_HTML: END_BUYER.CUSTOM_CONTENT_HTML,
      };

      expect(HTML_FLAGS).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(SHARED_PAGES.SINGLE_RADIO);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
        ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer, HTML_FLAGS }),
        userName: getUserNameFromSession(req.session.user),
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
          ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer, HTML_FLAGS }),
          userName: getUserNameFromSession(req.session.user),
          validationErrors: generateValidationErrors(payload, PAGE_VARIABLES.FIELD_ID, ERROR_MESSAGES.INSURANCE.ELIGIBILITY[PAGE_VARIABLES.FIELD_ID].IS_EMPTY),
        });
      });
    });

    describe('when submitted answer is true', () => {
      beforeEach(() => {
        req.body = {
          [FIELD_ID]: 'true',
        };
      });

      it(`should redirect to ${CANNOT_APPLY_MULTIPLE_RISKS}`, () => {
        post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(CANNOT_APPLY_MULTIPLE_RISKS);
      });
    });

    describe('when there are no validation errors', () => {
      const validBody = {
        [FIELD_ID]: 'false',
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

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(CHECK_YOUR_ANSWERS);
      });
    });
  });
});
