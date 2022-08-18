import { generatePageVariables, get, post } from '.';
import { BUTTONS, FIELDS, FOOTER, PAGES, PRODUCT } from '../../../content-strings';
import { FIELD_IDS, FIELD_VALUES, PERCENTAGES_OF_COVER, ROUTES, TEMPLATES } from '../../../constants';
import api from '../../../api';
import { mapCurrencies } from '../../../helpers/mappings/map-currencies';
import generateValidationErrors from './validation';
import getCurrencyByCode from '../../../helpers/get-currency-by-code';
import mapPercentageOfCover from '../../../helpers/mappings/map-percentage-of-cover';
import { updateSubmittedData } from '../../../helpers/update-submitted-data';
import { isSinglePolicyType, isMultiPolicyType } from '../../../helpers/policy-type';
import { mockReq, mockRes, mockAnswers, mockSession } from '../../../test-mocks';
import { Request, Response, TellUsAboutPolicyPageVariables } from '../../../../types';

const { AMOUNT_CURRENCY, BUYER_COUNTRY, CONTRACT_VALUE, CREDIT_PERIOD, CURRENCY, MAX_AMOUNT_OWED, PERCENTAGE_OF_COVER, POLICY_TYPE, POLICY_LENGTH } = FIELD_IDS;

describe('controllers/tell-us-about-your-policy', () => {
  let req: Request;
  let res: Response;

  const mockCurrenciesResponse = [
    {
      name: 'Euros',
      isoCode: 'EUR',
    },
    {
      name: 'Hong Kong Dollars',
      isoCode: 'HKD',
    },
    {
      name: 'UK Sterling',
      isoCode: 'GBP',
    },
  ];

  let mappedPercentageOfCover: Array<object>;

  const previousFlowSubmittedData = {
    [BUYER_COUNTRY]: mockSession.submittedData[BUYER_COUNTRY],
    [CONTRACT_VALUE]: mockSession.submittedData[CONTRACT_VALUE],
    [POLICY_TYPE]: mockSession.submittedData[POLICY_TYPE],
    [POLICY_LENGTH]: mockSession.submittedData[POLICY_LENGTH],
  };

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
    req.session.submittedData = mockSession.submittedData;

    mappedPercentageOfCover = mapPercentageOfCover(PERCENTAGES_OF_COVER);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('generatePageVariables', () => {
    describe('when policy type is single', () => {
      it('should return page variables with single policy strings', () => {
        const mockPolicyType = FIELD_VALUES.POLICY_TYPE.SINGLE;

        const result = generatePageVariables(mockPolicyType);

        const expected = {
          CONTENT_STRINGS: {
            PRODUCT,
            FOOTER,
            BUTTONS,
            ...PAGES.TELL_US_ABOUT_YOUR_POLICY_PAGE,
            PAGE_TITLE: PAGES.TELL_US_ABOUT_YOUR_POLICY_PAGE.SINGLE_POLICY_PAGE_TITLE,
            HEADING: PAGES.TELL_US_ABOUT_YOUR_POLICY_PAGE.SINGLE_POLICY_HEADING,
          },
          FIELDS: {
            AMOUNT_CURRENCY: {
              ID: AMOUNT_CURRENCY,
            },
            CURRENCY: {
              ID: CURRENCY,
              ...FIELDS[CURRENCY],
            },
            PERCENTAGE_OF_COVER: {
              ID: PERCENTAGE_OF_COVER,
            },
          },
        } as TellUsAboutPolicyPageVariables;

        expected.FIELDS.AMOUNT_CURRENCY = {
          ID: AMOUNT_CURRENCY,
          ...FIELDS[AMOUNT_CURRENCY].SINGLE_POLICY,
        };

        expected.FIELDS.CONTRACT_VALUE = {
          ID: CONTRACT_VALUE,
          ...FIELDS[CONTRACT_VALUE],
        };

        expected.FIELDS.PERCENTAGE_OF_COVER = {
          ID: PERCENTAGE_OF_COVER,
          ...FIELDS[PERCENTAGE_OF_COVER].SINGLE_POLICY,
        };

        expect(result).toEqual(expected);
      });
    });

    describe('when policy type is multi', () => {
      it('should return page variables with multi policy strings', () => {
        const mockPolicyType = FIELD_VALUES.POLICY_TYPE.MULTI;

        const result = generatePageVariables(mockPolicyType);

        const expected = {
          CONTENT_STRINGS: {
            PRODUCT,
            FOOTER,
            BUTTONS,
            ...PAGES.TELL_US_ABOUT_YOUR_POLICY_PAGE,
            PAGE_TITLE: PAGES.TELL_US_ABOUT_YOUR_POLICY_PAGE.MULTI_POLICY_PAGE_TITLE,
            HEADING: PAGES.TELL_US_ABOUT_YOUR_POLICY_PAGE.MULTI_POLICY_HEADING,
          },
          FIELDS: {
            AMOUNT_CURRENCY: {
              ID: AMOUNT_CURRENCY,
            },
            CURRENCY: {
              ID: CURRENCY,
              ...FIELDS[CURRENCY],
            },
            PERCENTAGE_OF_COVER: {
              ID: PERCENTAGE_OF_COVER,
            },
          },
        } as TellUsAboutPolicyPageVariables;

        expected.FIELDS.AMOUNT_CURRENCY = {
          ID: AMOUNT_CURRENCY,
          ...FIELDS[AMOUNT_CURRENCY].MULTI_POLICY,
        };

        expected.FIELDS.MAX_AMOUNT_OWED = {
          ID: MAX_AMOUNT_OWED,
          ...FIELDS[MAX_AMOUNT_OWED],
        };

        expected.FIELDS.PERCENTAGE_OF_COVER = {
          ID: PERCENTAGE_OF_COVER,
          ...FIELDS[PERCENTAGE_OF_COVER].MULTI_POLICY,
        };

        expected.FIELDS.CREDIT_PERIOD = {
          ID: CREDIT_PERIOD,
          ...FIELDS[CREDIT_PERIOD],
        };

        expect(result).toEqual(expected);
      });
    });

    describe('when policy type is not recognised', () => {
      it('should return base page variables', () => {
        const result = generatePageVariables('');

        const expected = {
          CONTENT_STRINGS: {
            PRODUCT,
            FOOTER,
            BUTTONS,
            ...PAGES.TELL_US_ABOUT_YOUR_POLICY_PAGE,
          },
          FIELDS: {
            AMOUNT_CURRENCY: {
              ID: AMOUNT_CURRENCY,
            },
            CURRENCY: {
              ID: CURRENCY,
              ...FIELDS[CURRENCY],
            },
            PERCENTAGE_OF_COVER: {
              ID: PERCENTAGE_OF_COVER,
            },
          },
        };

        expect(result).toEqual(expected);
      });
    });
  });

  describe('get', () => {
    const getCurrenciesSpy = jest.fn(() => Promise.resolve(mockCurrenciesResponse));

    beforeEach(() => {
      req.session.submittedData = {
        [POLICY_TYPE]: mockSession.submittedData[POLICY_TYPE],
        [BUYER_COUNTRY]: mockSession.submittedData[BUYER_COUNTRY],
      };

      api.getCurrencies = getCurrenciesSpy;
    });

    it('should call api.getCurrencies', async () => {
      await get(req, res);

      expect(getCurrenciesSpy).toHaveBeenCalledTimes(1);
    });

    it('should render template', async () => {
      await get(req, res);

      const expectedCurrencies = mapCurrencies(mockCurrenciesResponse);

      expect(res.render).toHaveBeenCalledWith(TEMPLATES.QUOTE.TELL_US_ABOUT_YOUR_POLICY, {
        ...generatePageVariables(req.session.submittedData[POLICY_TYPE]),
        BACK_LINK: req.headers.referer,
        isSinglePolicyType: isSinglePolicyType(req.session.submittedData[POLICY_TYPE]),
        isMultiPolicyType: isMultiPolicyType(req.session.submittedData[POLICY_TYPE]),
        currencies: expectedCurrencies,
        percentageOfCover: mappedPercentageOfCover,
        submittedValues: req.session.submittedData,
      });
    });

    describe('when a currency has been submitted', () => {
      beforeEach(() => {
        req.session.submittedData = mockSession.submittedData;
        delete req.session.submittedData[PERCENTAGE_OF_COVER];
      });

      it('should render template with currencies mapped to submitted currency and submittedValues', async () => {
        await get(req, res);

        const expectedCurrencies = mapCurrencies(mockCurrenciesResponse, req.session.submittedData[CURRENCY].isoCode);

        expect(res.render).toHaveBeenCalledWith(TEMPLATES.QUOTE.TELL_US_ABOUT_YOUR_POLICY, {
          ...generatePageVariables(req.session.submittedData[POLICY_TYPE]),
          BACK_LINK: req.headers.referer,
          isSinglePolicyType: isSinglePolicyType(req.session.submittedData[POLICY_TYPE]),
          isMultiPolicyType: isMultiPolicyType(req.session.submittedData[POLICY_TYPE]),
          currencies: expectedCurrencies,
          percentageOfCover: mappedPercentageOfCover,
          submittedValues: req.session.submittedData,
        });
      });
    });

    describe('when a percentage of cover has been submitted', () => {
      beforeEach(() => {
        req.session.submittedData = mockSession.submittedData;
        req.session.submittedData[PERCENTAGE_OF_COVER] = mockAnswers[PERCENTAGE_OF_COVER];
      });

      it('should render template with percentage of cover mapped to submitted percentage and submittedValues', async () => {
        await get(req, res);

        const expectedCurrencies = mapCurrencies(mockCurrenciesResponse, req.session.submittedData[CURRENCY].isoCode);

        const mappedPercentageOfCoverWithSelected = mapPercentageOfCover(PERCENTAGES_OF_COVER, req.session.submittedData[PERCENTAGE_OF_COVER]);

        expect(res.render).toHaveBeenCalledWith(TEMPLATES.QUOTE.TELL_US_ABOUT_YOUR_POLICY, {
          ...generatePageVariables(req.session.submittedData[POLICY_TYPE]),
          BACK_LINK: req.headers.referer,
          isSinglePolicyType: isSinglePolicyType(req.session.submittedData[POLICY_TYPE]),
          isMultiPolicyType: isMultiPolicyType(req.session.submittedData[POLICY_TYPE]),
          currencies: expectedCurrencies,
          percentageOfCover: mappedPercentageOfCoverWithSelected,
          submittedValues: req.session.submittedData,
        });
      });
    });
  });

  describe('post', () => {
    const getCurrenciesSpy = jest.fn(() => Promise.resolve(mockCurrenciesResponse));

    beforeEach(() => {
      api.getCurrencies = getCurrenciesSpy;
      req.body = mockAnswers;
      req.session.submittedData = previousFlowSubmittedData;
    });

    describe('when a currency code has been submitted', () => {
      it('should call api.getCurrencies', async () => {
        await post(req, res);

        expect(getCurrenciesSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('when there are validation errors', () => {
      beforeEach(() => {
        req.body = {};
      });

      it('should render template with validation errors and submitted values', async () => {
        await post(req, res);

        expect(res.render).toHaveBeenCalledWith(TEMPLATES.QUOTE.TELL_US_ABOUT_YOUR_POLICY, {
          ...generatePageVariables(req.session.submittedData[POLICY_TYPE]),
          BACK_LINK: req.headers.referer,
          isSinglePolicyType: isSinglePolicyType(req.session.submittedData[POLICY_TYPE]),
          isMultiPolicyType: isMultiPolicyType(req.session.submittedData[POLICY_TYPE]),
          currencies: mapCurrencies(mockCurrenciesResponse),
          validationErrors: generateValidationErrors({
            ...req.session.submittedData,
            ...req.body,
          }),
          percentageOfCover: mappedPercentageOfCover,
          submittedValues: req.body,
        });
      });

      describe('when a currency code has been submitted', () => {
        beforeEach(() => {
          req.session.submittedData = previousFlowSubmittedData;
          req.body[CURRENCY] = mockAnswers[CURRENCY];
        });

        it('should render template with mapped submitted currency', async () => {
          await post(req, res);

          expect(res.render).toHaveBeenCalledWith(TEMPLATES.QUOTE.TELL_US_ABOUT_YOUR_POLICY, {
            ...generatePageVariables(req.session.submittedData[POLICY_TYPE]),
            BACK_LINK: req.headers.referer,
            isSinglePolicyType: isSinglePolicyType(req.session.submittedData[POLICY_TYPE]),
            isMultiPolicyType: isMultiPolicyType(req.session.submittedData[POLICY_TYPE]),
            currencies: mapCurrencies(mockCurrenciesResponse, req.body[CURRENCY]),
            validationErrors: generateValidationErrors({
              ...req.session.submittedData,
              ...req.body,
            }),
            percentageOfCover: mappedPercentageOfCover,
            submittedValues: req.body,
          });
        });
      });

      describe('when a percentage of cover has been submitted', () => {
        beforeEach(() => {
          req.body[PERCENTAGE_OF_COVER] = mockAnswers[PERCENTAGE_OF_COVER];
        });

        it('should render template with mapped submitted percentage', async () => {
          await post(req, res);

          const mappedPercentageOfCoverWithSelected = mapPercentageOfCover(PERCENTAGES_OF_COVER, req.body[PERCENTAGE_OF_COVER]);

          expect(res.render).toHaveBeenCalledWith(TEMPLATES.QUOTE.TELL_US_ABOUT_YOUR_POLICY, {
            ...generatePageVariables(req.session.submittedData[POLICY_TYPE]),
            BACK_LINK: req.headers.referer,
            isSinglePolicyType: isSinglePolicyType(req.session.submittedData[POLICY_TYPE]),
            isMultiPolicyType: isMultiPolicyType(req.session.submittedData[POLICY_TYPE]),
            currencies: mapCurrencies(mockCurrenciesResponse, req.body[CURRENCY]),
            validationErrors: generateValidationErrors({
              ...req.session.submittedData,
              ...req.body,
            }),
            percentageOfCover: mappedPercentageOfCoverWithSelected,
            submittedValues: req.body,
          });
        });
      });
    });

    describe('when there are no validation errors', () => {
      const validBody = {
        [CURRENCY]: mockAnswers[CURRENCY],
        [CONTRACT_VALUE]: '10',
        [POLICY_LENGTH]: '40',
        [PERCENTAGE_OF_COVER]: '95',
      };

      beforeEach(() => {
        req.body = validBody;
      });

      it('should update the session with submitted data, popluated with full currency object', async () => {
        await post(req, res);

        const expectedPopulatedData = {
          ...validBody,
          [CURRENCY]: getCurrencyByCode(mockCurrenciesResponse, validBody[CURRENCY]),
          [PERCENTAGE_OF_COVER]: validBody[PERCENTAGE_OF_COVER],
        };

        const expected = updateSubmittedData(expectedPopulatedData, req.session.submittedData);

        expect(req.session.submittedData).toEqual(expected);
      });

      it(`should redirect to ${ROUTES.QUOTE.CHECK_YOUR_ANSWERS}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.QUOTE.CHECK_YOUR_ANSWERS);
      });

      describe("when the url's last substring is `change`", () => {
        it(`should redirect to ${ROUTES.QUOTE.CHECK_YOUR_ANSWERS}`, async () => {
          req.originalUrl = 'mock/change';

          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(ROUTES.QUOTE.CHECK_YOUR_ANSWERS);
        });
      });
    });
  });
});
