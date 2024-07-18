import getPolicyContactById from '.';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import policyContact from '../../test-helpers/policy-contact';
import { Context, ApplicationPolicyContact } from '../../types';

describe('helpers/get-policy-contact-by-id', () => {
  let context: Context;
  let createdPolicyContact: ApplicationPolicyContact;

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    createdPolicyContact = await policyContact.create(context) as ApplicationPolicyContact;
  });

  it('should return a total contract value by ID', async () => {
    const result = (await getPolicyContactById(context, createdPolicyContact.id));

    expect(result.id).toEqual(createdPolicyContact.id);
  });

  describe('when a policy contact is not found', () => {
    it('should throw an error', async () => {
      const invalidId = 'invalid-id';

      try {
        await getPolicyContactById(context, invalidId);
      } catch (err) {
        const errorMessage = `Getting policyContact by ID ${invalidId}`;

        const newError = new Error(errorMessage);

        const expected = new Error(`${errorMessage} ${newError}`);
        expect(err).toEqual(expected);
      }
    });
  });
});
