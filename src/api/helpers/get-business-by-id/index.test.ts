import getBusinessById from '.';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import business from '../../test-helpers/business';
import { Context, ApplicationBusiness } from '../../types';

describe('helpers/get-business-by-id', () => {
  let context: Context;
  let createdBusiness: ApplicationBusiness;

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    createdBusiness = await business.create(context) as ApplicationBusiness;
  });

  it('should return a business by ID', async () => {
    const result = (await getBusinessById(context, createdBusiness.id));

    expect(result.id).toEqual(createdBusiness.id);
  });

  describe('when a business is not found', () => {
    it('should throw an error', async () => {
      const invalidId = 'invalid-id';

      try {
        await getBusinessById(context, invalidId);
      } catch (err) {
        const errorMessage = `Getting business by ID ${invalidId}`;

        const newError = new Error(errorMessage);

        const expected = new Error(`${errorMessage} ${newError}`);
        expect(err).toEqual(expected);
      }
    });
  });
});