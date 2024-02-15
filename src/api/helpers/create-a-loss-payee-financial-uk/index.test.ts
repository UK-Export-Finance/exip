import createALossPayeeFinancialUk from '.';
import createANominatedLossPayee from '../create-a-nominated-loss-payee';
import { Application, ApplicationNominatedLossPayee, Context } from '../../types';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import applications from '../../test-helpers/applications';

const invalidId = 'invalid-id';

const assertError = (err) => {
  const errorString = String(err);

  expect(errorString.includes('Creating a loss payee financial (UK)')).toEqual(true);
};

describe('helpers/create-a-loss-payee-financial-uk', () => {
  let context: Context;
  let application: Application;
  let nominatedLossPayee: ApplicationNominatedLossPayee;

  beforeAll(async () => {
    context = getKeystoneContext();

    application = (await applications.create({ context, data: {} })) as Application;
    nominatedLossPayee = await createANominatedLossPayee(context, application.id);
  });

  test('it should return a loss payee financial UK with ID', async () => {
    const lossPayeeFinancialUk = await createALossPayeeFinancialUk(context, nominatedLossPayee.id);

    expect(lossPayeeFinancialUk.id).toBeDefined();
    expect(typeof lossPayeeFinancialUk.id).toEqual('string');
    expect(lossPayeeFinancialUk.id.length).toBeGreaterThan(0);
  });

  test('it should return lossPayee ID and empty loss payee financial UK fields', async () => {
    const lossPayeeFinancialUk = await createALossPayeeFinancialUk(context, nominatedLossPayee.id);

    expect(lossPayeeFinancialUk.lossPayeeId).toEqual(nominatedLossPayee.id);
    expect(lossPayeeFinancialUk.sortCodeSalt).toEqual('');
    expect(lossPayeeFinancialUk.sortCodeHash).toEqual('');
    expect(lossPayeeFinancialUk.accountNumberSalt).toEqual('');
    expect(lossPayeeFinancialUk.accountNumberHash).toEqual('');
    expect(lossPayeeFinancialUk.bankAddressSalt).toEqual('');
    expect(lossPayeeFinancialUk.bankAddressHash).toEqual('');
  });

  describe('when an invalid nominated loss payee ID is passed', () => {
    test('it should throw an error', async () => {
      try {
        await createALossPayeeFinancialUk(context, invalidId);
      } catch (err) {
        assertError(err);
      }
    });
  });

  describe('when creation is not successful', () => {
    test('it should throw an error', async () => {
      try {
        // pass empty context object to force an error
        await createALossPayeeFinancialUk({}, application.id);
      } catch (err) {
        assertError(err);
      }
    });
  });
});
