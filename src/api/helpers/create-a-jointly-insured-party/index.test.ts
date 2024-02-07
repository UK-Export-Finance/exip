import createAJointlyInsuredParty from '.';
import createAPolicy from '../create-a-policy';
import { Application, ApplicationPolicy, Context } from '../../types';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import applications from '../../test-helpers/applications';

const invalidId = 'invalid-id';

const assertError = (err) => {
  const errorString = String(err);

  expect(errorString.includes('Creating a jointly insured party')).toEqual(true);
};

describe('helpers/create-a-jointly-insured-party', () => {
  let context: Context;
  let application: Application;
  let applicationPolicy: ApplicationPolicy;

  beforeAll(async () => {
    context = getKeystoneContext();

    application = (await applications.create({ context, data: {} })) as Application;
    const createdPolicy = await createAPolicy(context, application.id);

    const { policy } = createdPolicy;

    applicationPolicy = policy;
  });

  test('it should return a jointlyInsuredParty with ID', async () => {
    const result = await createAJointlyInsuredParty(context, applicationPolicy.id);

    expect(result.id).toBeDefined();
    expect(typeof result.id).toEqual('string');
    expect(result.id.length).toBeGreaterThan(0);
  });

  test('it should return a policy relationship and empty jointlyInsuredParty fields', async () => {
    const result = await createAJointlyInsuredParty(context, applicationPolicy.id);

    expect(result.policyId).toEqual(applicationPolicy.id);
    expect(result.requested).toEqual(null);
    expect(result.companyName).toEqual('');
    expect(result.companyNumber).toEqual('');
    expect(result.country).toBeUndefined();
  });

  describe('when an invalid policy ID is passed', () => {
    test('it should throw an error', async () => {
      try {
        await createAJointlyInsuredParty(context, invalidId);
      } catch (err) {
        assertError(err);
      }
    });
  });

  describe('when creation is not successful', () => {
    test('it should throw an error', async () => {
      try {
        // pass empty context object to force an error
        await createAJointlyInsuredParty({}, applicationPolicy.id);
      } catch (err) {
        assertError(err);
      }
    });
  });
});
