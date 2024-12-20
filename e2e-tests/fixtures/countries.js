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

export const BLR = {
  NAME: 'Belarus',
  ISO_CODE: 'BLR',
};

export const GBR = {
  NAME: 'United Kingdom',
  ISO_CODE: 'GBR',
};

const mockCountries = [DZA, FRA, AGO, GBR, AFG, BLR, XAD, BRA];

const ONLINE_SUPPORT_1 = DZA;
const NO_ONLINE_SUPPORT_1 = FRA;
const NO_ONLINE_SUPPORT_2 = AGO;
const NOT_SUPPORTED_1 = GBR;
const NOT_SUPPORTED_2 = AFG;
const NOT_SUPPORTED_3 = BLR;
const NOT_SUPPORTED_4 = XAD;

/**
 * COUNTRY_QUOTE_SUPPORT
 * Different types of country support for a quote.
 */
export const COUNTRY_QUOTE_SUPPORT = {
  ONLINE_SUPPORT_1,
  NO_ONLINE_SUPPORT_1,
  NOT_SUPPORTED_1,
};

// TODO: rename "by email e2e tests" to be "no online support"?

/**
 * COUNTRY_APPLICATION_SUPPORT
 * Different types of country support for an application
 */
export const COUNTRY_APPLICATION_SUPPORT = {
  ONLINE_SUPPORT: ONLINE_SUPPORT_1,
  NO_ONLINE_SUPPORT_1,
  NO_ONLINE_SUPPORT_2,
  NOT_SUPPORTED_1,
  NOT_SUPPORTED_2,
  NOT_SUPPORTED_3,
  NOT_SUPPORTED_4,
};

export default mockCountries;
