import { Context, Application } from '.keystone/types'; // eslint-disable-line
import accounts from './accounts';
import createAnEligibility from '../helpers/create-an-eligibility';
import createABuyer from '../helpers/create-a-buyer';
import { mockApplicationEligibility, mockSinglePolicy, mockExportContract, mockBusiness, mockBusinessContactDetail } from '../test-mocks/mock-application';
import { mockCompany, mockCompanySicCode, mockApplicationDeclaration } from '../test-mocks';
import mockCountries from '../test-mocks/mock-countries';
import {
  ApplicationBusiness,
  ApplicationBusinessContactDetail,
  ApplicationCompany,
  ApplicationCompanySicCode,
  ApplicationDeclaration,
  ApplicationExportContract,
  ApplicationPolicy,
} from '../types';

/**
 * createFullApplication
 * Create a full application for unit testing
 * @param {Object} KeystoneJS context API
 * @returns {Object} Application
 */
export const createFullApplication = async (context: Context) => {
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
      'id referenceNumber submissionCount policy { id requestedStartDate } exportContract { id } owner { id } company { id } business { id } broker { id } declaration { id }',
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
  (await context.query.Policy.updateOne({
    where: {
      id: application.policy.id,
    },
    data: {
      ...mockSinglePolicy,
    },
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

  const businessContactDetail = (await context.query.BusinessContactDetail.createOne({
    data: {
      ...mockBusinessContactDetail,
      business: {
        connect: {
          id: application.business.id,
        },
      },
    },
    query: 'id firstName lastName email',
  })) as ApplicationBusinessContactDetail;

  const business = (await context.query.Business.updateOne({
    where: {
      id: application.business.id,
    },
    data: mockBusiness,
    query: 'id businessContactDetail { id firstName lastName email }',
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
    businessContactDetail,
    buyer,
    company,
    declaration,
    eligibility,
  };
};

export default createFullApplication;
