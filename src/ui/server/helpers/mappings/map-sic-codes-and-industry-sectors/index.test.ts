import mapSicCodesAndIndustrySectors from '.';
import mapSicCodes from '../map-sic-codes';
import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';
import { mockApplication } from '../../../test-mocks';

const {
  COMPANIES_HOUSE: { COMPANY_SIC, INDUSTRY_SECTOR_NAMES, SIC_CODE, INDUSTRY_SECTOR_NAME },
} = INSURANCE_FIELD_IDS;

describe('server/helpers/mappings/map-sic-codes-and-industry-sectors', () => {
  it('should return a company with mapped SIC codes and industry sectors', () => {
    const company = {
      ...mockApplication.company,
    };

    const response = mapSicCodesAndIndustrySectors(company);

    const expected = {
      ...company,
      [COMPANY_SIC]: mapSicCodes(company[COMPANY_SIC], SIC_CODE),
      [INDUSTRY_SECTOR_NAMES]: mapSicCodes(company[COMPANY_SIC], INDUSTRY_SECTOR_NAME),
    };

    expect(response).toEqual(expected);
  });
});
