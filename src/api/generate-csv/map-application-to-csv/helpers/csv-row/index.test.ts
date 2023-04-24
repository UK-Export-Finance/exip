import csvRow from '.';

describe('api/generate-csv/map-application-to-csv/helpers/csv-row', () => {
  const mockFieldName = 'Field A';
  const mockFieldAnswer = 'Mock answer';

  it('should return an object with field and answer properties', () => {
    const result = csvRow(mockFieldName, mockFieldAnswer);

    const expected = {
      Field: mockFieldName,
      Answer: mockFieldAnswer,
    };

    expect(result).toEqual(expected);
  });

  describe('when answer is 0', () => {
    it('should return the answer as a string', () => {
      const result = csvRow(mockFieldName, 0);

      const expected = {
        Field: mockFieldName,
        Answer: '0',
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when answer is undefind', () => {
    it('should return an empty string', () => {
      const result = csvRow(mockFieldName);

      const expected = {
        Field: mockFieldName,
        Answer: '',
      };

      expect(result).toEqual(expected);
    });
  });
});
