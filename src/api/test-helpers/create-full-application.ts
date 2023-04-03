import { Context, Application } from '.keystone/types'; // eslint-disable-line
import { mockApplicationEligibility, mockSinglePolicyAndExport } from '../test-mocks/mock-application';
import { mockAccount, mockBuyer, mockExporterCompany, mockApplicationDeclaration } from '../test-mocks';
import { Account, ApplicationBuyer, ApplicationDeclaration } from '../types';

/**
 * updateBuyer
 * @param {Object} KeystoneJS context API
 * @param {String} Buyer ID
 * @returns {Object} Buyer
 */
export const updateBuyer = async (context: Context, buyerId: string): Promise<ApplicationBuyer> => {
  const buyer = (await context.query.Buyer.updateOne({
    where: {
      id: buyerId,
    },
    data: mockBuyer,
    query: 'id',
  })) as ApplicationBuyer;

  return buyer;
};

/**
 * createFullApplication
 * Create a full application for unit testing
 * @param {Object} KeystoneJS context API
 * @returns {Object} Application
 */
export const createFullApplication = async (context: Context) => {
  const countries = await context.query.Country.findMany({
    query: 'id isoCode',
  });

  const eligibilityCountry = countries.find((country) => country.isoCode === mockApplicationEligibility.buyerCountry.isoCode);

  if (!eligibilityCountry) {
    throw new Error('No country found from mock country ISO code');
  }

  // create a new exporter
  const exporter = (await context.query.Exporter.createOne({
    data: mockAccount,
    query: 'id firstName email',
  })) as Account;

  // create a new application
  const application = (await context.query.Application.createOne({
    query:
      'id referenceNumber eligibility { id } policyAndExport { id } exporter { id } exporterCompany { id } exporterBusiness { id } exporterBroker { id } buyer { id } declaration { id }',
    data: {
      exporter: {
        connect: {
          id: exporter.id,
        },
      },
    },
  })) as Application;

  // update the eligibility so we have a full data set.
  (await context.query.Eligibility.updateOne({
    where: {
      id: application.eligibility.id,
    },
    data: {
      ...mockApplicationEligibility,
      buyerCountry: {
        connect: {
          id: eligibilityCountry.id,
        },
      },
    },
    query: 'id',
  })) as ApplicationDeclaration;

  // update the policy and export so we have a full data set.
  (await context.query.PolicyAndExport.updateOne({
    where: {
      id: application.policyAndExport.id,
    },
    data: mockSinglePolicyAndExport,
    query: 'id',
  })) as ApplicationDeclaration;

  // update the buyer so there is a name
  const buyer = await updateBuyer(context, application.buyer.id);

  // update the exporter company so we have a company name
  const exporterCompany = (await context.query.ExporterCompany.updateOne({
    where: {
      id: application.exporterCompany.id,
    },
    data: mockExporterCompany,
    query: 'id',
  })) as ApplicationDeclaration;

  // update the declaration so we have a full data set.
  const declaration = (await context.query.Declaration.updateOne({
    where: {
      id: application.declaration.id,
    },
    data: mockApplicationDeclaration,
    query: 'id',
  })) as ApplicationDeclaration;

  return {
    ...application,
    exporter,
    exporterCompany,
    application,
    buyer,
    declaration,
  };
};

export default createFullApplication;
