import { Application as KeystoneApplication } from '.keystone/types'; // eslint-disable-line
import getPopulatedApplication, { generateErrorMessage } from '.';
import { createFullApplication, getKeystoneContext } from '../../test-helpers';
import getCountryByField from '../get-country-by-field';
import mockCountries from '../../test-mocks/mock-countries';
import mockNominatedLossPayee from '../../test-mocks/mock-nominated-loss-payee';
import { Application, Context } from '../../types';
import mockApplication, {
  mockLossPayeeFinancialDetailsUk,
  mockLossPayeeFinancialDetailsUkVector,
  mockLossPayeeFinancialDetailsInternational,
  mockLossPayeeFinancialDetailsInternationalVector,
} from '../../test-mocks/mock-application';

describe('api/helpers/get-populated-application', () => {
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

  it('should return an application with associated data', async () => {
    const result = await getPopulatedApplication(context, applicationIds);

    expect(result.company.id).toEqual(application.company.id);
    expect(result.companySicCodes[0].companyId).toEqual(application.company.id);
    expect(result.business.id).toEqual(application.business.id);
    expect(result.broker.id).toEqual(application.broker.id);
    expect(result.buyer.id).toEqual(application.buyer.id);
    expect(result.declaration.id).toEqual(application.declaration.id);
    expect(result.eligibility.id).toEqual(application.eligibility.id);
    expect(result.eligibility.coverPeriod.id).toEqual(application.eligibility.coverPeriodId);
    expect(result.eligibility.totalContractValue.id).toEqual(application.eligibility.totalContractValueId);
    expect(result.exportContract.id).toEqual(application.exportContract.id);
    expect(result.owner.id).toEqual(application.owner.id);
    expect(result.policy.id).toEqual(application.policy.id);
    expect(result.policyContact.id).toEqual(application.policyContact.id);
    expect(result.nominatedLossPayee.id).toEqual(application.nominatedLossPayee.id);
    expect(result.sectionReview.id).toEqual(application.sectionReview.id);
  });

  it('should return an application with populated buyer country', async () => {
    const result = await getPopulatedApplication(context, applicationIds);

    const [expectedCountry] = mockCountries;

    expect(result.buyer.country?.name).toEqual(expectedCountry.name);
    expect(result.buyer.country?.isoCode).toEqual(expectedCountry.isoCode);
  });

  it('should return an application with populated buyer country', async () => {
    const result = await getPopulatedApplication(context, applicationIds);

    const [expectedCountry] = mockCountries;

    expect(result.buyer.country?.name).toEqual(expectedCountry.name);
    expect(result.buyer.country?.isoCode).toEqual(expectedCountry.isoCode);
  });

  it('should return an application with populated nominatedLossPayee', async () => {
    const result = await getPopulatedApplication(context, applicationIds);

    expect(result.nominatedLossPayee.isAppointed).toEqual(mockNominatedLossPayee.isAppointed);
    expect(result.nominatedLossPayee.isLocatedInUk).toEqual(mockNominatedLossPayee.isLocatedInUk);
    expect(result.nominatedLossPayee.isLocatedInternationally).toEqual(mockNominatedLossPayee.isLocatedInternationally);
    expect(result.nominatedLossPayee.name).toEqual(mockNominatedLossPayee.name);
  });

  it('should return an application with populated financialUk', async () => {
    const result = await getPopulatedApplication(context, applicationIds);

    const { financialUk } = result.nominatedLossPayee;

    const expected = {
      ...mockLossPayeeFinancialDetailsUk,
      id: financialUk.id,
      vector: mockLossPayeeFinancialDetailsUkVector,
    };

    expect(financialUk).toEqual(expected);
  });

  it('should return an application with populated financialInternational', async () => {
    const result = await getPopulatedApplication(context, applicationIds);

    const { financialInternational } = result.nominatedLossPayee;

    const expected = {
      ...mockLossPayeeFinancialDetailsInternational,
      id: financialInternational.id,
      vector: mockLossPayeeFinancialDetailsInternationalVector,
    };

    expect(financialInternational).toEqual(expected);
  });

  it('should return an application with populated answers and finalDestinationCountry object in exportContract', async () => {
    const result = await getPopulatedApplication(context, applicationIds);

    const { exportContract } = mockApplication;

    const countryCode = String(exportContract.finalDestinationCountryCode);

    const expectedCountry = await getCountryByField(context, 'isoCode', countryCode);

    expect(result.exportContract.finalDestinationCountry).toEqual(expectedCountry);
    expect(result.exportContract.finalDestinationCountryCode).toEqual(exportContract.finalDestinationCountryCode);
    expect(result.exportContract.goodsOrServicesDescription).toEqual(exportContract.goodsOrServicesDescription);
  });

  it('should return an application with populated sectionReview', async () => {
    const result = await getPopulatedApplication(context, applicationIds);

    expect(result.sectionReview.id).toEqual(applicationIds.sectionReviewId);
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

    try {
      await getPopulatedApplication(context, { ...applicationIds, policyId: invalidId });
    } catch (err) {
      const expected = new Error(generateErrorMessage('policy', applicationIds.id));
      expect(err).toEqual(expected);
    }
  });

  it('should throw an error when policyContact does not exist', async () => {
    const invalidId = applicationIds.id;

    try {
      await getPopulatedApplication(context, { ...applicationIds, policyContactId: invalidId });
    } catch (err) {
      const expected = new Error(generateErrorMessage('policyContact', applicationIds.id));
      expect(err).toEqual(expected);
    }
  });

  it('should throw an error when company does not exist', async () => {
    const invalidId = applicationIds.id;

    try {
      await getPopulatedApplication(context, { ...applicationIds, companyId: invalidId });
    } catch (err) {
      const expected = new Error(generateErrorMessage('company', applicationIds.id));
      expect(err).toEqual(expected);
    }
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

    try {
      await getPopulatedApplication(context, { ...applicationIds, businessId: invalidId });
    } catch (err) {
      const expected = new Error(generateErrorMessage('business', applicationIds.id));
      expect(err).toEqual(expected);
    }
  });

  it('should throw an error when broker does not exist', async () => {
    const invalidId = applicationIds.id;

    try {
      await getPopulatedApplication(context, { ...applicationIds, brokerId: invalidId });
    } catch (err) {
      const expected = new Error(generateErrorMessage('broker', applicationIds.id));
      expect(err).toEqual(expected);
    }
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

    try {
      await getPopulatedApplication(context, { ...applicationIds, declarationId: invalidId });
    } catch (err) {
      const expected = new Error(generateErrorMessage('declaration', applicationIds.id));
      expect(err).toEqual(expected);
    }
  });

  it('should throw an error when sectionReview does not exist', async () => {
    const invalidId = applicationIds.id;

    await expect(getPopulatedApplication(context, { ...applicationIds, sectionReviewId: invalidId })).rejects.toThrow(
      new Error(generateErrorMessage('sectionReview', applicationIds.id)),
    );
  });
});
