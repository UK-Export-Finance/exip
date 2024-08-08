import createABuyerRelationship from '.';
import { Context, Application, ApplicationBuyer } from '../../types';
import { mockInvalidId } from '../../test-mocks';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import applicationHelpers from '../../test-helpers/applications';
import buyerHelpers from '../../test-helpers/buyer';

const assertError = (error) => {
  const errorString = String(error);

  expect(errorString.includes('Creating a buyer relationship')).toEqual(true);
};

describe('helpers/create-a-buyer-relationship', () => {
  let context: Context;
  let buyer: ApplicationBuyer;
  let applicationId: string;

  beforeAll(async () => {
    context = getKeystoneContext();

    const application = (await applicationHelpers.create({ context, data: {} })) as Application;

    applicationId = application.id;

    buyer = (await buyerHelpers.create(context)) as ApplicationBuyer;
  });

  test('it should return a buyer relationship with respective IDs', async () => {
    const result = await createABuyerRelationship(context, buyer.id, applicationId);

    expect(result).toBeDefined();
    expect(typeof result.id).toEqual('string');
    expect(result.id.length).toBeGreaterThan(0);
  });

  test('it should return empty buyerRelationship fields', async () => {
    const result = await createABuyerRelationship(context, buyer.id, applicationId);

    expect(result.exporterIsConnectedWithBuyer).toBeNull();
    expect(result.connectionWithBuyerDescription).toEqual('');
    expect(result.exporterHasPreviousCreditInsuranceWithBuyer).toBeNull();
    expect(result.exporterHasBuyerFinancialAccounts).toBeNull();
    expect(result.previousCreditInsuranceWithBuyerDescription).toEqual('');
  });

  describe('when an invalid buyer ID is passed', () => {
    test('it should throw an error', async () => {
      try {
        await createABuyerRelationship(context, mockInvalidId, applicationId);
      } catch (error) {
        assertError(error);
      }
    });
  });

  describe('when an invalid application ID is passed', () => {
    test('it should throw an error', async () => {
      try {
        await createABuyerRelationship(context, buyer.id, mockInvalidId);
      } catch (error) {
        assertError(error);
      }
    });
  });

  describe('when creation is not successful', () => {
    test('it should throw an error', async () => {
      try {
        // pass empty context object to force an error
        await createABuyerRelationship({}, buyer.id, applicationId);
      } catch (error) {
        assertError(error);
      }
    });
  });
});
