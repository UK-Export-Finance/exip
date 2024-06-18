import { Context } from '.keystone/types'; // eslint-disable-line
import getCountries from '.';
import getKeystoneContext from '../../test-helpers/get-keystone-context';

describe('helpers/get-countries', () => {
  let context: Context;

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  it('should return countries', async () => {
    const result = await getCountries(context);

    const expectedCountries = await context.db.Country.findMany();

    expect(result).toEqual(expectedCountries);
  });

  describe('when there is an error', () => {
    it('should throw an error', async () => {
      try {
        await getCountries({});
      } catch (err) {
        const expected = String(err).includes('Error: Getting countries');

        expect(expected).toEqual(true);
      }
    });
  });
});
