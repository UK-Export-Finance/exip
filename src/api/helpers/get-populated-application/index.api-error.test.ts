import getPopulatedApplication from '.';
import { mockInvalidId } from '../../test-mocks';
import { createFullApplication, getKeystoneContext } from '../../test-helpers';
import { Application, Context } from '../../types';

describe('api/helpers/get-populated-application - error handling', () => {
  let context: Context;
  let fullApplication: Application;
  let expectedErrorMessage = '';

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    fullApplication = await createFullApplication(context);

    expectedErrorMessage = `Getting populated application (helper) ${fullApplication.id}`;
  });

  it('should throw an error when buyer does not exist', async () => {
    const mockApplication = { ...fullApplication, buyerId: mockInvalidId };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (error) {
      expect(String(error).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when buyerRelationship does not exist', async () => {
    const mockApplication = { ...fullApplication, buyerRelationship: mockInvalidId };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (error) {
      expect(String(error).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when buyerTradingHistory does not exist', async () => {
    const mockApplication = { ...fullApplication, buyerTradingHistory: mockInvalidId };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (error) {
      expect(String(error).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when buyerCountry does not exist', async () => {
    const mockApplication = {
      ...fullApplication,
      buyer: { countryId: mockInvalidId },
    };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (error) {
      expect(String(error).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when eligibility does not exist', async () => {
    try {
      const mockApplication = { ...fullApplication, eligibilityId: mockInvalidId };

      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (error) {
      expect(String(error).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when coverPeriod does not exist', async () => {
    try {
      const mockApplication = { ...fullApplication, coverPeriodId: mockInvalidId };

      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (error) {
      expect(String(error).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when totalContractValue does not exist', async () => {
    try {
      const mockApplication = { ...fullApplication, totalContractValueId: mockInvalidId };

      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (error) {
      expect(String(error).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when account does not exist', async () => {
    try {
      const mockApplication = { ...fullApplication, accountId: mockInvalidId };

      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (error) {
      expect(String(error).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when policy does not exist', async () => {
    const mockApplication = { ...fullApplication, policyId: mockInvalidId };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (error) {
      expect(String(error).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when policyContact does not exist', async () => {
    const mockApplication = { ...fullApplication, policyContactId: mockInvalidId };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (error) {
      expect(String(error).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when nominatedLossPayee does not exist', async () => {
    const mockApplication = { ...fullApplication, nominatedLossPayeeId: mockInvalidId };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (error) {
      expect(String(error).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when exportContract does not exist', async () => {
    const mockApplication = { ...fullApplication, exportContractId: mockInvalidId };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (error) {
      expect(String(error).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when exportContractAgent does not exist', async () => {
    const mockApplication = { ...fullApplication, exportContractAgentId: mockInvalidId };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (error) {
      expect(String(error).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when exportContractAgentService does not exist', async () => {
    const mockApplication = { ...fullApplication, exportContractAgentServiceId: mockInvalidId };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (error) {
      expect(String(error).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when exportContractAgentServiceCharge does not exist', async () => {
    const mockApplication = { ...fullApplication, exportContractAgentServiceChargeId: mockInvalidId };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (error) {
      expect(String(error).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when exportContract.privateMarketId does not exist', async () => {
    const mockApplication = {
      ...fullApplication,
      exportContract: {
        ...fullApplication.exportContract,
        privateMarketId: mockInvalidId,
      },
    };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (error) {
      expect(String(error).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when exportContract.finalDestinationCountryCode does not exist', async () => {
    const mockApplication = {
      ...fullApplication,
      exportContract: {
        ...fullApplication.exportContract,
        finalDestinationCountryCode: mockInvalidId,
      },
    };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (error) {
      expect(String(error).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when companyAddress does not exist', async () => {
    const mockApplication = { ...fullApplication, companyAddressId: mockInvalidId };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (error) {
      expect(String(error).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when company does not exist', async () => {
    const mockApplication = { ...fullApplication, companyId: mockInvalidId };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (error) {
      expect(String(error).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when differentTradingAddress does not exist', async () => {
    const mockApplication = {
      ...fullApplication,
      company: {
        ...fullApplication.company,
        differentTradingAddressId: mockInvalidId,
      },
    };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (error) {
      expect(String(error).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when companySicCode does not exist', async () => {
    const mockApplication = { ...fullApplication, companyId: fullApplication.companyId };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (error) {
      expect(String(error).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when business does not exist', async () => {
    const mockApplication = { ...fullApplication, businessId: mockInvalidId };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (error) {
      expect(String(error).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when broker does not exist', async () => {
    const mockApplication = { ...fullApplication, brokerId: mockInvalidId };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (error) {
      expect(String(error).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when declaration does not exist', async () => {
    const mockApplication = { ...fullApplication, declarationId: mockInvalidId };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (error) {
      expect(String(error).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when declaration modernSlavery does not exist', async () => {
    const mockApplication = {
      ...fullApplication,
      declaration: {
        ...fullApplication.declaration,
        modernSlaveryId: mockInvalidId,
      },
    };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (error) {
      expect(String(error).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when sectionReview does not exist', async () => {
    const mockApplication = { ...fullApplication, sectionReviewId: mockInvalidId };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (error) {
      expect(String(error).includes(expectedErrorMessage)).toEqual(true);
    }
  });
});
