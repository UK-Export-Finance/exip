import { Application as KeystoneApplication } from '.keystone/types'; // eslint-disable-line
import getPopulatedApplication from '.';
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

    expect(result.business.id).toEqual(application.business.id);
    expect(result.broker.id).toEqual(application.broker.id);
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

  it('should return an application with populated buyer', async () => {
    const result = await getPopulatedApplication(context, applicationIds);

    const [expectedCountry] = mockCountries;

    expect(result.buyer.id).toEqual(application.buyer.id);
    expect(result.buyer.country?.name).toEqual(expectedCountry.name);
    expect(result.buyer.country?.isoCode).toEqual(expectedCountry.isoCode);

    expect(result.buyer.relationship.exporterIsConnectedWithBuyer).toBeNull();
    expect(result.buyer.relationship.connectionWithBuyerDescription).toEqual('');
    expect(result.buyer.relationship.exporterHasPreviousCreditInsuranceWithBuyer).toBeNull();
    expect(result.buyer.relationship.exporterHasBuyerFinancialAccounts).toBeNull();
    expect(result.buyer.relationship.previousCreditInsuranceWithBuyerDescription).toEqual('');
  });

  it('should return an application with populated company', async () => {
    const result = await getPopulatedApplication(context, applicationIds);

    expect(result.company.id).toEqual(application.company.id);
    expect(result.companySicCodes[0].companyId).toEqual(application.company.id);

    expect(result.company.id).toEqual(application.company.id);
    expect(result.company.registeredOfficeAddress).toEqual(application.company.registeredOfficeAddress);

    expect(result.company.differentTradingAddress.id).toEqual(application.company.differentTradingAddress.id);
    expect(result.company.differentTradingAddress.fullAddress).toEqual('');
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
});
