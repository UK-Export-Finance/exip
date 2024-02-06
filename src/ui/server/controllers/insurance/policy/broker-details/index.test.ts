import { pageVariables, PAGE_CONTENT_STRINGS, TEMPLATE, get } from '.';
import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import POLICY_FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import { POLICY_FIELDS } from '../../../../content-strings/fields/insurance/policy';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockApplication } from '../../../../test-mocks';

const { NAME, EMAIL, FULL_ADDRESS } = POLICY_FIELD_IDS.BROKER;

const { PROBLEM_WITH_SERVICE } = INSURANCE_ROUTES;

const { BROKER: BROKER_FIELDS } = POLICY_FIELDS;

describe('controllers/insurance/policy/broker-details', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct strings', () => {
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.POLICY.BROKER);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.POLICY.BROKER_DETAILS);
    });
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables;

      const expected = {
        FIELDS: {
          NAME: {
            ID: NAME,
            ...BROKER_FIELDS[NAME],
          },
          EMAIL: {
            ID: EMAIL,
            ...BROKER_FIELDS[EMAIL],
          },
          FULL_ADDRESS: {
            ID: FULL_ADDRESS,
            ...BROKER_FIELDS[FULL_ADDRESS],
          },
        },
      };

      expect(result).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should render the broker details template with correct variables', () => {
      get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
        }),
        userName: getUserNameFromSession(req.session.user),
        application: mapApplicationToFormFields(mockApplication),
        ...pageVariables,
      });
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
});
