import { FIELD_ID, pageVariables, TEMPLATE, get, post } from '.';
import { ERROR_MESSAGES } from '../../../../../content-strings';
import { FIELD_IDS, FIELD_VALUES, ROUTES, TEMPLATES, DECLARATIONS } from '../../../../../constants';
import singleInputPageVariables from '../../../../../helpers/page-variables/single-input/insurance';
import getUserNameFromSession from '../../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../../helpers/construct-payload';
import generateValidationErrors from '../../../../../shared-validation/yes-no-radios-form';
import save from '../../save-data';
import { Request, ResponseInsurance } from '../../../../../../types';
import { mockReq, mockResInsurance, mockApplication, mockSpyPromise, mockSpyPromiseRejection, referenceNumber } from '../../../../../test-mocks';

const {
  INSURANCE_ROOT,
  DECLARATIONS: {
    ANTI_BRIBERY: { EXPORTING_WITH_CODE_OF_CONDUCT_SAVE_AND_BACK },
    MODERN_SLAVERY,
  },
  PROBLEM_WITH_SERVICE,
} = ROUTES.INSURANCE;

const { ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT } = DECLARATIONS.LATEST_DECLARATIONS;

describe('controllers/insurance/declarations/anti-bribery/exporting-with-a-code-of-conduct', () => {
  jest.mock('../../save-data');

  let mockSaveDeclaration = mockSpyPromise();

  save.declaration = mockSaveDeclaration;

  let req: Request;
  let res: ResponseInsurance;

  beforeEach(() => {
    req = mockReq();
    res = mockResInsurance();
  });

  describe('FIELD_ID', () => {
    it('should have the correct ID', () => {
      const expected = FIELD_IDS.INSURANCE.DECLARATIONS.WILL_EXPORT_WITH_CODE_OF_CONDUCT;

      expect(FIELD_ID).toEqual(expected);
    });
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(referenceNumber);

      const expected = {
        FIELD: {
          ID: FIELD_ID,
          ...ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT,
        },
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${EXPORTING_WITH_CODE_OF_CONDUCT_SAVE_AND_BACK}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.SHARED_PAGES.SINGLE_RADIO);
    });
  });

  describe('get', () => {
    it('should render template', async () => {
      await get(req, res);

      const expectedVariables = {
        ...singleInputPageVariables({ FIELD_ID, PAGE_CONTENT_STRINGS: ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT, BACK_LINK: req.headers.referer }),
        ...pageVariables(referenceNumber),
        userName: getUserNameFromSession(req.session.user),
        applicationAnswer: mockApplication.declaration[FIELD_ID],
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });
  });

  describe('post', () => {
    const validBody = {
      [FIELD_ID]: FIELD_VALUES.YES,
    };

    describe('when there are no validation errors', () => {
      beforeEach(() => {
        req.body = validBody;
      });

      it('should call save.declaration with application and submitted values from constructPayload function', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, [FIELD_ID]);

        expect(save.declaration).toHaveBeenCalledTimes(1);
        expect(save.declaration).toHaveBeenCalledWith(mockApplication, payload);
      });

      it(`should redirect to ${MODERN_SLAVERY}`, async () => {
        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${referenceNumber}${MODERN_SLAVERY}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });
    });

    describe('when there are validation errors', () => {
      it('should render template with validation errors from constructPayload function', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, [FIELD_ID]);

        const expectedVariables = {
          ...singleInputPageVariables({ FIELD_ID, PAGE_CONTENT_STRINGS: ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT, BACK_LINK: req.headers.referer }),
          ...pageVariables(referenceNumber),
          userName: getUserNameFromSession(req.session.user),
          validationErrors: generateValidationErrors(payload, FIELD_ID, ERROR_MESSAGES.INSURANCE.DECLARATIONS[FIELD_ID].IS_EMPTY),
        };

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
      });
    });

    describe('api error handling', () => {
      describe('save data call', () => {
        describe('when the save data API call returns false', () => {
          beforeEach(() => {
            mockSaveDeclaration = jest.fn(() => Promise.resolve(false));
            save.declaration = mockSaveDeclaration;

            req.body = validBody;
          });

          it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
          });
        });

        describe('when the save data API call fails', () => {
          beforeEach(() => {
            mockSaveDeclaration = mockSpyPromiseRejection;
            save.declaration = mockSaveDeclaration;

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
