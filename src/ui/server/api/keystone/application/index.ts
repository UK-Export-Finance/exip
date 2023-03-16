import { ApolloResponse, InsuranceSubmittedBuyer, SubmittedDataInsuranceEligibility } from '../../../../types';
import apollo from '../../../graphql/apollo';
import countries from '../countries';
import eligibility from './eligibility';
import declarations from './declarations';
import createApplicationMutation from '../../../graphql/mutations/create-application';
import getApplicationQuery from '../../../graphql/queries/application';
import updateApplicationPolicyAndExportMutation from '../../../graphql/mutations/update-application/policy-and-export';
import updateApplicationExporterCompanyMutation from '../../../graphql/mutations/update-application/exporter-company';
import updateExporterBusinessMutation from '../../../graphql/mutations/update-application/exporter-business';
import updateExporterBrokerMutation from '../../../graphql/mutations/update-application/exporter-broker';
import updateBuyerMutation from '../../../graphql/mutations/update-application/exporter-buyer';

const createInitialApplication = async (accountId: string) => {
  try {
    console.info('Creating empty application');

    let variables = {};

    if (accountId) {
      variables = {
        data: {
          exporter: {
            connect: { id: accountId },
          },
        },
      };
    }

    const response = (await apollo('POST', createApplicationMutation, variables)) as ApolloResponse;

    if (response.errors) {
      console.error('GraphQL error creating empty application ', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error creating empty application ', response.networkError.result.errors);
    }

    if (response?.data?.createApplication) {
      return response.data.createApplication;
    }

    console.error(response);
    throw new Error('Creating empty application');
  } catch (err) {
    console.error(err);
    throw new Error('Creating empty application');
  }
};

const application = {
  create: async (eligibilityAnswers: SubmittedDataInsuranceEligibility, accountId: string) => {
    try {
      console.info('Creating application with relationships');

      const buyerCountryIsoCode = eligibilityAnswers.buyerCountry?.isoCode;

      if (buyerCountryIsoCode) {
        const newApplication = await createInitialApplication(accountId);

        const { id: eligibilityId } = newApplication.eligibility;

        const buyerCountry = await countries.get(buyerCountryIsoCode);

        await eligibility.update(eligibilityId, {
          ...eligibilityAnswers,
          buyerCountry: {
            connect: { id: buyerCountry.id },
          },
        });

        return newApplication;
      }
    } catch (err) {
      console.error(err);
      throw new Error('Creating application with relationships');
    }
  },
  get: async (referenceNumber: number) => {
    try {
      console.info('Getting application');

      const response = (await apollo('GET', getApplicationQuery, { referenceNumber })) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error getting application ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error getting application ', response.networkError.result.errors);
      }

      if (response?.data?.referenceNumber && response?.data?.referenceNumber?.application) {
        const { data } = response;

        return {
          ...data.referenceNumber.application,
          referenceNumber: data.referenceNumber.id,
        };
      }

      console.error(response);
      throw new Error('Getting application');
    } catch (err) {
      console.error(err);
      throw new Error('Getting application');
    }
  },
  update: {
    policyAndExport: async (id: string, update: object) => {
      try {
        console.info('Updating application policy and export');

        const variables = {
          where: { id },
          data: update,
        };

        const response = (await apollo('POST', updateApplicationPolicyAndExportMutation, variables)) as ApolloResponse;

        if (response.errors) {
          console.error('GraphQL error updating application policy and export ', response.errors);
        }

        if (response?.networkError?.result?.errors) {
          console.error('GraphQL network error updating application policy and export ', response.networkError.result.errors);
        }

        if (response?.data?.updatePolicyAndExport) {
          return response.data.updatePolicyAndExport;
        }

        console.error(response);
        throw new Error('Updating application policy and export');
      } catch (err) {
        console.error(err);
        throw new Error('Updating application policy and export');
      }
    },
    exporterBroker: async (id: string, update: object) => {
      try {
        console.info('Updating application exporter broker');

        const variables = {
          where: { id },
          data: update,
        };

        const response = (await apollo('POST', updateExporterBrokerMutation, variables)) as ApolloResponse;

        if (response.errors) {
          console.error('GraphQL error updating application exporter broker ', response.errors);
        }

        if (response?.networkError?.result?.errors) {
          console.error('GraphQL network error updating application exporter broker ', response.networkError.result.errors);
        }

        if (response?.data?.updateExporterBroker) {
          return response.data.updateExporterBroker;
        }

        console.error(response);
        throw new Error('Updating application exporter broker');
      } catch (err) {
        console.error(err);
        throw new Error('Updating application exporter broker');
      }
    },
    exporterBusiness: async (id: string, update: object) => {
      try {
        console.info('Updating application exporter business');

        const variables = {
          where: { id },
          data: update,
        };

        const response = (await apollo('POST', updateExporterBusinessMutation, variables)) as ApolloResponse;

        if (response.errors) {
          console.error('GraphQL error updating application exporter business ', response.errors);
        }

        if (response?.networkError?.result?.errors) {
          console.error('GraphQL network error updating application exporter business ', response.networkError.result.errors);
        }

        if (response?.data?.updateExporterBusiness) {
          return response.data.updateExporterBusiness;
        }

        console.error(response);
        throw new Error('Updating application exporter business');
      } catch (err) {
        console.error(err);
        throw new Error('Updating application exporter business');
      }
    },
    exporterCompany: async (companyId: string, companyAddressId: string, update: object) => {
      try {
        console.info('Updating application exporter company');

        const variables = {
          companyId,
          companyAddressId,
          data: update,
        };

        const response = (await apollo('POST', updateApplicationExporterCompanyMutation, variables)) as ApolloResponse;

        if (response.errors) {
          console.error('GraphQL error updating application exporter company ', response.errors);
        }

        if (response?.networkError?.result?.errors) {
          console.error('GraphQL network error updating application exporter company ', response.networkError.result.errors);
        }

        if (response?.data?.updateExporterCompanyAndCompanyAddress) {
          return response.data.updateExporterCompanyAndCompanyAddress;
        }

        console.error(response);
        throw new Error('Updating application exporter company');
      } catch (err) {
        console.error(err);
        throw new Error('Updating application exporter company');
      }
    },
    buyer: async (id: string, update: InsuranceSubmittedBuyer) => {
      try {
        console.info('Updating application buyer');

        const buyerCountryCode = update.country;

        const data = {
          ...update,
        };

        if (buyerCountryCode) {
          const buyerCountry = await countries.get(buyerCountryCode);

          // ts-ignore required here to be able to reassign country to connect from string
          // @ts-ignore
          data.country = {
            connect: { id: buyerCountry.id },
          };
        }

        const variables = {
          where: { id },
          data,
        };

        const response = (await apollo('POST', updateBuyerMutation, variables)) as ApolloResponse;

        if (response.errors) {
          console.error('GraphQL error updating application buyer ', response.errors);
        }

        if (response?.networkError?.result?.errors) {
          console.error('GraphQL network error updating application buyer ', response.networkError.result.errors);
        }

        if (response?.data?.updateBuyer) {
          return response.data.updateBuyer;
        }

        console.error(response);
        throw new Error('Updating application buyer');
      } catch (err) {
        console.error(err);
        throw new Error('Updating application buyer');
      }
    },
    declarations: declarations.update,
  },
  eligibility,
  declarations,
};

export default application;
