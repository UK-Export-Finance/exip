// CIS = Country Information System

export const EXTERNAL_API_DEFINITIONS = {
  CIS: {
    ESRA_CLASSIFICATION: {
      VERY_HIGH: 'Very High',
      HIGH: 'High',
      STANDARD: 'Standard Risk',
      NONE: 'None',
    },
    SHORT_TERM_COVER: {
      YES: 'Yes',
      NO: 'No',
      ILC: 'ILC Only',
      CILC: 'CILC Only',
      REFER: 'Refer',
      UNLISTED: 'Unlisted',
    },
    NBI_ISSUE_AVAILABLE: {
      YES: 'Y',
      NO: 'N',
    },
    NO_COVER: 'Off cover',
    INVALID_COUNTRIES: [
      'CABEI',
      'Cor Andino Fom',
      'Eastern and Southern African Trade and Development Bank',
      'EC Market n/k',
      'Non EC Market n/k',
      'Non UK',
      'Third Country',
    ],
    INVALID_CURRENCIES: ['Gold'],
    COUNTRY_RATINGS: {
      A: ['AAA', 'AA+', 'AA', 'AA-', 'A+', 'A', 'A-'],
      B: ['BBB+', 'BBB', 'BBB-', 'BB+', 'BB', 'BB-', 'B+', 'B', 'B-'],
      C: ['CCC+', 'CCC', 'CCC-', 'CC', 'C'],
      D: ['D'],
      NOT_APPLICABLE: 'N/A',
    },
  },
  COMPANIES_HOUSE: {
    COMPANY_STATUS: {
      ACTIVE: 'active',
    },
  },
};

export const EXTERNAL_API_MAPPINGS = {
  CIS: {
    ESRA_CLASSIFICATION: {
      VERY_HIGH: 'Very High',
      HIGH: 'High',
      STANDARD: 'Standard',
    },
  },
};

export const EXTERNAL_API_ENDPOINTS = {
  APIM_MDM: {
    CURRENCY: '/currencies',
    CURRENCY_EXCHANGE: '/currencies/exchange',
    INDUSTRY_SECTORS: '/sector-industries',
    MARKETS: '/markets',
  },
};
