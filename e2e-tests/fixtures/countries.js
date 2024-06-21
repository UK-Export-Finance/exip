export const XAD = {
  NAME: 'Abu Dhabi',
  ISO_CODE: 'XAD',
};

export const DZA = {
  NAME: 'Algeria',
  ISO_CODE: 'DZA',
};

export const AGO = {
  NAME: 'Angola',
  ISO_CODE: 'AGO',
};

export const FRA = {
  NAME: 'France',
  ISO_CODE: 'FRA',
};

export const BRA = {
  NAME: 'Brazil',
  ISO_CODE: 'BRA',
};

export const GBR = {
  NAME: 'United Kingdom',
  ISO_CODE: 'GBR',
};

const mockCountries = [
  {
    NAME: 'Abu Dhabi',
    ISO_CODE: 'XAD',
  },
  {
    NAME: 'Algeria',
    ISO_CODE: 'DZA',
  },
  {
    NAME: 'Angola',
    ISO_CODE: 'AGO',
  },
  {
    NAME: 'France',
    ISO_CODE: 'FRA',
  },
  {
    NAME: 'Brazil',
    ISO_CODE: 'BRA',
  },
  {
    NAME: 'United Kingdom',
    ISO_CODE: 'GBR',
  },
  {
    NAME: 'Afghanistan',
    ISO_CODE: 'AFG',
  },
];

/**
 * COUNTRY_QUOTE_SUPPORT
 * Different types of country support for a quote.
 */
const { 1: QUOTE_ONLINE, 2: QUOTE_BY_EMAIL, 3: QUOTE_UNSUPPORTED } = mockCountries;

export const COUNTRY_QUOTE_SUPPORT = {
  ONLINE: QUOTE_ONLINE,
  BY_EMAIL: QUOTE_BY_EMAIL,
  UNSUPPORTED: QUOTE_UNSUPPORTED,
};

/**
 * COUNTRY_APPLICATION_SUPPORT
 * Different types of country support for an application
 */
const {
  1: APPLICATION_ONLINE,
  2: APPLICATION_BY_EMAIL,
  3: APPLICATION_OFFLINE,
  5: APPLICATION_UNSUPPORTED,
  6: APPLICATION_NO_SHORT_TERM_COVER,
} = mockCountries;

export const COUNTRY_APPLICATION_SUPPORT = {
  ONLINE: APPLICATION_ONLINE,
  BY_EMAIL: APPLICATION_BY_EMAIL,
  OFFLINE: APPLICATION_OFFLINE,
  UNSUPPORTED: APPLICATION_UNSUPPORTED,
  NO_SHORT_TERM_COVER: APPLICATION_NO_SHORT_TERM_COVER,
};

export default mockCountries;
