import getBrokerById from '.';
import { mockInvalidId } from '../../test-mocks';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import broker from '../../test-helpers/broker';
import { Context, ApplicationBroker } from '../../types';

describe('helpers/get-broker-by-id', () => {
  let context: Context;
  let createdBroker: ApplicationBroker;

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    createdBroker = (await broker.create(context)) as ApplicationBroker;
  });

  it('should return a broker by ID', async () => {
    const result = await getBrokerById(context, createdBroker.id);

    expect(result.id).toEqual(createdBroker.id);
  });

  describe('when a broker is not found', () => {
    it('should throw an error', async () => {
      try {
        await getBrokerById(context, mockInvalidId);
      } catch (error) {
        const errorMessage = `Getting broker by ID ${mockInvalidId}`;

        const newError = new Error(errorMessage);

        const expected = new Error(`${errorMessage} ${newError}`);
        expect(error).toEqual(expected);
      }
    });
  });
});
