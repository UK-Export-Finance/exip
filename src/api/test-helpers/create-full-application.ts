import accounts from './accounts';
import coverPeriodTestHelper from './cover-period';
import totalContractValueTestHelper from './total-contract-value';
import createAnEligibility from '../helpers/create-an-eligibility';
import createABuyer from '../helpers/create-a-buyer';
import createAPolicy from '../helpers/create-a-policy';
import createACompany from '../helpers/create-a-company';
import createAnExportContract from '../helpers/create-an-export-contract';
import createANominatedLossPayee from '../helpers/create-a-nominated-loss-payee';
import sectionReviewCreate from './sectionReview';
import { FIELD_VALUES } from '../constants';
import {
  mockApplicationEligibility,
  mockSinglePolicy,
  mockMultiplePolicy,
  mockExportContract,
  mockBusiness,
  mockPolicyContact,
  mockLossPayeeFinancialDetailsUk,
  mockLossPayeeFinancialDetailsUkVector,
  mockLossPayeeFinancialDetailsInternational,
  mockLossPayeeFinancialDetailsInternationalVector,
} from '../test-mocks/mock-application';
import { mockApplicationDeclaration, mockNominatedLossPayee } from '../test-mocks';
import mockCompany from '../test-mocks/mock-company';
import mockCountries from '../test-mocks/mock-countries';
import {
  Application,
  ApplicationBusiness,
  ApplicationDeclaration,
  ApplicationExportContract,
  ApplicationPolicy,
  ApplicationPolicyContact,
  ApplicationLossPayeeFinancialUk,
  ApplicationLossPayeeFinancialInternational,
  Context,
  ApplicationNominatedLossPayee,
} from '../types';

const { POLICY_TYPE } = FIELD_VALUES;

/**
 * createFullApplication
 * Create a full application for unit testing
 * @param {Object} KeystoneJS context API
 * @param {String} Policy type flag - different data is created if multiple is passed. Defaults to single.
 * @returns {Object} Application
 */
export const createFullApplication = async (context: Context, policyType?: string): Promise<Application> => {
  const { buyerCountry, totalContractValue, totalContractValueId, coverPeriod, coverPeriodId, ...otherEligibilityAnswers } = mockApplicationEligibility;

  const countries = await context.query.Country.createMany({
    data: mockCountries,
    query: 'id isoCode name',
  });

  const country = countries.find((c) => c.isoCode === buyerCountry.isoCode);

  if (!country) {
    throw new Error('No country found from mock country ISO code');
  }

  const account = await accounts.create({ context });

  // create a new application
  const application = (await context.query.Application.createOne({
    query:
      'id referenceNumber updatedAt submissionCount policyContact { id } exportContract { id } owner { id } company { id } business { id } nominatedLossPayee { id } broker { id } declaration { id } sectionReview { id } buyer { id buyerTradingHistory { id } relationship { id } }',
    data: {
      owner: {
        connect: {
          id: account.id,
        },
      },
    },
  })) as Application;

  // create a coverPeriod DB entry.
  const createdCoverPeriod = await coverPeriodTestHelper.create({ context });

  // create a totalContractValue DB entry.
  const createdTotalContractValue = await totalContractValueTestHelper.create({ context });

  // create eligibility and associate with the application.
  const eligibility = await createAnEligibility(
    context,
    country.id,
    application.id,
    createdCoverPeriod.id,
    createdTotalContractValue.id,
    otherEligibilityAnswers,
  );

  // create buyer and associate with the application.
  const { buyer } = await createABuyer(context, country.id, application.id);

  // create policy and associate with the application.
  const { policy } = await createAPolicy(context, application.id);

  // create company and associate with the application.
  const company = await createACompany(context, application.id, mockCompany);

  // create exportContract and associate with the application.
  const { exportContract } = await createAnExportContract(context, application.id);

  // create a nominatedLossPayee and associate with the application.
  const nominatedLossPayee = await createANominatedLossPayee(context, application.id);

  const sectionReview = await sectionReviewCreate.create({ context });

  /**
   * update the application with:
   * 1) Buyer relationship ID
   * 2) Company relationship ID
   * 3) Eligibility relationship ID
   * 4) ExportContract relationship ID
   * 5) Policy relationship ID
   */
  await context.db.Application.updateOne({
    where: { id: application.id },
    data: {
      buyer: {
        connect: { id: buyer.id },
      },
      company: {
        connect: { id: company.id },
      },
      eligibility: {
        connect: { id: eligibility.id },
      },
      exportContract: {
        connect: { id: exportContract.id },
      },
      policy: {
        connect: { id: policy.id },
      },
      nominatedLossPayee: {
        connect: { id: nominatedLossPayee.id },
      },
      sectionReview: {
        connect: { id: sectionReview.id },
      },
    },
  });

  /**
   * Update the policy so we have a full data set.
   * If a multiple policy type is passed, use mock multiple policy data.
   * Otherwise, use mock single policy data.
   */
  let policyData = {};

  if (policyType === POLICY_TYPE.MULTIPLE) {
    policyData = mockMultiplePolicy;
  } else {
    policyData = mockSinglePolicy;
  }

  (await context.query.Policy.updateOne({
    where: {
      id: policy.id,
    },
    data: policyData,
    query: 'id',
  })) as ApplicationPolicy;

  /**
   * Update all other relationships
   * So that we have a full data set.
   */
  (await context.query.ExportContract.updateOne({
    where: {
      id: exportContract.id,
    },
    data: mockExportContract,
    query: 'id',
  })) as ApplicationExportContract;

  const policyContact = (await context.query.PolicyContact.updateOne({
    where: {
      id: application.policyContact.id,
    },
    data: mockPolicyContact,
    query: 'id firstName lastName email isSameAsOwner',
  })) as ApplicationPolicyContact;

  const business = (await context.query.Business.updateOne({
    where: {
      id: application.business.id,
    },
    data: mockBusiness,
    query: 'id',
  })) as ApplicationBusiness;

  const declaration = (await context.query.Declaration.updateOne({
    where: {
      id: application.declaration.id,
    },
    data: mockApplicationDeclaration,
    query: 'id hasAntiBriberyCodeOfConduct',
  })) as ApplicationDeclaration;

  // gets financialUk id from application for updating
  const updatedApplication = (await context.query.Application.findOne({
    where: { id: application.id },
    query: 'id nominatedLossPayee { id isAppointed financialUk { id vector { id } } financialInternational { id vector { id } } } sectionReview { id }',
  })) as Application;

  // updates nominatedLossPayee
  (await context.query.NominatedLossPayee.updateOne({
    where: {
      id: updatedApplication.nominatedLossPayee.id,
    },
    data: mockNominatedLossPayee,
    query: 'id',
  })) as ApplicationNominatedLossPayee;

  // updates LossPayeeFinancialUk table
  (await context.query.LossPayeeFinancialUk.updateOne({
    where: {
      id: updatedApplication.nominatedLossPayee.financialUk.id,
    },
    data: mockLossPayeeFinancialDetailsUk,
    query: 'id',
  })) as ApplicationLossPayeeFinancialUk;

  // updates LossPayeeFinancialUkVector table
  (await context.query.LossPayeeFinancialUkVector.updateOne({
    where: {
      id: updatedApplication.nominatedLossPayee.financialUk.vector.id,
    },
    data: mockLossPayeeFinancialDetailsUkVector,
    query: 'id',
  })) as ApplicationLossPayeeFinancialUk;

  // updates LossPayeeFinancialInternational table
  (await context.query.LossPayeeFinancialInternational.updateOne({
    where: {
      id: updatedApplication.nominatedLossPayee.financialInternational.id,
    },
    data: mockLossPayeeFinancialDetailsInternational,
    query: 'id',
  })) as ApplicationLossPayeeFinancialInternational;

  // updates LossPayeeFinancialInternationalVector table
  (await context.query.LossPayeeFinancialInternationalVector.updateOne({
    where: {
      id: updatedApplication.nominatedLossPayee.financialInternational.vector.id,
    },
    data: mockLossPayeeFinancialDetailsInternationalVector,
    query: 'id',
  })) as ApplicationLossPayeeFinancialUk;

  return {
    ...application,
    owner: account,
    business,
    buyer,
    company,
    declaration,
    exportContract,
    eligibility,
    policy,
    policyContact,
    nominatedLossPayee: updatedApplication.nominatedLossPayee,
    sectionReview: updatedApplication.sectionReview,
  };
};

export default createFullApplication;
