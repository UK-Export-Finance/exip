import { FIELD_ID, PAGE_VARIABLES, TEMPLATE, get, post } from '.';
import { PAGES, UK_GOODS_AND_SERVICES_CALCULATE_DESCRIPTION, UK_GOODS_AND_SERVICES_DESCRIPTION, ERROR_MESSAGES } from '../../../../content-strings';
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
  ELIGIBILITY: { UK_GOODS_OR_SERVICES_CHANGE, CANNOT_APPLY, END_BUYER, CHECK_YOUR_ANSWERS },
} = INSURANCE_ROUTES;

const {
  SHARED_PAGES,
  PARTIALS: {
    INSURANCE: { UK_GOODS_OR_SERVICES },
  },
} = TEMPLATES;

describe('controllers/insurance/eligibility/uk-goods-or-services', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('FIELD_ID', () => {
    it('should have the correct ID', () => {
      const expected = FIELD_IDS.INSURANCE.ELIGIBILITY.HAS_MINIMUM_UK_GOODS_OR_SERVICES;

      expect(FIELD_ID).toEqual(expected);
    });
  });

  describe('PAGE_VARIABLES', () => {
    it('should have correct properties', () => {
      const expected = {
        FIELD_ID: FIELD_IDS.ELIGIBILITY.HAS_MINIMUM_UK_GOODS_OR_SERVICES,
        PAGE_CONTENT_STRINGS: {
          ...PAGES.UK_GOODS_OR_SERVICES,
          UK_GOODS_AND_SERVICES_CALCULATE_DESCRIPTION,
          UK_GOODS_AND_SERVICES_DESCRIPTION,
        },
        CUSTOM_CONTENT_HTML: UK_GOODS_OR_SERVICES.CUSTOM_CONTENT_HTML,
      };

      expect(PAGE_VARIABLES).toEqual(expected);
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
        ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer }),
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
          ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer }),
          userName: getUserNameFromSession(req.session.user),
          validationErrors: generateValidationErrors(payload, PAGE_VARIABLES.FIELD_ID, ERROR_MESSAGES.ELIGIBILITY[PAGE_VARIABLES.FIELD_ID].IS_EMPTY),
        });
      });
    });

    describe('when submitted answer is false', () => {
      beforeEach(() => {
        req.body = {
          [FIELD_IDS.ELIGIBILITY.HAS_MINIMUM_UK_GOODS_OR_SERVICES]: 'false',
        };
      });

      it(`should redirect to ${CANNOT_APPLY}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(CANNOT_APPLY);
      });

      it('should add exitReason to req.flash', async () => {
        await post(req, res);

        const expectedReason = PAGES.CANNOT_APPLY.REASON.NOT_ENOUGH_UK_GOODS_OR_SERVICES;
        expect(req.flash).toHaveBeenCalledWith('exitReason', expectedReason);
      });
    });

    describe('when there are no validation errors', () => {
      const validBody = {
        [FIELD_IDS.ELIGIBILITY.HAS_MINIMUM_UK_GOODS_OR_SERVICES]: 'true',
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

      it(`should redirect to ${END_BUYER}`, () => {
        post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(END_BUYER);
      });

      describe("when the url's last substring is `change`", () => {
        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, async () => {
          req.originalUrl = UK_GOODS_OR_SERVICES_CHANGE;

          await post(req, res);

          const expected = CHECK_YOUR_ANSWERS;
          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });
    });
  });
});
