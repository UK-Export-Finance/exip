import { get, post, pageVariables, PAGE_CONTENT_STRINGS, TEMPLATE, FIELD_IDS } from '.';
import { PAGES } from '../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import YOUR_BUYER_FIELD_IDS from '../../../../constants/field-ids/insurance/your-buyer';
import { TEMPLATES } from '../../../../constants';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import generateValidationErrors from './validation';
import constructPayload from '../../../../helpers/construct-payload';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockApplication, mockBuyer } from '../../../../test-mocks';
import { sanitiseData } from '../../../../helpers/sanitise-data';

const {
  INSURANCE_ROOT,
  YOUR_BUYER: { WORKING_WITH_BUYER, CONNECTION_TO_THE_BUYER_SAVE_AND_BACK: SAVE_AND_BACK },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const { CONNECTED_WITH_BUYER, CONNECTION_WITH_BUYER_DESCRIPTION } = YOUR_BUYER_FIELD_IDS.WORKING_WITH_BUYER;

const { exporterIsConnectedWithBuyer, connectionWithBuyerDescription } = mockBuyer;

describe('controllers/insurance/your-buyer/connection-to-the-buyer', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    req.params.referenceNumber = String(mockApplication.referenceNumber);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(mockApplication.referenceNumber);

      const expected = {
        FIELDS: {
          CONNECTED_WITH_BUYER: {
            ID: CONNECTED_WITH_BUYER,
            HINT: PAGE_CONTENT_STRINGS.HINT,
          },
          CONNECTION_WITH_BUYER_DESCRIPTION: {
            ID: CONNECTION_WITH_BUYER_DESCRIPTION,
            ...FIELDS.WORKING_WITH_BUYER[CONNECTION_WITH_BUYER_DESCRIPTION],
            MAXIMUM: 1000,
          },
        },
        PAGE_CONTENT_STRINGS,
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${SAVE_AND_BACK}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct page content strings', () => {
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.YOUR_BUYER.CONNECTION_TO_THE_BUYER);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.YOUR_BUYER.CONNECTION_TO_THE_BUYER);
    });
  });

  describe('FIELD_IDS', () => {
    it('should have the correct FIELD_IDS', () => {
      const expected = [CONNECTED_WITH_BUYER, CONNECTION_WITH_BUYER_DESCRIPTION];

      expect(FIELD_IDS).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should render template', async () => {
      await get(req, res);

      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(mockApplication.referenceNumber),
        userName: getUserNameFromSession(req.session.user),
        application: mapApplicationToFormFields(mockApplication),
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
      exporterIsConnectedWithBuyer,
      connectionWithBuyerDescription,
    };

    describe('when there are no validation errors', () => {
      beforeEach(() => {
        req.body = validBody;
      });

      it('should redirect to the next page', async () => {
        await post(req, res);
        const expected = `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${WORKING_WITH_BUYER}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });
    });

    describe('when there are validation errors', () => {
      it('should render template with validation errors', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);

        const validationErrors = generateValidationErrors(payload);

        const expectedVariables = {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS,
            BACK_LINK: req.headers.referer,
          }),
          ...pageVariables(mockApplication.referenceNumber),
          userName: getUserNameFromSession(req.session.user),
          validationErrors,
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
  });
});
