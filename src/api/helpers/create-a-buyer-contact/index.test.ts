import createABuyerContact from '.';
import { Context, Application, ApplicationBuyer } from '../../types';
import { mockInvalidId } from '../../test-mocks';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import applicationHelpers from '../../test-helpers/applications';
import buyerHelpers from '../../test-helpers/buyer';

const assertError = (error) => {
  const errorString = String(error);

  expect(errorString.includes('Creating a buyer contact')).toEqual(true);
};

describe('helpers/create-a-buyer-contact', () => {
  let context: Context;
  let buyer: ApplicationBuyer;
  let applicationId: string;

  beforeAll(async () => {
    context = getKeystoneContext();

    const application = (await applicationHelpers.create({ context, data: {} })) as Application;

    applicationId = application.id;

    buyer = (await buyerHelpers.create(context)) as ApplicationBuyer;
  });

  it('should return a buyer contact with respective IDs', async () => {
    const result = await createABuyerContact(context, buyer.id, applicationId);

    expect(result).toBeDefined();
    expect(typeof result.id).toEqual('string');
    expect(result.id.length).toBeGreaterThan(0);
  });

  it('should return empty buyerContact fields', async () => {
    const result = await createABuyerContact(context, buyer.id, applicationId);

    expect(result.contactFirstName).toEqual('');
    expect(result.contactLastName).toEqual('');
    expect(result.contactPosition).toEqual('');
    expect(result.contactEmail).toEqual('');
    expect(result.canContactBuyer).toBeNull();
  });

  describe('when an invalid buyer ID is passed', () => {
    it('should throw an error', async () => {
      try {
        await createABuyerContact(context, mockInvalidId, applicationId);
      } catch (error) {
        assertError(error);
      }
    });
  });

  describe('when an invalid application ID is passed', () => {
    it('should throw an error', async () => {
      try {
        await createABuyerContact(context, buyer.id, mockInvalidId);
      } catch (error) {
        assertError(error);
      }
    });
  });

  describe('when creation is not successful', () => {
    it('should throw an error', async () => {
      try {
        // pass empty context object to force an error
        await createABuyerContact({}, buyer.id, applicationId);
      } catch (error) {
        assertError(error);
      }
    });
  });
});
