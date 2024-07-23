import getEligibilityById from '.';
import { mockInvalidId } from '../../test-mocks';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import eligibility from '../../test-helpers/eligibility';
import { ApplicationEligibility, Context } from '../../types';

describe('helpers/get-eligibility-by-id', () => {
  let context: Context;
  let createdEligibility: ApplicationEligibility;

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    createdEligibility = (await eligibility.create(context)) as ApplicationEligibility;
  });

  it('should return an eligibility by ID', async () => {
    const result = await getEligibilityById(context, createdEligibility.id);

    expect(result.id).toEqual(createdEligibility.id);
  });

  describe('when an eligibility is not found', () => {
    it('should throw an error', async () => {
      try {
        await getEligibilityById(context, mockInvalidId);
      } catch (err) {
        const errorMessage = `Getting eligibility by ID ${mockInvalidId}`;

        const newError = new Error(errorMessage);

        const expected = new Error(`${errorMessage} ${newError}`);
        expect(err).toEqual(expected);
      }
    });
  });
});
