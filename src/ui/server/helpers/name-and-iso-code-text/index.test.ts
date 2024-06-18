import nameAndIsoCodeText from '.';

describe('server/helpers/name-and-iso-code-text', () => {
  it('should return a formatted string', () => {
    const mockName = 'Mock';
    const mockIsoCode = 'ISO-CODE';

    const result = nameAndIsoCodeText(mockName, mockIsoCode);

    const expected = `${mockName} (${mockIsoCode})`;

    expect(result).toEqual(expected);
  });
});
