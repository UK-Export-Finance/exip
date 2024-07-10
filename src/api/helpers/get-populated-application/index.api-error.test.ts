import { Application as KeystoneApplication } from '.keystone/types'; // eslint-disable-line
import getPopulatedApplication, { generateErrorMessage } from '.';
import { createFullApplication, getKeystoneContext } from '../../test-helpers';
import { Application, Context } from '../../types';

describe('api/helpers/get-populated-application - error handling', () => {
  let context: Context;
  let application: KeystoneApplication;
  let fullApplication: Application;

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
  });

  it('should throw an error when eligibility does not exist', async () => {
    const invalidId = application.policyId;

    try {
      const mockApplication = { ...application, eligibilityId: invalidId };

      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (err) {
      const expected = new Error(generateErrorMessage('eligibility', application.id));
      expect(err).toEqual(expected);
    }
  });

  it('should throw an error when exporter does not exist', async () => {
    const invalidId = application.policyId;

    try {
      const mockApplication = { ...application, accountId: invalidId };

      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (err) {
      const expected = new Error(generateErrorMessage('exporter', application.id));
      expect(err).toEqual(expected);
    }
  });

  it('should throw an error when buyerCountry does not exist', async () => {
    const invalidId = application.policyId;

    try {
      const mockApplication = { ...application, buyerCountryId: invalidId };

      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (err) {
      const expected = new Error(generateErrorMessage('buyerCountry', application.id));
      expect(err).toEqual(expected);
    }
  });

  it('should throw an error when policy does not exist', async () => {
    const invalidId = application.id;

    const expected = new Error(generateErrorMessage('policy', application.id));

    const mockApplication = { ...application, policyId: invalidId };

    await expect(getPopulatedApplication.get({ context, application: mockApplication })).rejects.toThrow(expected);
  });

  it('should throw an error when policyContact does not exist', async () => {
    const invalidId = application.id;

    const expected = new Error(generateErrorMessage('policyContact', application.id));

    const mockApplication = { ...application, policyContactId: invalidId };

    await expect(getPopulatedApplication.get({ context, application: mockApplication })).rejects.toThrow(expected);
  });

  it('should throw an error when companyAddress does not exist', async () => {
    const invalidId = application.id;

    try {
      const mockApplication = { ...application, companyAddressId: invalidId };

      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (err) {
      const expected = new Error(generateErrorMessage('companyAddress', application.id));
      expect(err).toEqual(expected);
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
      const expected = new Error(generateErrorMessage('differentTradingAddress', application.id));
      expect(err).toEqual(expected);
    }
  });

  it('should throw an error when company does not exist', async () => {
    const invalidId = application.id;

    const mockApplication = { ...application, companyId: invalidId };

    const expected = new Error(generateErrorMessage('company', application.id));

    await expect(getPopulatedApplication.get({ context, application: mockApplication })).rejects.toThrow(expected);
  });

  it('should throw an error when companySicCode does not exist', async () => {
    try {
      const mockApplication = { ...application, companyId: application.companyId };

      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (err) {
      const expected = new Error(generateErrorMessage('companySicCode', application.id));
      expect(err).toEqual(expected);
    }
  });

  it('should throw an error when business does not exist', async () => {
    const invalidId = application.id;

    const mockApplication = { ...application, businessId: invalidId };

    const expected = new Error(generateErrorMessage('business', application.id));

    await expect(getPopulatedApplication.get({ context, application: mockApplication })).rejects.toThrow(expected);
  });

  it('should throw an error when broker does not exist', async () => {
    const invalidId = application.id;

    const mockApplication = { ...application, brokerId: invalidId };

    const expected = new Error(generateErrorMessage('broker', application.id));

    await expect(getPopulatedApplication.get({ context, application: mockApplication })).rejects.toThrow(expected);
  });

  it('should throw an error when buyer does not exist', async () => {
    const invalidId = application.id;

    try {
      const mockApplication = { ...application, buyerId: invalidId };

      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (err) {
      const expected = new Error(generateErrorMessage('buyer', application.id));
      expect(err).toEqual(expected);
    }
  });

  it('should throw an error when buyerRelationship does not exist', async () => {
    const invalidId = application.id;

    try {
      const mockApplication = { ...application, buyerRelationship: invalidId };

      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (err) {
      const expected = new Error(generateErrorMessage('buyerRelationship', application.id));
      expect(err).toEqual(expected);
    }
  });

  it('should throw an error when buyerTradingHistory does not exist', async () => {
    const invalidId = application.id;

    try {
      const mockApplication = { ...application, buyerTradingHistory: invalidId };

      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (err) {
      const expected = new Error(generateErrorMessage('buyerTradingHistory', application.id));
      expect(err).toEqual(expected);
    }
  });

  it('should throw an error when buyer country does not exist', async () => {
    const invalidId = application.id;

    try {
      const mockApplication = {
        ...application,
        buyer: { countryId: invalidId },
      };

      await getPopulatedApplication.get({ context, application: mockApplication });
    } catch (err) {
      const expected = new Error(generateErrorMessage('buyer', application.id));
      expect(err).toEqual(expected);
    }
  });

  it('should throw an error when declaration does not exist', async () => {
    const invalidId = application.id;

    const mockApplication = { ...application, declarationId: invalidId };

    const expected = new Error(generateErrorMessage('declaration', application.id));

    await expect(getPopulatedApplication.get({ context, application: mockApplication })).rejects.toThrow(expected);
  });

  it('should throw an error when sectionReview does not exist', async () => {
    const invalidId = application.id;

    const mockApplication = { ...application, sectionReviewId: invalidId };

    await expect(getPopulatedApplication.get({ context, application: mockApplication })).rejects.toThrow(
      new Error(generateErrorMessage('sectionReview', application.id)),
    );
  });
});
