import createALossPayeeFinancialInternational from '.';
import createANominatedLossPayee from '../create-a-nominated-loss-payee';
import { Application, ApplicationNominatedLossPayee, Context } from '../../types';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import applications from '../../test-helpers/applications';

const invalidId = 'invalid-id';

const assertError = (err) => {
  const errorString = String(err);

  expect(errorString.includes('Creating a loss payee financial (international)')).toEqual(true);
};

describe('helpers/create-a-loss-payee-financial-international', () => {
  let context: Context;
  let application: Application;
  let nominatedLossPayee: ApplicationNominatedLossPayee;

  beforeAll(async () => {
    context = getKeystoneContext();

    application = (await applications.create({ context, data: {} })) as Application;
    nominatedLossPayee = await createANominatedLossPayee(context, application.id);
  });

  test('it should return a loss payee financial UK with ID', async () => {
    const lossPayeeFinancialInternational = await createALossPayeeFinancialInternational(context, nominatedLossPayee.id);

    expect(lossPayeeFinancialInternational.id).toBeDefined();
    expect(typeof lossPayeeFinancialInternational.id).toEqual('string');
    expect(lossPayeeFinancialInternational.id.length).toBeGreaterThan(0);
  });

  test('it should return lossPayee ID and empty loss payee financial UK fields', async () => {
    const lossPayeeFinancialInternational = await createALossPayeeFinancialInternational(context, nominatedLossPayee.id);

    expect(lossPayeeFinancialInternational.lossPayeeId).toEqual(nominatedLossPayee.id);
    expect(lossPayeeFinancialInternational.bicSwiftCode).toEqual('');
    expect(lossPayeeFinancialInternational.iban).toEqual('');
    expect(lossPayeeFinancialInternational.bankAddress).toEqual('');
  });

  test('it should create an empty loss payee financial international vector relationship', async () => {
    // create the Loss payee financial international
    const created = await createALossPayeeFinancialInternational(context, nominatedLossPayee.id);

    /**
     * Get the Loss payee financial international,
     * so that we can use vector.id
     */
    const lossPayeeFinancialInternational = await context.query.LossPayeeFinancialInternational.findOne({
      where: {
        id: created.id,
      },
      query: 'vector { id } ',
    });

    // get the vector relationship
    const vectorRelationship = await context.query.LossPayeeFinancialInternationalVector.findOne({
      where: {
        id: lossPayeeFinancialInternational.vector.id,
      },
      query: 'id bicSwiftCodeVector ibanVector',
    });

    expect(vectorRelationship.id).toBeDefined();
    expect(typeof vectorRelationship.id).toEqual('string');
    expect(vectorRelationship.id.length).toBeGreaterThan(0);

    expect(vectorRelationship.bicSwiftCodeVector).toEqual('');
    expect(vectorRelationship.ibanVector).toEqual('');
  });

  describe('when an invalid nominated loss payee ID is passed', () => {
    test('it should throw an error', async () => {
      try {
        await createALossPayeeFinancialInternational(context, invalidId);
      } catch (err) {
        assertError(err);
      }
    });
  });

  describe('when creation is not successful', () => {
    test('it should throw an error', async () => {
      try {
        // pass empty context object to force an error
        await createALossPayeeFinancialInternational({}, application.id);
      } catch (err) {
        assertError(err);
      }
    });
  });
});
