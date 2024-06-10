import { Application as KeystoneApplication } from '.keystone/types'; // eslint-disable-line
import mapPolicy from '.';
import { createFullApplication, getKeystoneContext } from '../../../test-helpers';
import policies from '../../../test-helpers/policies';
import { Application, ApplicationPolicy, Context } from '../../../types';

describe('api/helpers/get-populated-application', () => {
  let context: Context;
  let application: Application;
  let policy: ApplicationPolicy;

  beforeAll(async () => {
    context = getKeystoneContext();

    application = await createFullApplication(context);
  });

  describe('when the policy has date fields', () => {
    const mockDate = new Date();

    beforeEach(async () => {
      policy = await policies.update({
        context,
        policyId: application.policy.id,
        data: {
          requestedStartDate: mockDate,
          contractCompletionDate: mockDate,
        },
      });
    });

    it('should return a mapped policy', async () => {
      const result = await mapPolicy(policy);

      const expected = {
        ...policy,
        requestedStartDate: new Date(mockDate),
        contractCompletionDate: new Date(mockDate),
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when the policy does NOT have date fields', () => {
    beforeEach(async () => {
      policy = await policies.update({
        context,
        policyId: application.policy.id,
        data: {
          requestedStartDate: null,
          contractCompletionDate: null,
        },
      });
    });

    it('should return a policy with date fields as empty strings', async () => {
      const result = await mapPolicy(policy);

      const expected = {
        ...policy,
        requestedStartDate: null,
        contractCompletionDate: null,
      };

      expect(result).toEqual(expected);
    });
  });
});
