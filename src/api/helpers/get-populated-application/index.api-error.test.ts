import { Application as KeystoneApplication } from '.keystone/types'; // eslint-disable-line
import getPopulatedApplication, { generateErrorMessage } from '.';
import { createFullApplication, getKeystoneContext } from '../../test-helpers';
import { Application, Context } from '../../types';

describe('api/helpers/get-populated-application - error handling', () => {
  let context: Context;
  let applicationIds: KeystoneApplication;
  let application: Application;

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    application = await createFullApplication(context);

    applicationIds = {
      companyId: application.company.id,
      businessId: application.business.id,
      brokerId: application.broker.id,
      buyerId: application.buyer.id,
      declarationId: application.declaration.id,
      eligibilityId: application.eligibility.id,
      exportContractId: application.exportContract.id,
      id: application.id,
      ownerId: application.owner.id,
      policyId: application.policy.id,
      policyContactId: application.policyContact.id,
      nominatedLossPayeeId: application.nominatedLossPayee.id,
      sectionReviewId: application.sectionReview.id,
    };
  });

  it('should throw an error when eligibility does not exist', async () => {
    const invalidId = applicationIds.policyId;

    try {
      await getPopulatedApplication(context, { ...applicationIds, eligibilityId: invalidId });
    } catch (err) {
      const expected = new Error(generateErrorMessage('eligibility', applicationIds.id));
      expect(err).toEqual(expected);
    }
  });

  it('should throw an error when exporter does not exist', async () => {
    const invalidId = applicationIds.policyId;

    try {
      await getPopulatedApplication(context, { ...applicationIds, accountId: invalidId });
    } catch (err) {
      const expected = new Error(generateErrorMessage('exporter', applicationIds.id));
      expect(err).toEqual(expected);
    }
  });

  it('should throw an error when buyerCountry does not exist', async () => {
    const invalidId = applicationIds.policyId;

    try {
      await getPopulatedApplication(context, { ...applicationIds, buyerCountryId: invalidId });
    } catch (err) {
      const expected = new Error(generateErrorMessage('buyerCountry', applicationIds.id));
      expect(err).toEqual(expected);
    }
  });

  it('should throw an error when nominatedLossPayee does not exist', async () => {
    const invalidId = applicationIds.nominatedLossPayeeId;

    try {
      await getPopulatedApplication(context, { ...applicationIds, nominatedLossPayeeId: invalidId });
    } catch (err) {
      const expected = new Error(generateErrorMessage('nominatedLossPayee', applicationIds.id));
      expect(err).toEqual(expected);
    }
  });

  it('should throw an error when policy does not exist', async () => {
    const invalidId = applicationIds.id;

    const expected = new Error(generateErrorMessage('policy', applicationIds.id));

    await expect(getPopulatedApplication(context, { ...applicationIds, policyId: invalidId })).rejects.toThrow(expected);
  });

  it('should throw an error when policyContact does not exist', async () => {
    const invalidId = applicationIds.id;

    const expected = new Error(generateErrorMessage('policyContact', applicationIds.id));

    await expect(getPopulatedApplication(context, { ...applicationIds, policyContactId: invalidId })).rejects.toThrow(expected);
  });

  it('should throw an error when companyAddress does not exist', async () => {
    const invalidId = applicationIds.id;

    try {
      await getPopulatedApplication(context, { ...applicationIds, companyAddressId: invalidId });
    } catch (err) {
      const expected = new Error(generateErrorMessage('companyAddress', applicationIds.id));
      expect(err).toEqual(expected);
    }
  });

  it('should throw an error when differentTradingAddress does not exist', async () => {
    const invalidId = applicationIds.id;

    try {
      await getPopulatedApplication(context, {
        ...applicationIds,
        company: {
          ...applicationIds.company,
          differentTradingAddressId: invalidId,
        },
      });
    } catch (err) {
      const expected = new Error(generateErrorMessage('differentTradingAddress', applicationIds.id));
      expect(err).toEqual(expected);
    }
  });

  it('should throw an error when company does not exist', async () => {
    const invalidId = applicationIds.id;

    const expected = new Error(generateErrorMessage('company', applicationIds.id));

    await expect(getPopulatedApplication(context, { ...applicationIds, companyId: invalidId })).rejects.toThrow(expected);
  });

  it('should throw an error when companySicCode does not exist', async () => {
    try {
      await getPopulatedApplication(context, { ...applicationIds, companyId: application.company.id });
    } catch (err) {
      const expected = new Error(generateErrorMessage('companySicCode', applicationIds.id));
      expect(err).toEqual(expected);
    }
  });

  it('should throw an error when business does not exist', async () => {
    const invalidId = applicationIds.id;

    const expected = new Error(generateErrorMessage('business', applicationIds.id));

    await expect(getPopulatedApplication(context, { ...applicationIds, businessId: invalidId })).rejects.toThrow(expected);
  });

  it('should throw an error when broker does not exist', async () => {
    const invalidId = applicationIds.id;

    const expected = new Error(generateErrorMessage('broker', applicationIds.id));

    await expect(getPopulatedApplication(context, { ...applicationIds, brokerId: invalidId })).rejects.toThrow(expected);
  });

  it('should throw an error when buyer does not exist', async () => {
    const invalidId = applicationIds.id;

    try {
      await getPopulatedApplication(context, { ...applicationIds, buyerId: invalidId });
    } catch (err) {
      const expected = new Error(generateErrorMessage('buyer', applicationIds.id));
      expect(err).toEqual(expected);
    }
  });

  it('should throw an error when buyerRelationship does not exist', async () => {
    const invalidId = applicationIds.id;

    try {
      await getPopulatedApplication(context, { ...applicationIds, buyerRelationship: invalidId });
    } catch (err) {
      const expected = new Error(generateErrorMessage('buyerRelationship', applicationIds.id));
      expect(err).toEqual(expected);
    }
  });

  it('should throw an error when buyerTradingHistory does not exist', async () => {
    const invalidId = applicationIds.id;

    try {
      await getPopulatedApplication(context, { ...applicationIds, buyerTradingHistory: invalidId });
    } catch (err) {
      const expected = new Error(generateErrorMessage('buyerTradingHistory', applicationIds.id));
      expect(err).toEqual(expected);
    }
  });

  it('should throw an error when buyer country does not exist', async () => {
    const invalidId = applicationIds.id;

    try {
      await getPopulatedApplication(context, { ...applicationIds, buyer: { countryId: invalidId } });
    } catch (err) {
      const expected = new Error(generateErrorMessage('buyer', applicationIds.id));
      expect(err).toEqual(expected);
    }
  });

  it('should throw an error when declaration does not exist', async () => {
    const invalidId = applicationIds.id;

    const expected = new Error(generateErrorMessage('declaration', applicationIds.id));

    await expect(getPopulatedApplication(context, { ...applicationIds, declarationId: invalidId })).rejects.toThrow(expected);
  });

  it('should throw an error when sectionReview does not exist', async () => {
    const invalidId = applicationIds.id;

    await expect(getPopulatedApplication(context, { ...applicationIds, sectionReviewId: invalidId })).rejects.toThrow(
      new Error(generateErrorMessage('sectionReview', applicationIds.id)),
    );
  });
});
