import isValidWebsiteAddress from '.';

describe('helpers/is-valid-website-address', () => {
  it('should return false when website is not complete "http://www"', () => {
    const website = 'http://www';

    const result = isValidWebsiteAddress(website);

    expect(result).toEqual(false);
  });

  it('should return false when website is not complete "http://google."', () => {
    const website = 'http://google.';

    const result = isValidWebsiteAddress(website);

    expect(result).toEqual(false);
  });

  it('should return false when website is empty', () => {
    const website = '';

    const result = isValidWebsiteAddress(website);

    expect(result).toEqual(false);
  });

  it('should return false when website is above 191 characters', () => {
    const website = `www.google${'e'.repeat(178)}.com`;

    const result = isValidWebsiteAddress(website);

    expect(result).toEqual(false);
  });

  it('should return true when website is in the correct format', () => {
    const website = 'http://www.google.com';

    const result = isValidWebsiteAddress(website);

    expect(result).toEqual(true);
  });

  it('should return true when website is in the correct format but does not contain "www."', () => {
    const website = 'http://google.com';

    const result = isValidWebsiteAddress(website);

    expect(result).toEqual(true);
  });

  it('should return true when website is in the correct format and has "/"', () => {
    const website = 'http://google.com/123';

    const result = isValidWebsiteAddress(website);

    expect(result).toEqual(true);
  });
});
