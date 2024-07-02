import SECTION_NAMES from '.';

describe('api/constants/XLSX-CONFIG/SECTION_NAMES', () => {
  it('should return an object section/worksheet names', () => {
    const expected = {
      APPLICATION_INFORMATION: 'Application information',
      ELIGIBILITY: 'Eligibility',
      EXPORTER_BUSINESS: 'Exporter business',
      POLICY: 'Policy',
      BUYER: 'Buyer',
      EXPORT_CONTRACT: 'Export contract',
      DECLARATIONS: 'Declarations',
    };

    expect(SECTION_NAMES).toEqual(expected);
  });
});
