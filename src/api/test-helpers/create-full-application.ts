import { Context } from '.keystone/types'; // eslint-disable-line
import accounts from './accounts';
import { FIELD_VALUES, GBP_CURRENCY_CODE } from '../constants';
import createAnApplicationHelper from '../helpers/create-an-application';
import getBrokerById from '../helpers/get-broker-by-id';
import getBuyerById from '../helpers/get-buyer-by-id';
import getBuyerTradingHistoryById from '../helpers/get-buyer-trading-history-by-id';
import getCompanyById from '../helpers/get-company-by-id';
import getCompanyAddressById from '../helpers/get-company-address-by-id';
import getCompanyDifferentTradingAddressById from '../helpers/get-company-different-trading-address-by-id';
import getEligibilityById from '../helpers/get-eligibility-by-id';
import getExportContractById from '../helpers/get-export-contract-by-id';
import { mockExportContract, mockBusiness, mockPolicyContact } from '../test-mocks/mock-application';
import { mockApplicationDeclaration } from '../test-mocks';
import mockCompany from '../test-mocks/mock-company';
import { Application, ApplicationBusiness, ApplicationDeclaration, ApplicationExportContract, ApplicationPolicy, ApplicationPolicyContact } from '../types';

const { POLICY_TYPE } = FIELD_VALUES;

/**
 * createFullApplication
 * Create a full application for unit testing
 * @param {Context} KeystoneJS context API
 * @param {String} Policy type flag - different data is created if multiple is passed. Defaults to single.
 * @returns {Object} Application
 */
export const createFullApplication = async (context: Context, policyType?: string): Promise<Application> => {
  try {
    console.info('Creating a full application (test helpers)');

    const account = await accounts.create({ context });

    const application = await createAnApplicationHelper(
      {
        accountId: account.id,
        eligibilityAnswers: {},
        company: mockCompany,
      },
      context,
    );

    const { eligibilityId, policyId, exportContractId, businessId, brokerId, buyerId, companyId, declarationId, policyContactId } = application;

    const broker = await getBrokerById(context, brokerId);

    const buyer = await getBuyerById(context, buyerId);

    const buyerTradingHistory = await getBuyerTradingHistoryById(context, buyer?.buyerTradingHistoryId);

    const company = await getCompanyById(context, companyId);

    const companyAddress = await getCompanyAddressById(context, company.registeredOfficeAddressId);

    const companyDifferentTradingAddress = await getCompanyDifferentTradingAddressById(context, company.differentTradingAddressId);

    const eligibility = await getEligibilityById(context, eligibilityId);

    const exportContract = await getExportContractById(context, exportContractId);

    /**
     * Create minimal policy data.
     * If a multiple policy type is passed, use multiple policy type.
     * Otherwise, use single policy type.
     */
    const policyData = {
      policyType: POLICY_TYPE.SINGLE,
      requestedCreditLimit: 100,
      totalSalesToBuyer: 123,
      totalValueOfContract: 456,
      maximumBuyerWillOwe: 789,
      policyCurrencyCode: GBP_CURRENCY_CODE,
    };

    if (policyType === POLICY_TYPE.MULTIPLE) {
      policyData.policyType = POLICY_TYPE.MULTIPLE;
    }

    const policy = (await context.query.Policy.updateOne({
      where: {
        id: policyId,
      },
      data: policyData,
      query:
        'id policyType requestedStartDate contractCompletionDate totalValueOfContract requestedCreditLimit creditPeriodWithBuyer policyCurrencyCode totalMonthsOfCover totalSalesToBuyer maximumBuyerWillOwe needPreCreditPeriodCover jointlyInsuredParty { id companyName companyNumber countryCode requested }',
    })) as ApplicationPolicy;

    /**
     * Update all other relationships
     * So that we have a full data set.
     */
    (await context.query.ExportContract.updateOne({
      where: {
        id: exportContractId,
      },
      data: mockExportContract,
      query: 'id',
    })) as ApplicationExportContract;

    const policyContact = (await context.query.PolicyContact.updateOne({
      where: {
        id: policyContactId,
      },
      data: mockPolicyContact,
      query: 'id firstName lastName email isSameAsOwner',
    })) as ApplicationPolicyContact;

    const business = (await context.query.Business.updateOne({
      where: {
        id: businessId,
      },
      data: mockBusiness,
      query: 'id',
    })) as ApplicationBusiness;

    const updatedDeclaration = (await context.query.Declaration.updateOne({
      where: {
        id: declarationId,
      },
      data: mockApplicationDeclaration,
      query: 'id hasAntiBriberyCodeOfConduct',
    })) as ApplicationDeclaration;

    // get the latest application.
    const updatedApplication = (await context.query.Application.findOne({
      where: { id: application.id },
      query: 'id nominatedLossPayee { id isAppointed financialUk { id vector { id } } financialInternational { id vector { id } } } sectionReview { id }',
    })) as Application;

    return {
      ...application,
      owner: account,
      broker,
      business,
      buyer: {
        ...buyer,
        buyerTradingHistory,
      },
      company: {
        ...company,
        registeredOfficeAddress: companyAddress,
        differentTradingAddress: companyDifferentTradingAddress,
      },
      declaration: updatedDeclaration,
      exportContract,
      eligibility,
      policy,
      policyContact,
      nominatedLossPayee: updatedApplication.nominatedLossPayee,
      sectionReview: updatedApplication.sectionReview,
    };
  } catch (error) {
    console.error('Error creating a full application (test helpers)');

    throw new Error('Error creating a full application (test helpers)');
  }
};

export default createFullApplication;
