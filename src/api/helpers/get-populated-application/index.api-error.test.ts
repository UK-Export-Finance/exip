import { Application as KeystoneApplication } from '.keystone/types'; // eslint-disable-line
import getPopulatedApplication from '.';
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
    const invalidId = application.id;

    const mockApplication = { ...application, buyerId: invalidId };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (err) {
      expect(String(err).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when buyerRelationship does not exist', async () => {
    const invalidId = application.id;

    const mockApplication = { ...application, buyerRelationship: invalidId };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (err) {
      expect(String(err).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when buyerTradingHistory does not exist', async () => {
    const invalidId = application.id;

    const mockApplication = { ...application, buyerTradingHistory: invalidId };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (err) {
      expect(String(err).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when buyerCountry does not exist', async () => {
    const invalidId = application.id;

    const mockApplication = {
      ...application,
      buyer: { countryId: invalidId },
    };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (err) {
      expect(String(err).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when eligibility does not exist', async () => {
    const invalidId = application.policyId;

    try {
      const mockApplication = { ...application, eligibilityId: invalidId };

      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (err) {
      expect(String(err).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when coverPeriod does not exist', async () => {
    const invalidId = application.policyId;

    try {
      const mockApplication = { ...application, coverPeriodId: invalidId };

      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (err) {
      expect(String(err).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when totalContractValue does not exist', async () => {
    const invalidId = application.policyId;

    try {
      const mockApplication = { ...application, totalContractValueId: invalidId };

      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (err) {
      expect(String(err).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when account does not exist', async () => {
    const invalidId = application.policyId;

    try {
      const mockApplication = { ...application, accountId: invalidId };

      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (err) {
      expect(String(err).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when policy does not exist', async () => {
    const invalidId = application.id;

    const mockApplication = { ...application, policyId: invalidId };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (err) {
      expect(String(err).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when policyContact does not exist', async () => {
    const invalidId = application.id;

    const mockApplication = { ...application, policyContactId: invalidId };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (err) {
      expect(String(err).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when nominatedLossPayee does not exist', async () => {
    const invalidId = application.id;

    const mockApplication = { ...application, nominatedLossPayeeId: invalidId };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (err) {
      expect(String(err).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when exportContract does not exist', async () => {
    const invalidId = application.id;

    const mockApplication = { ...application, exportContractId: invalidId };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (err) {
      expect(String(err).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when exportContractAgent does not exist', async () => {
    const invalidId = application.id;

    const mockApplication = { ...application, exportContractAgentId: invalidId };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (err) {
      expect(String(err).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when exportContractAgentService does not exist', async () => {
    const invalidId = application.id;

    const mockApplication = { ...application, exportContractAgentServiceId: invalidId };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (err) {
      expect(String(err).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when exportContractAgentServiceCharge does not exist', async () => {
    const invalidId = application.id;

    const mockApplication = { ...application, exportContractAgentServiceChargeId: invalidId };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (err) {
      expect(String(err).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when exportContract.privateMarketId does not exist', async () => {
    const invalidId = application.id;

    const mockApplication = {
      ...application,
      exportContract: {
        ...application.exportContract,
        privateMarketId: invalidId,
      },
    };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (err) {
      expect(String(err).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when exportContract.finalDestinationCountryCode does not exist', async () => {
    const invalidId = application.id;

    const mockApplication = {
      ...application,
      exportContract: {
        ...application.exportContract,
        finalDestinationCountryCode: invalidId,
      },
    };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (err) {
      expect(String(err).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when companyAddress does not exist', async () => {
    const invalidId = application.id;

    const mockApplication = { ...application, companyAddressId: invalidId };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (err) {
      expect(String(err).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when company does not exist', async () => {
    const invalidId = application.id;

    const mockApplication = { ...application, companyId: invalidId };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (err) {
      expect(String(err).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when differentTradingAddress does not exist', async () => {
    const invalidId = application.id;

    const mockApplication = {
      ...application,
      company: {
        ...application.company,
        differentTradingAddressId: invalidId,
      },
    };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (err) {
      expect(String(err).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when companySicCode does not exist', async () => {
    const mockApplication = { ...application, companyId: application.companyId };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (err) {
      expect(String(err).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when business does not exist', async () => {
    const invalidId = application.id;

    const mockApplication = { ...application, businessId: invalidId };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (err) {
      expect(String(err).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when broker does not exist', async () => {
    const invalidId = application.id;

    const mockApplication = { ...application, brokerId: invalidId };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (err) {
      expect(String(err).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when declaration does not exist', async () => {
    const invalidId = application.id;

    const mockApplication = { ...application, declarationId: invalidId };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (err) {
      expect(String(err).includes(expectedErrorMessage)).toEqual(true);
    }
  });

  it('should throw an error when sectionReview does not exist', async () => {
    const invalidId = application.id;

    const mockApplication = { ...application, sectionReviewId: invalidId };

    try {
      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (err) {
      expect(String(err).includes(expectedErrorMessage)).toEqual(true);
    }
  });
});
