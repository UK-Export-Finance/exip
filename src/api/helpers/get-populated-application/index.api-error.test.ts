import getPopulatedApplication from '.';
import { mockInvalidId } from '../../test-mocks';
import { createFullApplication, getKeystoneContext } from '../../test-helpers';
import { Application, Context } from '../../types';

describe('api/helpers/get-populated-application - error handling', () => {
  let context: Context;
  let fullApplication: Application;

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    fullApplication = await createFullApplication(context);
  });

  it('should throw an error when populated buyer errors', async () => {
    const mockApplication = { ...fullApplication, buyerId: mockInvalidId };

    const expectedErrorMessage = 'Error getting populated buyer';

    await expect(getPopulatedApplication.get({ context, application: mockApplication })).rejects.toThrow(expectedErrorMessage);
  });

  it('should throw an error when populated eligibility errors', async () => {
    const mockApplication = { ...fullApplication, eligibilityId: mockInvalidId };

    const expectedErrorMessage = 'Error getting populated eligibility';

    await expect(getPopulatedApplication.get({ context, application: mockApplication })).rejects.toThrow(expectedErrorMessage);
  });

  it('should throw an error when owner errors', async () => {
    const mockApplication = { ...fullApplication, ownerId: mockInvalidId };

    const expectedErrorMessage = "Error getting 'owner' relationship";

    await expect(getPopulatedApplication.get({ context, application: mockApplication })).rejects.toThrow(expectedErrorMessage);
  });

  it('should throw an error when policy errors', async () => {
    const mockApplication = { ...fullApplication, policyId: mockInvalidId };

    const expectedErrorMessage = "Error getting 'policy' relationship";

    await expect(getPopulatedApplication.get({ context, application: mockApplication })).rejects.toThrow(expectedErrorMessage);
  });

  it('should throw an error when policyContact errors', async () => {
    const mockApplication = { ...fullApplication, policyContactId: mockInvalidId };

    const expectedErrorMessage = "Error getting 'policyContact' relationship";

    await expect(getPopulatedApplication.get({ context, application: mockApplication })).rejects.toThrow(expectedErrorMessage);
  });

  it('should throw an error when nominatedLossPayee errors', async () => {
    const mockApplication = { ...fullApplication, nominatedLossPayeeId: mockInvalidId };

    const expectedErrorMessage = "Error getting 'nominatedLossPayee' relationship";

    await expect(getPopulatedApplication.get({ context, application: mockApplication })).rejects.toThrow(expectedErrorMessage);
  });

  it('should throw an error when populated exportContract errors', async () => {
    const mockApplication = { ...fullApplication, exportContractId: mockInvalidId };

    const expectedErrorMessage = 'Error getting populated exportContract';

    await expect(getPopulatedApplication.get({ context, application: mockApplication })).rejects.toThrow(expectedErrorMessage);
  });

  it('should throw an error when company errors', async () => {
    const mockApplication = { ...fullApplication, companyId: mockInvalidId };

    const expectedErrorMessage = 'Error getting populated company';

    await expect(getPopulatedApplication.get({ context, application: mockApplication })).rejects.toThrow(expectedErrorMessage);
  });

  it('should throw an error when business errors', async () => {
    const mockApplication = { ...fullApplication, businessId: mockInvalidId };

    const expectedErrorMessage = "Error getting 'business' relationship";

    await expect(getPopulatedApplication.get({ context, application: mockApplication })).rejects.toThrow(expectedErrorMessage);
  });

  it('should throw an error when broker errors', async () => {
    const mockApplication = { ...fullApplication, brokerId: mockInvalidId };

    const expectedErrorMessage = "Error getting 'broker' relationship";

    await expect(getPopulatedApplication.get({ context, application: mockApplication })).rejects.toThrow(expectedErrorMessage);
  });

  it('should throw an error when populated declaration errors', async () => {
    const mockApplication = { ...fullApplication, declarationId: mockInvalidId };

    const expectedErrorMessage = 'Error getting populated declaration';

    await expect(getPopulatedApplication.get({ context, application: mockApplication })).rejects.toThrow(expectedErrorMessage);
  });

  it('should throw an error when sectionReview errors', async () => {
    const mockApplication = { ...fullApplication, sectionReviewId: mockInvalidId };

    const expectedErrorMessage = "Error getting 'sectionReview' relationship";

    await expect(getPopulatedApplication.get({ context, application: mockApplication })).rejects.toThrow(expectedErrorMessage);
  });

  describe('with any error', () => {
    it('should throw an error when with the application ID', async () => {
      const mockApplication = { ...fullApplication, sectionReviewId: mockInvalidId };

      const expectedErrorMessage = `Error getting populated application (helper) ${mockApplication.id}`;

      await expect(getPopulatedApplication.get({ context, application: mockApplication })).rejects.toThrow(expectedErrorMessage);
    });
  });
});
