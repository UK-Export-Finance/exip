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
  {
    NAME: 'Australia',
    ISO_CODE: 'AUS',
  },
  {
    NAME: 'Belarus',
    ISO_CODE: 'BLR',
  },
  {
    NAME: 'Russia',
    ISO_CODE: 'RUS',
  },
  {
    NAME: 'Burma',
    ISO_CODE: 'MMR',
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
  3: APPLICATION_NO_SHORT_TERM_COVER_1,
  6: APPLICATION_UNSUPPORTED_1,
  7: APPLICATION_NO_SHORT_TERM_COVER_2,
  8: APPLICATION_UNSUPPORTED_2,
  9: APPLICATION_UNSUPPORTED_3,
  10: APPLICATION_UNSUPPORTED_4,
} = mockCountries;

export const COUNTRY_APPLICATION_SUPPORT = {
  ONLINE: APPLICATION_ONLINE,
  BY_EMAIL: APPLICATION_BY_EMAIL,
  UNSUPPORTED_1: APPLICATION_UNSUPPORTED_1,
  UNSUPPORTED_2: APPLICATION_UNSUPPORTED_2,
  UNSUPPORTED_3: APPLICATION_UNSUPPORTED_3,
  UNSUPPORTED_4: APPLICATION_UNSUPPORTED_4,
  NO_SHORT_TERM_COVER_1: APPLICATION_NO_SHORT_TERM_COVER_1,
  NO_SHORT_TERM_COVER_2: APPLICATION_NO_SHORT_TERM_COVER_2,
};

export default mockCountries;
