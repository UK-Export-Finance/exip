import getCountryById from '.';
import { mockInvalidId } from '../../test-mocks';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import country from '../../test-helpers/country';
import { Context, Country } from '../../types';

describe('helpers/get-country-by-id', () => {
  let context: Context;
  let createdCountry: Country;

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    createdCountry = (await country.create(context)) as Country;
  });

  it('should return a country by ID', async () => {
    const result = await getCountryById(context, createdCountry.id);

    expect(result.id).toEqual(createdCountry.id);
  });

  describe('when a country is not found', () => {
    it('should throw an error', async () => {
      try {
        await getCountryById(context, mockInvalidId);
      } catch (err) {
        const errorMessage = `Getting country by ID ${mockInvalidId}`;

        const newError = new Error(errorMessage);

        const expected = new Error(`${errorMessage} ${newError}`);
        expect(err).toEqual(expected);
      }
    });
  });
});
