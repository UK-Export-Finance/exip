import mapExporterAddress from '.';
import FIELD_IDS from '../../../../constants/field-ids/insurance/business';
import NEW_LINE from '../../helpers/xlsx-new-line';
import { mockCompany } from '../../../../test-mocks/mock-application';

const {
  COMPANIES_HOUSE: {
    COMPANY_ADDRESS,
    REGISTED_OFFICE_ADDRESS: { ADDRESS_LINE_1, ADDRESS_LINE_2, LOCALITY, REGION, POSTAL_CODE },
  },
} = FIELD_IDS;

describe('api/generate-xlsx/map-application-to-xlsx/map-exporter/map-address', () => {
  it('should return a string from address fields', () => {
    const address = mockCompany[COMPANY_ADDRESS];

    const result = mapExporterAddress(address);

    const line1 = `${address[ADDRESS_LINE_1]}${NEW_LINE}`;
    const line2 = `${address[ADDRESS_LINE_2]}${NEW_LINE}`;
    const locality = `${address[LOCALITY]}${NEW_LINE}`;
    const region = `${address[REGION]}${NEW_LINE}`;
    const postalCode = `${address[POSTAL_CODE]}${NEW_LINE}`;

    const expected = `${line1}${line2}${locality}${region}${postalCode}`;
    expect(result).toEqual(expected);
  });
});
