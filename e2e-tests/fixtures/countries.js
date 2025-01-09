export const AGO = {
  NAME: 'Angola',
  ISO_CODE: 'AGO',
};

export const ARG = {
  NAME: 'Argentina',
  ISO_CODE: 'AGO',
};

export const BLZ = {
  NAME: 'Belize',
  ISO_CODE: 'BLZ',
};

export const BRA = {
  NAME: 'Brazil',
  ISO_CODE: 'BRA',
};

export const DZA = {
  NAME: 'Algeria',
  ISO_CODE: 'DZA',
};

export const ERI = {
  NAME: 'Eritrea',
  ISO_CODE: 'ERI',
};

export const FRA = {
  NAME: 'France',
  ISO_CODE: 'FRA',
};

export const GBR = {
  NAME: 'United Kingdom',
  ISO_CODE: 'GBR',
};

export const IOT = {
  NAME: 'British Indian Ocean Territory',
  ISO_CODE: 'IOT',
};

export const IRL = {
  NAME: 'Ireland',
  ISO_CODE: 'IRL',
};

export const NCL = {
  NAME: 'New Caledonia',
  ISO_CODE: 'NCL',
};

export const TN = {
  NAME: 'Tunisia',
  ISO_CODE: 'TN',
};

export const XAD = {
  NAME: 'Abu Dhabi',
  ISO_CODE: 'XAD',
};

const mockCountries = [DZA, FRA, AGO, GBR, XAD, BRA];

const ONLINE_SUPPORT_1 = DZA;

const NO_ONLINE_SUPPORT_1 = AGO;
const NO_ONLINE_SUPPORT_2 = ARG;
const NO_ONLINE_SUPPORT_3 = BLZ;
const NO_ONLINE_SUPPORT_4 = TN;
const NO_ONLINE_SUPPORT_5 = IRL;
const NO_ONLINE_SUPPORT_6 = FRA;

const NOT_SUPPORTED_1 = GBR;
const NOT_SUPPORTED_2 = ERI;
const NOT_SUPPORTED_3 = IOT;
const NOT_SUPPORTED_4 = NCL;

/**
 * COUNTRY_QUOTE_SUPPORT
 * Different types of country support for a quote.
 */
export const COUNTRY_QUOTE_SUPPORT = {
  ONLINE_SUPPORT_1,
  NO_ONLINE_SUPPORT_1,
  NOT_SUPPORTED_1,
};

/**
 * COUNTRY_APPLICATION_SUPPORT
 * Different types of country support for an application
 */
export const COUNTRY_APPLICATION_SUPPORT = {
  ONLINE_SUPPORT_1,
  NO_ONLINE_SUPPORT_1,
  NO_ONLINE_SUPPORT_2,
  NO_ONLINE_SUPPORT_3,
  NO_ONLINE_SUPPORT_4,
  NO_ONLINE_SUPPORT_5,
  NO_ONLINE_SUPPORT_6,
  NOT_SUPPORTED_1,
  NOT_SUPPORTED_2,
  NOT_SUPPORTED_3,
  NOT_SUPPORTED_4,
};

export default mockCountries;
