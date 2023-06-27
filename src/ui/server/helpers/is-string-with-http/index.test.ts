import isStringWithHttp from '.';

describe('helpers/isStringWithHttp', () => {
  it('should add "http://" to beginning of string if missing in incoming string', () => {
    const website = 'www.gov.uk';

    const result = isStringWithHttp(website);
    expect(result).toEqual(`http://${website}`);
  });

  it('should not add "http://" to beginning of string incoming string already contains "http://"', () => {
    const website = 'https://www.gov.uk';

    const result = isStringWithHttp(website);
    expect(result).toEqual(website);
  });
});
