import createABroker from '.';
import { Application, Context } from '../../types';
import { mockInvalidId } from '../../test-mocks';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import applications from '../../test-helpers/applications';

describe('helpers/create-a-broker', () => {
  let context: Context;
  let application: Application;

  beforeAll(async () => {
    context = getKeystoneContext();

    application = (await applications.create({ context })) as Application;
  });

  it('should return a broker', async () => {
    const result = await createABroker(context, application.id);

    expect(result.id).toBeDefined();
    expect(typeof result.id).toEqual('string');

    expect(result.applicationId).toEqual(application.id);
    expect(result.isUsingBroker).toBeNull();
    expect(result.name).toEqual('');
    expect(result.addressLine1).toEqual('');
    expect(result.addressLine2).toEqual('');
    expect(result.town).toEqual('');
    expect(result.county).toEqual('');
    expect(result.postcode).toEqual('');
    expect(result.fullAddress).toEqual('');
    expect(result.email).toEqual('');
  });

  describe('when an invalid application ID is passed', () => {
    it('should throw an error', async () => {
      await expect(createABroker(context, mockInvalidId)).rejects.toThrow('Creating a broker');
    });
  });

  describe('when creation is not successful', () => {
    it('should throw an error', async () => {
      await expect(createABroker({}, application.id)).rejects.toThrow('Creating a broker');
    });
  });
});
