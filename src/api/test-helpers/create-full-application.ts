import accounts from './accounts';
import createAnEligibility from '../helpers/create-an-eligibility';
import createABuyer from '../helpers/create-a-buyer';
import { FIELD_VALUES } from '../constants';
import {
  mockApplicationEligibility,
  mockSinglePolicy,
  mockMultiplePolicy,
  mockExportContract,
  mockBusiness,
  mockPolicyContact,
} from '../test-mocks/mock-application';
import { mockCompany, mockCompanySicCode, mockApplicationDeclaration } from '../test-mocks';
import mockCountries from '../test-mocks/mock-countries';
import {
  Application,
  ApplicationBusiness,
  ApplicationCompany,
  ApplicationCompanySicCode,
  ApplicationDeclaration,
  ApplicationExportContract,
  ApplicationPolicy,
  ApplicationPolicyContact,
  Context,
} from '../types';

const { POLICY_TYPE } = FIELD_VALUES;

/**
 * createFullApplication
 * Create a full application for unit testing
 * @param {Object} KeystoneJS context API
 * @returns {Object} Application
 */
export const createFullApplication = async (context: Context, policyType?: string) => {
  const { buyerCountry, ...otherEligibilityAnswers } = mockApplicationEligibility;

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
      'id referenceNumber submissionCount policy { id requestedStartDate } policyContact { id } exportContract { id } owner { id } company { id } business { id } broker { id } declaration { id }',
    data: {
      owner: {
        connect: {
          id: account.id,
        },
      },
    },
  })) as Application;

  // create eligibility and associate with the application.
  const eligibility = await createAnEligibility(context, country.id, application.id, otherEligibilityAnswers);

  // create buyer and associate with the application.
  const buyer = await createABuyer(context, country.id, application.id);

  // update the application with eligibility and buyer IDs.
  await context.db.Application.updateOne({
    where: { id: application.id },
    data: {
      eligibility: {
        connect: { id: eligibility.id },
      },
      buyer: {
        connect: { id: buyer.id },
      },
    },
  });

  // update the policy so we have a full data set.
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
      id: application.policy.id,
    },
    data: policyData,
    query: 'id',
  })) as ApplicationPolicy;

  // update the export contract so we have a full data set.
  (await context.query.ExportContract.updateOne({
    where: {
      id: application.exportContract.id,
    },
    data: mockExportContract,
    query: 'id',
  })) as ApplicationExportContract;

  // update the company so we have a company name
  const company = (await context.query.Company.updateOne({
    where: {
      id: application.company.id,
    },
    data: mockCompany,
    query: 'id',
  })) as ApplicationCompany;

  // create a company SIC codes
  const companySicCodes = (await context.query.CompanySicCode.createOne({
    data: {
      ...mockCompanySicCode,
      company: {
        connect: {
          id: company.id,
        },
      },
    },
    query: 'id',
  })) as ApplicationCompanySicCode;

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

  // update the declaration so we have a full data set.
  const declaration = (await context.query.Declaration.updateOne({
    where: {
      id: application.declaration.id,
    },
    data: mockApplicationDeclaration,
    query: 'id hasAntiBriberyCodeOfConduct',
  })) as ApplicationDeclaration;

  return {
    ...application,
    companySicCodes,
    owner: account,
    business,
    policyContact,
    buyer,
    company,
    declaration,
    eligibility,
  };
};

export default createFullApplication;
