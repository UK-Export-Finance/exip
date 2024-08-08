import { Application as KeystoneApplication } from '.keystone/types'; // eslint-disable-line
import getPopulatedApplication from '.';
import { mockInvalidId } from '../../test-mocks';
import { createFullApplication, getKeystoneContext } from '../../test-helpers';
import { Application, Context } from '../../types';

describe('api/helpers/get-populated-application - error handling', () => {
  let context: Context;
  let application: KeystoneApplication;
  let fullApplication: Application;
  let expectedErrorMessage = '';

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    fullApplication = await createFullApplication(context);

    application = {
      companyId: fullApplication.company.id,
      businessId: fullApplication.business.id,
      brokerId: fullApplication.broker.id,
      buyerId: fullApplication.buyer.id,
      declarationId: fullApplication.declaration.id,
      eligibilityId: fullApplication.eligibility.id,
      exportContractId: fullApplication.exportContract.id,
      id: fullApplication.id,
      ownerId: fullApplication.owner.id,
      policyId: fullApplication.policy.id,
      policyContactId: fullApplication.policyContact.id,
      nominatedLossPayeeId: fullApplication.nominatedLossPayee.id,
      sectionReviewId: fullApplication.sectionReview.id,
    };

    expectedErrorMessage = `Getting populated application (helper) ${application.id}`;
  });

  it('should throw an error when buyer does not exist', async () => {
    const mockApplication = { ...application, buyerId: mockInvalidId };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (error) {
      expect(String(error).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when buyerRelationship does not exist', async () => {
    const mockApplication = { ...application, buyerRelationship: mockInvalidId };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (error) {
      expect(String(error).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when buyerTradingHistory does not exist', async () => {
    const mockApplication = { ...application, buyerTradingHistory: mockInvalidId };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (error) {
      expect(String(error).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when buyerCountry does not exist', async () => {
    const mockApplication = {
      ...application,
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
      const mockApplication = { ...application, eligibilityId: mockInvalidId };

      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (error) {
      expect(String(error).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when coverPeriod does not exist', async () => {
    try {
      const mockApplication = { ...application, coverPeriodId: mockInvalidId };

      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (error) {
      expect(String(error).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when totalContractValue does not exist', async () => {
    try {
      const mockApplication = { ...application, totalContractValueId: mockInvalidId };

      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (error) {
      expect(String(error).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when account does not exist', async () => {
    try {
      const mockApplication = { ...application, accountId: mockInvalidId };

      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (error) {
      expect(String(error).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when policy does not exist', async () => {
    const mockApplication = { ...application, policyId: mockInvalidId };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (error) {
      expect(String(error).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when policyContact does not exist', async () => {
    const mockApplication = { ...application, policyContactId: mockInvalidId };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (error) {
      expect(String(error).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when nominatedLossPayee does not exist', async () => {
    const mockApplication = { ...application, nominatedLossPayeeId: mockInvalidId };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (error) {
      expect(String(error).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when exportContract does not exist', async () => {
    const mockApplication = { ...application, exportContractId: mockInvalidId };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (error) {
      expect(String(error).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when exportContractAgent does not exist', async () => {
    const mockApplication = { ...application, exportContractAgentId: mockInvalidId };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (error) {
      expect(String(error).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when exportContractAgentService does not exist', async () => {
    const mockApplication = { ...application, exportContractAgentServiceId: mockInvalidId };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (error) {
      expect(String(error).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when exportContractAgentServiceCharge does not exist', async () => {
    const mockApplication = { ...application, exportContractAgentServiceChargeId: mockInvalidId };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (error) {
      expect(String(error).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when exportContract.privateMarketId does not exist', async () => {
    const mockApplication = {
      ...application,
      exportContract: {
        ...application.exportContract,
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
      ...application,
      exportContract: {
        ...application.exportContract,
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
    const mockApplication = { ...application, companyAddressId: mockInvalidId };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (error) {
      expect(String(error).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when company does not exist', async () => {
    const mockApplication = { ...application, companyId: mockInvalidId };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (error) {
      expect(String(error).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when differentTradingAddress does not exist', async () => {
    const mockApplication = {
      ...application,
      company: {
        ...application.company,
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
    const mockApplication = { ...application, companyId: application.companyId };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (error) {
      expect(String(error).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when business does not exist', async () => {
    const mockApplication = { ...application, businessId: mockInvalidId };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (error) {
      expect(String(error).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when broker does not exist', async () => {
    const mockApplication = { ...application, brokerId: mockInvalidId };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (error) {
      expect(String(error).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when declaration does not exist', async () => {
    const mockApplication = { ...application, declarationId: mockInvalidId };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (error) {
      expect(String(error).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when sectionReview does not exist', async () => {
    const mockApplication = { ...application, sectionReviewId: mockInvalidId };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (error) {
      expect(String(error).includes(expectedErrorMessage)).toEqual(true);
    }
  });
});
