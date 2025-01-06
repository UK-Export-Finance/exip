import APPLICATION_INFORMATION_INDEXES from '.';

describe('api/constants/XLSX-CONFIG/INDEXES/APPLICATION_INFORMATION', () => {
  it('should return an object with indexes', () => {
    const expected = {
      EXPORTER_CONTACT_DETAILS: 8,
      KEY_INFORMATION: 13,
    };

    expect(APPLICATION_INFORMATION_INDEXES).toEqual(expected);
  });
});
