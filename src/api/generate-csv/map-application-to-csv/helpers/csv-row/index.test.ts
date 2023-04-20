import csvRow from '.';

describe('api/generate-csv/map-application-to-csv/helpers/csv-row', () => {
  it('should return an object with field and answer properties', () => {
    const mockFieldName = 'Field A';
    const mockFieldAnswer = 'Mock answer';

    const result = csvRow(mockFieldName, mockFieldAnswer);

    const expected = {
      Field: mockFieldName,
      Answer: mockFieldAnswer,
    };

    expect(result).toEqual(expected);
  });
});
