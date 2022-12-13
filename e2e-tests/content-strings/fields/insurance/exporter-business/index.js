import { FIELD_IDS } from '../../../../constants';

export const EXPORTER_BUSINESS_FIELDS = {
  [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE.SUMMARY_LIST]: {
    LABEL: 'Your business',
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
  [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.YOUR_COMPANY.TRADING_NAME]: {
    LABEL: 'Do you use a different trading name for this company?',
  },
  [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.YOUR_COMPANY.TRADING_ADDRESS]: {
    LABEL: 'Do you trade from a different address to your registered office address for this company?',
  },
  [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.YOUR_COMPANY.WEBSITE]: {
    LABEL: 'Enter your company website, if you have one (optional)',
  },
};
