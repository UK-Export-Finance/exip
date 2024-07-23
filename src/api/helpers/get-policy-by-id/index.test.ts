import getPolicyById from '.';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import policy from '../../test-helpers/policies';
import { Context, ApplicationPolicy } from '../../types';

describe('helpers/get-policy-by-id', () => {
  let context: Context;
  let createdPolicy: ApplicationPolicy;

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    createdPolicy = await policy.create({ context }) as ApplicationPolicy;
  });

  it('should return a policy by ID', async () => {
    const result = (await getPolicyById(context, createdPolicy.id));

    expect(result.id).toEqual(createdPolicy.id);
  });

  describe('when a policy is not found', () => {
    it('should throw an error', async () => {
      const invalidId = 'invalid-id';

      try {
        await getPolicyById(context, invalidId);
      } catch (err) {
        const errorMessage = `Getting policy by ID ${invalidId}`;

        const newError = new Error(errorMessage);

        const expected = new Error(`${errorMessage} ${newError}`);
        expect(err).toEqual(expected);
      }
    });
  });
});
