import { Application as KeystoneApplication } from '.keystone/types'; // eslint-disable-line
import getPopulatedApplication, { EXPECTED_RELATIONSHIPS } from '.';
import { createFullApplication, getKeystoneContext } from '../../test-helpers';
import getPopulatedExportContract from '../get-populated-export-contract';
import getPopulatedDeclaration from '../get-populated-declaration';
import mapPolicy from './map-policy';
import getNominatedLossPayee from './nominated-loss-payee';
import mockCountries from '../../test-mocks/mock-countries';
import mapTotalContractValueOverThreshold from '../map-total-contract-value-over-threshold';
import { Context } from '../../types';

describe('api/helpers/get-populated-application', () => {
  let context: Context;
  let application: KeystoneApplication;
  let fullApplication;

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    fullApplication = await createFullApplication(context);

    application = {
      ...fullApplication,
      companyId: fullApplication.companyId,
      businessId: fullApplication.businessId,
      brokerId: fullApplication.brokerId,
      buyerId: fullApplication.buyerId,
      declarationId: fullApplication.declarationId,
      eligibilityId: fullApplication.eligibilityId,
      exportContractId: fullApplication.exportContractId,
      id: fullApplication.id,
      ownerId: fullApplication.ownerId,
      policyId: fullApplication.policyId,
      policyContactId: fullApplication.policyContactId,
      nominatedLossPayeeId: fullApplication.nominatedLossPayeeId,
      sectionReviewId: fullApplication.sectionReviewId,
    };
  });

  describe('EXPECTED_RELATIONSHIPS', () => {
    it('should return an array of expected relationships', () => {
      const result = EXPECTED_RELATIONSHIPS;

      const expected = [
        'eligibility',
        'broker',
        'business',
        'buyer',
        'company',
        'declaration',
        'exportContract',
        'owner',
        'policy',
        'policyContact',
        'nominatedLossPayee',
        'sectionReview',
      ];

      expect(result).toEqual(expected);
    });
  });

  it('should return an application with associated data', async () => {
    const result = await getPopulatedApplication.get({ context, application });

    expect(result.business.id).toEqual(application.businessId);
    expect(result.broker.id).toEqual(application.brokerId);
    expect(result.declaration.id).toEqual(application.declarationId);
    expect(result.eligibility.id).toEqual(application.eligibilityId);
    expect(result.eligibility.coverPeriod.id).toEqual(fullApplication.eligibility.coverPeriodId);
    expect(result.eligibility.totalContractValue.id).toEqual(application.eligibility.totalContractValueId);
    expect(result.exportContract.id).toEqual(application.exportContractId);
    expect(result.owner.id).toEqual(application.ownerId);
    expect(result.policyContact.id).toEqual(application.policyContactId);
    expect(result.nominatedLossPayee.id).toEqual(application.nominatedLossPayeeId);
    expect(result.sectionReview.id).toEqual(application.sectionReviewId);
  });

  it('should return an application with populated buyer', async () => {
    const result = await getPopulatedApplication.get({ context, application });

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
    const result = await getPopulatedApplication.get({ context, application });

    expect(result.company.id).toEqual(application.company.id);
    expect(result.companySicCodes[0].companyId).toEqual(application.company.id);

    expect(result.company.id).toEqual(application.company.id);
    expect(result.company.registeredOfficeAddress).toEqual(fullApplication.company.registeredOfficeAddress);

    expect(result.company.differentTradingAddress.id).toEqual(application.company.differentTradingAddress.id);
    expect(result.company.differentTradingAddress.fullAddress).toEqual('');
  });

  it('should return an application with populated nominatedLossPayee with decrypted data by default', async () => {
    const result = await getPopulatedApplication.get({ context, application });

    const decryptFinancialUk = false;
    const decryptFinancialInternational = false;

    const expected = await getNominatedLossPayee(context, application.nominatedLossPayeeId, decryptFinancialUk, decryptFinancialInternational);

    expect(result.nominatedLossPayee).toEqual(expected);
  });

  it('should return an application with mapped policy data', async () => {
    const result = await getPopulatedApplication.get({ context, application });

    const expected = mapPolicy({
      ...application.policy,
      id: application.policyId,
    });

    expect(result.policy).toEqual(expected);
  });

  it('should return an application with populated exportContract', async () => {
    const result = await getPopulatedApplication.get({ context, application });

    const { exportContract } = result;

    const expected = await getPopulatedExportContract(context, exportContract.id);

    expect(result.exportContract).toEqual(expected);
  });

  it('should return an application with populated declaration', async () => {
    const result = await getPopulatedApplication.get({ context, application });

    const expected = await getPopulatedDeclaration(context, application.declarationId);

    expect(result.declaration).toEqual(expected);
  });

  it('should return an application with populated sectionReview', async () => {
    const result = await getPopulatedApplication.get({ context, application });

    expect(result.sectionReview.id).toEqual(application.sectionReviewId);
  });

  it('should return an application with a totalContractValueOverThreshold flag', async () => {
    const result = await getPopulatedApplication.get({ context, application });

    const expected = mapTotalContractValueOverThreshold(result.eligibility);

    expect(result.totalContractValueOverThreshold).toEqual(expected);
  });
});
