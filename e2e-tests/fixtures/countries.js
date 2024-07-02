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

export const AFG = {
  NAME: 'Afghanistan',
  ISO_CODE: 'AFG',
};

export const AUS = {
  NAME: 'Australia',
  ISO_CODE: 'AUS',
};

export const BLR = {
  NAME: 'Belarus',
  ISO_CODE: 'BLR',
};

export const RUS = {
  NAME: 'Russia',
  ISO_CODE: 'RUS',
};

export const MMR = {
  NAME: 'Burma',
  ISO_CODE: 'MMR',
};

export const GBR = {
  NAME: 'United Kingdom',
  ISO_CODE: 'GBR',
};

const mockCountries = [XAD, AFG, DZA, AGO, AUS, BLR, BRA, MMR, FRA, RUS, GBR];

/**
 * COUNTRY_QUOTE_SUPPORT
 * Different types of country support for a quote.
 */
const { 2: QUOTE_ONLINE, 3: QUOTE_BY_EMAIL, 8: QUOTE_UNSUPPORTED } = mockCountries;

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
  2: APPLICATION_ONLINE,
  3: APPLICATION_BY_EMAIL,
  8: APPLICATION_NO_SHORT_TERM_COVER_1,
  4: APPLICATION_NO_SHORT_TERM_COVER_2,
  1: APPLICATION_UNSUPPORTED_1,
  5: APPLICATION_UNSUPPORTED_2,
  7: APPLICATION_UNSUPPORTED_3,
  9: APPLICATION_UNSUPPORTED_4,
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
