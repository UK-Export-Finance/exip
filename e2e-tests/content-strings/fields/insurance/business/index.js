import { FIELD_IDS } from '../../../../constants';

export const EXPORTER_BUSINESS_FIELDS = {
  [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE.SUMMARY_LIST]: {
    LABEL: 'Your company',
    COMPANY_NUMBER: {
      text: 'Companies House registration number',
    },
    COMPANY_NAME: {
      text: 'Company name',
    },
    COMPANY_ADDRESS: {
      text: 'Registered office address',
    },
    COMPANY_INCORPORATED: {
      text: 'Incorporated on',
    },
    COMPANY_SIC: {
      text: 'Standard industrial classification (SIC) codes and nature of business',
    },
  },
  [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE.INPUT]: {
    LABEL: 'Enter your Companies House registration number (CRN)',
    HINT: 'For example, 8989898 or SC907816. You\'ll find it on your incorporation certificate or on the Companies House website',
  },
  [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE.COMPANY_NUMBER]: {
    SUMMARY: {
      TITLE: 'Companies House registration number',
    },
  },
  [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE.COMPANY_NAME]: {
    SUMMARY: {
      TITLE: 'Company name',
    },
  },
  [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE.COMPANY_ADDRESS]: {
    SUMMARY: {
      TITLE: 'Registered office address',
    },
  },
  [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE.COMPANY_INCORPORATED]: {
    SUMMARY: {
      TITLE: 'Date incorporated',
    },
  },
  [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE.COMPANY_SIC]: {
    SUMMARY: {
      TITLE: 'Standard industry classification (SIC) codes and nature of business',
    },
  },
  [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE.FINANCIAL_YEAR_END_DATE]: {
    SUMMARY: {
      TITLE: 'Financial year end date',
    },
  },
  [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.YOUR_COMPANY.TRADING_NAME]: {
    LABEL: 'Do you use a different trading name for this company?',
    SUMMARY: {
      TITLE: 'Different trading name?',
    },
  },
  [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.YOUR_COMPANY.TRADING_ADDRESS]: {
    LABEL: 'Do you trade from a different address to your registered office address for this company?',
    SUMMARY: {
      TITLE: 'Different trading address?',
    },
  },
  [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.YOUR_COMPANY.WEBSITE]: {
    LABEL: 'Enter your company website, if you have one (optional)',
    SUMMARY: {
      TITLE: 'Company website (optional)',
    },
  },
  [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.YOUR_COMPANY.PHONE_NUMBER]: {
    LABEL: 'Your UK telephone number (optional)',
    HINT: 'We may need to contact you about your application',
    SUMMARY: {
      TITLE: 'UK telephone number (optional)',
    },
  },
  CONTACT: {
    [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.CONTACT.COMPANY_NAME]: {
      LABEL: 'Your company name',
      HINT: 'This information comes from Companies House',
    },
    [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.CONTACT.NAME]: {
      SUMMARY: {
        TITLE: 'Contact name',
      },
    },
    [FIELD_IDS.INSURANCE.ACCOUNT.EMAIL]: {
      SUMMARY: {
        TITLE: 'Contact email',
      },
    },
    [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.CONTACT.POSITION]: {
      LABEL: 'Position at company',
      SUMMARY: {
        TITLE: 'Position at company',
      },
    },
  },
  NATURE_OF_YOUR_BUSINESS: {
    [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_YOUR_BUSINESS.GOODS_OR_SERVICES]: {
      LABEL: 'What goods or services does your company supply?',
      HINT: 'Give a general overview rather than just the exports you want to insure',
      MAXIMUM: 1000,
      SUMMARY: {
        TITLE: 'Goods or services your business supplies',
      },
    },
    [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_YOUR_BUSINESS.YEARS_EXPORTING]: {
      LABEL: 'How many years have you been exporting for?',
      HINT: 'Round to the nearest year',
      SUFFIX: 'Years',
      SUMMARY: {
        TITLE: 'Years exporting',
      },
    },
    [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_YOUR_BUSINESS.EMPLOYEES_UK]: {
      HEADING: 'How many employees do you have?',
      LABEL: 'In the UK',
      SUMMARY: {
        TITLE: 'UK employees',
      },
    },
    [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_YOUR_BUSINESS.EMPLOYEES_INTERNATIONAL]: {
      LABEL: 'Worldwide including UK',
      SUMMARY: {
        TITLE: 'Worldwide employees including UK employees',
      },
    },
  },
  TURNOVER: {
    [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.TURNOVER.FINANCIAL_YEAR_END_DATE]: {
      LABEL: 'Your financial year end date',
      HINT: 'This information comes from Companies House',
    },
    [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.TURNOVER.ESTIMATED_ANNUAL_TURNOVER]: {
      HEADING: 'Estimated annual turnover for this current financial year',
      LABEL: 'Estimate this to the nearest pound. Do not use decimal points.',
      PREFIX: '£',
      SUMMARY: {
        TITLE: 'Estimated turnover this current financial year',
      },
    },
    [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.TURNOVER.PERCENTAGE_TURNOVER]: {
      LABEL: 'Percentage of turnover from exports',
      SUFFIX: '%',
      SUMMARY: {
        TITLE: 'Percentage of turnover from exports',
      },
    },
  },
  BROKER: {
    [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.BROKER.HEADING]: {
      HEADING: 'Enter contact details for your broker',
    },
    [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.BROKER.USING_BROKER]: {
      SUMMARY: {
        TITLE: 'Using a broker for this insurance?',
      },
    },
    [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.BROKER.NAME]: {
      LABEL: 'Name of broker or company',
      SUMMARY: {
        TITLE: "Broker's name or company",
      },
    },
    [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.BROKER.ADDRESS_LINE_1]: {
      LABEL: 'Address line 1',
      SUMMARY: {
        TITLE: "Broker's address",
      },
    },
    [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.BROKER.ADDRESS_LINE_2]: {
      LABEL: 'Address line 2 (optional)',
    },
    [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.BROKER.TOWN]: {
      LABEL: 'Town or city',
    },
    [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.BROKER.COUNTY]: {
      LABEL: 'County (optional)',
    },
    [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.BROKER.POSTCODE]: {
      LABEL: 'Postcode',
    },
    [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.BROKER.EMAIL]: {
      LABEL: 'Email address',
      SUMMARY: {
        TITLE: "Broker's email",
      },
    },
    [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.BROKER.DETAILS]: {
      SUMMARY: 'Why appoint a broker?',
      LINE_1: 'A broker can advise you during the application process and lifetime of any UKEF insurance policy.',
      LINE_2: "You can find your nearest one on UKEF's list of approved brokers.",
      LINK_TEXT: "UKEF's list of approved brokers.",
      LINE_3: 'Alternatively, you can use any broker you prefer. They do not have to be approved by UKEF.',
      LINE_4: 'Appointing a broker does not change the cost to you of any UKEF export insurance policy.',
    },
  },
};
