const ROOT = '/your-business';
const COMPANY_DETAILS_ROOT = `${ROOT}/company-details`;
const NATURE_OF_BUSINESS_ROOT = `${ROOT}/nature-of-business`;
const TURNOVER_ROOT = `${ROOT}/turnover`;

export const EXPORTER_BUSINESS = {
  ROOT,
  COMPANY_DETAILS_ROOT,
  COMPANY_DETAILS: COMPANY_DETAILS_ROOT,
  COMPANY_DETAILS_SAVE_AND_BACK: `${COMPANY_DETAILS_ROOT}/save-and-back`,
  COMPANY_HOUSE_SEARCH: `${COMPANY_DETAILS_ROOT}/companies-house-search`,
  NO_COMPANIES_HOUSE_NUMBER: `${COMPANY_DETAILS_ROOT}/no-companies-house-number`,
  NATURE_OF_BUSINESS_ROOT,
  TURNOVER_ROOT,
};
