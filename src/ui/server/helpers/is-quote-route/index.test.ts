import isQuoteRoute from '.';

describe('helpers/is-quote-route', () => {
  it('should return true if contains quote', () => {
    const url = 'url/quote';

    const response = isQuoteRoute(url);

    expect(response).toEqual(true);
  });

  it('should return false if does not contain insurance', () => {
    const url = 'url/test';

    const response = isQuoteRoute(url);

    expect(response).toEqual(false);
  });

  it('should return false if url does not have any "/" in it', () => {
    const url = 'url';

    const response = isQuoteRoute(url);

    expect(response).toEqual(false);
  });
});
