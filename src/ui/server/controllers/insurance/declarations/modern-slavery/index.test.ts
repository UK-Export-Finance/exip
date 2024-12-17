import { pageVariables, PAGE_CONTENT_STRINGS, HTML_FLAGS, TEMPLATE, FIELD_IDS, get, post } from '.';
import { PAGES } from '../../../../content-strings';
import { TEMPLATES, ROUTES, DECLARATIONS } from '../../../../constants';
import DECLARATIONS_FIELD_IDS from '../../../../constants/field-ids/insurance/declarations';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from './validation';
import save from '../save-data/modern-slavery';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockApplication, mockSpyPromise, mockSpyPromiseRejection, referenceNumber } from '../../../../test-mocks';

const { WILL_ADHERE_TO_ALL_REQUIREMENTS, HAS_NO_OFFENSES_OR_INVESTIGATIONS, IS_NOT_AWARE_OF_EXISTING_SLAVERY, CONDITIONAL_REASONS } =
  DECLARATIONS_FIELD_IDS.MODERN_SLAVERY;

const { MODERN_SLAVERY } = DECLARATIONS.LATEST_DECLARATIONS;

const { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;

describe('controllers/insurance/declarations/modern-slavery', () => {
  jest.mock('../save-data/modern-slavery');

  let mockSaveDeclarationModernSlavery = mockSpyPromise();

  save.declarationModernSlavery = mockSaveDeclarationModernSlavery;

  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct strings', () => {
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.DECLARATIONS.MODERN_SLAVERY);
    });
  });

  describe('HTML_FLAGS', () => {
    it('should have correct properties', () => {
      const expected = {
        HORIZONTAL_RADIOS: true,
      };

      expect(HTML_FLAGS).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.DECLARATIONS.MODERN_SLAVERY);
    });
  });

  describe('FIELD_IDS', () => {
    it('should have the correct FIELD_IDS', () => {
      const expected = [
        WILL_ADHERE_TO_ALL_REQUIREMENTS,
        HAS_NO_OFFENSES_OR_INVESTIGATIONS,
        IS_NOT_AWARE_OF_EXISTING_SLAVERY,
        CONDITIONAL_REASONS.CANNOT_ADHERE_TO_ALL_REQUIREMENTS,
        CONDITIONAL_REASONS.OFFENSES_OR_INVESTIGATIONS,
        CONDITIONAL_REASONS.AWARE_OF_EXISTING_SLAVERY,
      ];

      expect(FIELD_IDS).toEqual(expected);
    });
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(referenceNumber);

      const expected = {
        FIELDS: {
          WILL_ADHERE_TO_ALL_REQUIREMENTS: {
            ID: WILL_ADHERE_TO_ALL_REQUIREMENTS,
            ...MODERN_SLAVERY.WILL_ADHERE_TO_ALL_REQUIREMENTS,
            CONDITIONAL_REASON: {
              ID: CONDITIONAL_REASONS.CANNOT_ADHERE_TO_ALL_REQUIREMENTS,
              ...MODERN_SLAVERY.WILL_ADHERE_TO_ALL_REQUIREMENTS.CONDITIONAL_REASON,
            },
          },
          HAS_NO_OFFENSES_OR_INVESTIGATIONS: {
            ID: HAS_NO_OFFENSES_OR_INVESTIGATIONS,
            ...MODERN_SLAVERY.HAS_NO_OFFENSES_OR_INVESTIGATIONS,
            CONDITIONAL_REASON: {
              ID: CONDITIONAL_REASONS.OFFENSES_OR_INVESTIGATIONS,
              ...MODERN_SLAVERY.HAS_NO_OFFENSES_OR_INVESTIGATIONS.CONDITIONAL_REASON,
            },
          },
          IS_NOT_AWARE_OF_EXISTING_SLAVERY: {
            ID: IS_NOT_AWARE_OF_EXISTING_SLAVERY,
            ...MODERN_SLAVERY.IS_NOT_AWARE_OF_EXISTING_SLAVERY,
            CONDITIONAL_REASON: {
              ID: CONDITIONAL_REASONS.AWARE_OF_EXISTING_SLAVERY,
              ...MODERN_SLAVERY.IS_NOT_AWARE_OF_EXISTING_SLAVERY.CONDITIONAL_REASON,
            },
          },
        },
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}#`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
          HTML_FLAGS,
        }),
        ...pageVariables(referenceNumber),
        userName: getUserNameFromSession(req.session.user),
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
  });

  describe('post', () => {
    const validBody = {
      [WILL_ADHERE_TO_ALL_REQUIREMENTS]: 'true',
      [HAS_NO_OFFENSES_OR_INVESTIGATIONS]: 'true',
      [IS_NOT_AWARE_OF_EXISTING_SLAVERY]: 'true',
    };

    describe('when there are no validation errors', () => {
      beforeEach(() => {
        req.body = validBody;
      });

      it('should call save.declaration with application and submitted values from constructPayload function', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);

        expect(save.declarationModernSlavery).toHaveBeenCalledTimes(1);
        expect(save.declarationModernSlavery).toHaveBeenCalledWith(mockApplication, payload);
      });

      it(`should redirect to ${ALL_SECTIONS}`, async () => {
        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });
    });

    describe('when there are validation errors', () => {
      it('should render template with validation errors from constructPayload function', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);

        const expectedVariables = {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS,
            BACK_LINK: req.headers.referer,
            HTML_FLAGS,
          }),
          ...pageVariables(referenceNumber),
          userName: getUserNameFromSession(req.session.user),
          validationErrors: generateValidationErrors(payload),
          submittedValues: sanitiseData(payload),
        };

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
      });
    });

    describe('when there is no application', () => {
      beforeEach(() => {
        delete res.locals.application;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('api error handling', () => {
      describe('save data call', () => {
        describe('when the save data API call does not return anything', () => {
          beforeEach(() => {
            mockSaveDeclarationModernSlavery = jest.fn(() => Promise.resolve(false));
            save.declarationModernSlavery = mockSaveDeclarationModernSlavery;

            req.body = validBody;
          });

          it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
          });
        });

        describe('when the save data API call fails', () => {
          beforeEach(() => {
            mockSaveDeclarationModernSlavery = mockSpyPromiseRejection;
            save.declarationModernSlavery = mockSaveDeclarationModernSlavery;

            req.body = validBody;
          });

          it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
          });
        });
      });
    });
  });
});
