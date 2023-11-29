// CIS = Country Information System

export const EXTERNAL_API_DEFINITIONS = {
  CIS: {
    RISK: {
      VERY_HIGH: 'Very High',
      HIGH: 'High',
      STANDARD: 'Standard Risk',
    },
    SHORT_TERM_COVER_AVAILABLE: {
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
    INVALID_COUNTRIES: ['EC Market n/k', 'Non EC Market n/k', 'Non UK', 'Third Country', 'Eastern and Southern African Trade and Development Bank'],
  },
  COMPANIES_HOUSE: {
    COMPANY_STATUS: {
      ACTIVE: 'active',
    },
  },
};

export const EXTERNAL_API_MAPPINGS = {
  CIS: {
    RISK: {
      VERY_HIGH: 'Very High',
      HIGH: 'High',
      STANDARD: 'Standard',
    },
  },
};

export const EXTERNAL_API_ENDPOINTS = {
  APIM_MDM: {
    CURRENCY: '/currencies',
    INDUSTRY_SECTORS: '/sector-industries',
    MARKETS: '/markets',
  },
};
