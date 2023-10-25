import FIELD_IDS from '../../../../constants/field-ids/insurance';

const { EXPORTER_BUSINESS } = FIELD_IDS;
const {
  YOUR_COMPANY: { TRADING_ADDRESS, TRADING_NAME, PHONE_NUMBER, WEBSITE },
  NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES, YEARS_EXPORTING, EMPLOYEES_UK, EMPLOYEES_INTERNATIONAL },
  TURNOVER: { ESTIMATED_ANNUAL_TURNOVER, PERCENTAGE_TURNOVER },
  BROKER: { USING_BROKER, NAME, ADDRESS_LINE_1, EMAIL },
} = EXPORTER_BUSINESS;

export const FIELDS = {
  COMPANY_DETAILS: {
    [TRADING_NAME]: {
      SUMMARY: {
        TITLE: 'Different trading name?',
      },
    },
    [TRADING_ADDRESS]: {
      SUMMARY: {
        TITLE: 'Different trading address?',
      },
    },
    [WEBSITE]: {
      SUMMARY: {
        TITLE: 'Company website (optional)',
      },
    },
    [PHONE_NUMBER]: {
      SUMMARY: {
        TITLE: 'UK telephone number (optional)',
      },
    },
  },
  NATURE_OF_YOUR_BUSINESS: {
    [GOODS_OR_SERVICES]: {
      SUMMARY: {
        TITLE: 'Goods or services your business supplies',
      },
    },
    [YEARS_EXPORTING]: {
      SUMMARY: {
        TITLE: 'Years exporting',
      },
    },
    [EMPLOYEES_UK]: {
      SUMMARY: {
        TITLE: 'UK employees',
      },
    },
    [EMPLOYEES_INTERNATIONAL]: {
      SUMMARY: {
        TITLE: 'Worldwide employees including UK employees',
      },
    },
  },
  TURNOVER: {
    [ESTIMATED_ANNUAL_TURNOVER]: {
      SUMMARY: {
        TITLE: 'Estimated turnover this current financial year',
      },
    },
    [PERCENTAGE_TURNOVER]: {
      SUMMARY: {
        TITLE: 'Percentage of turnover from exports',
      },
    },
  },
  BROKER: {
    [USING_BROKER]: {
      SUMMARY: {
        TITLE: 'Using a broker for this insurance?',
      },
    },
    [NAME]: {
      SUMMARY: {
        TITLE: "Broker's name or company",
      },
    },
    [ADDRESS_LINE_1]: {
      SUMMARY: {
        TITLE: "Broker's address",
      },
    },
    [EMAIL]: {
      SUMMARY: {
        TITLE: "Broker's email",
      },
    },
  },
};
