import {
  add,
  getMonth,
  getYear,
} from 'date-fns';
import { FIELD_IDS } from '../../constants';
import { GBP_CURRENCY_CODE } from './currencies';

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      CONTRACT_POLICY: {
        REQUESTED_START_DATE,
        CREDIT_PERIOD_WITH_BUYER,
        POLICY_CURRENCY_CODE,
        SINGLE: { CONTRACT_COMPLETION_DATE, TOTAL_CONTRACT_VALUE },
        MULTIPLE: { TOTAL_MONTHS_OF_COVER, TOTAL_SALES_TO_BUYER, MAXIMUM_BUYER_WILL_OWE },
      },
      ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION },
    },
    EXPORTER_BUSINESS: {
      COMPANY_HOUSE: {
        COMPANY_SIC,
      },
      NATURE_OF_YOUR_BUSINESS: {
        GOODS_OR_SERVICES,
        YEARS_EXPORTING,
        EMPLOYEES_UK,
        EMPLOYEES_INTERNATIONAL,
      },
      TURNOVER: {
        FINANCIAL_YEAR_END_DATE,
        ESTIMATED_ANNUAL_TURNOVER,
        PERCENTAGE_TURNOVER,
      },
      BROKER: {
        NAME,
        ADDRESS_LINE_1,
        ADDRESS_LINE_2,
        TOWN,
        COUNTY,
        POSTCODE,
        EMAIL,
      },
    },
  },
} = FIELD_IDS;

/**
 * Application data we use and assert in E2E tests.
 */
const date = new Date();
export const startDate = add(date, { months: 3 });
export const endDate = add(startDate, { months: 6 });

const application = {
  POLICY_AND_EXPORTS: {
    [REQUESTED_START_DATE]: {
      day: '1',
      month: getMonth(startDate),
      year: getYear(startDate),
    },
    [CONTRACT_COMPLETION_DATE]: {
      day: '1',
      month: getMonth(endDate),
      year: getYear(endDate),
    },
    [TOTAL_CONTRACT_VALUE]: '10000',
    [CREDIT_PERIOD_WITH_BUYER]: 'mock free text',
    [POLICY_CURRENCY_CODE]: GBP_CURRENCY_CODE,
    [TOTAL_MONTHS_OF_COVER]: '2',
    [TOTAL_SALES_TO_BUYER]: '1000',
    [MAXIMUM_BUYER_WILL_OWE]: '500',
    [DESCRIPTION]: 'Mock description',
    [FINAL_DESTINATION]: 'DZA',
  },
  EXPORTER_COMPANY: {
    [COMPANY_SIC]: ['64999'],
    [FINANCIAL_YEAR_END_DATE]: '31 July',
  },
  EXPORTER_BUSINESS: {
    [GOODS_OR_SERVICES]: 'abc',
    [YEARS_EXPORTING]: '0',
    [EMPLOYEES_INTERNATIONAL]: '2005',
    [EMPLOYEES_UK]: '2000',
    [ESTIMATED_ANNUAL_TURNOVER]: '65000',
    [PERCENTAGE_TURNOVER]: '0',
  },
  EXPORTER_BROKER: {
    [NAME]: 'name',
    [ADDRESS_LINE_1]: 'Address line 1',
    [ADDRESS_LINE_2]: 'Address line 2',
    [TOWN]: 'town',
    [COUNTY]: 'county',
    [POSTCODE]: 'SW1A 2HQ',
    [EMAIL]: Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT'),
  },
};

export default application;
