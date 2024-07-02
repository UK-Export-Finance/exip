import SECTION_NAMES from '.';

describe('api/constants/XLSX-CONFIG/SECTION_NAMES', () => {
  it('should return an object section/worksheet names', () => {
    const expected = {
      APPLICATION_INFORMATION: 'Application information',
      ELIGIBILITY: 'Eligibility',
      EXPORTER_BUSINESS: 'The Business',
      BUYER: 'The Buyer',
      POLICY: 'Insurance Policy',
      EXPORT_CONTRACT: 'Export Contract',
      DECLARATIONS: 'Declarations',
    };

    expect(SECTION_NAMES).toEqual(expected);
  });
});
