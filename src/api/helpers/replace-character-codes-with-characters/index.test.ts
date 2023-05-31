import replaceCharacterCodesWithCharacters from '.';

describe('api/helpers/replace-character-codes-with-characters', () => {
  it('should replace ampersand character codes', () => {
    const result = replaceCharacterCodesWithCharacters('&amp;test&amp;');

    const expected = '&test&';

    expect(result).toEqual(expected);
  });

  it('should replace `lower than` character codes', () => {
    const result = replaceCharacterCodesWithCharacters('&lt;test&lt;');

    const expected = '<test<';

    expect(result).toEqual(expected);
  });

  it('should replace `greater than` character codes', () => {
    const result = replaceCharacterCodesWithCharacters('&gt;test&gt;');

    const expected = '>test>';

    expect(result).toEqual(expected);
  });

  it('should replace quote character codes', () => {
    const result = replaceCharacterCodesWithCharacters('&quot;test&quot;');

    const expected = '"test"';

    expect(result).toEqual(expected);
  });

  it('should replace apostrophe character codes', () => {
    const result = replaceCharacterCodesWithCharacters('&#x27;test&#x27;');

    const expected = "'test'";

    expect(result).toEqual(expected);
  });

  it('should replace forward slash character codes', () => {
    const result = replaceCharacterCodesWithCharacters('&#x2F;test&#x2F;');

    const expected = '/test/';

    expect(result).toEqual(expected);
  });

  it('should replace star character codes', () => {
    const result = replaceCharacterCodesWithCharacters('&#42;&#42;');

    const expected = '**';

    expect(result).toEqual(expected);
  });
});
