import { ApolloResponse, SubmittedDataInsuranceEligibility } from '../../../../types';
import apollo from '../../../graphql/apollo';
import eligibility from './eligibility';
import countries from '../countries';
import createApplicationMutation from '../../../graphql/mutations/create-application';
import getApplicationQuery from '../../../graphql/queries/application';
import updateApplicationPolicyAndExportMutation from '../../../graphql/mutations/update-application/policy-and-export';
import updateApplicationExporterCompanyMutation from '../../../graphql/mutations/update-application/exporter-company';
import updateExporterBusinessMutation from '../../../graphql/mutations/update-application/exporter-business';
import updateExporterBrokerMutation from '../../../graphql/mutations/update-application/exporter-broker';

const createEmptyApplication = async () => {
  try {
    console.info('Creating empty application');

    const response = (await apollo('POST', createApplicationMutation, {})) as ApolloResponse;

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
  create: async (eligibilityAnswers: SubmittedDataInsuranceEligibility) => {
    try {
      console.info('Creating application with relationships');

      const buyerCountryIsoCode = eligibilityAnswers.buyerCountry?.isoCode;

      if (buyerCountryIsoCode) {
        const newApplication = await createEmptyApplication();

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
          const { data } = response;

          return data.updatePolicyAndExport;
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
          const { data } = response;

          return data.updateExporterBroker;
        }

        console.error(response);
        throw new Error('Updating application exporter broker');
      } catch (err) {
        console.error(err);
        throw new Error('Updating application exporter business');
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
          const { data } = response;

          return data.updateExporterBusiness;
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
          const { data } = response;

          return data.updateExporterCompanyAndCompanyAddress;
        }

        console.error(response);
        throw new Error('Updating application exporter company');
      } catch (err) {
        console.error(err);
        throw new Error('Updating application exporter company');
      }
    },
  },
  eligibility,
};

export default application;
