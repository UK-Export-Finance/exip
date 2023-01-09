import { ApolloError } from 'apollo-client';
import { ApolloResponse, SubmittedDataInsuranceEligibility } from '../../../../types';
import apollo from '../../../graphql/apollo';
import eligibility from './eligibility';
import countries from '../countries';
import createApplicationMutation from '../../../graphql/mutations/create-application';
import getApplicationQuery from '../../../graphql/queries/application';
import updateApplicationPolicyAndExportMutation from '../../../graphql/mutations/update-application/policy-and-export';
import updateExporterCompanytMutation from '../../../graphql/mutations/update-application/exporter-company';

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

    if (response instanceof ApolloError) {
      throw new Error('Creating empty application');
    }
  } catch {
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
    } catch {
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

      throw new Error('Getting application');
    } catch (err) {
      throw new Error(`Getting application ${err}`);
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

        throw new Error('Updating application policy and export');
      } catch (err) {
        throw new Error(`Updating application policy and export ${err}`);
      }
    },
    // TODO: align error message
    exporterCompany: async (companyId: string, companyAddressId: string, update: object) => {
      try {
        console.info('Updating exporter company');

        const variables = {
          companyId,
          companyAddressId,
          data: update,
        };

        const response = (await apollo('POST', updateExporterCompanytMutation, variables)) as ApolloResponse;

        if (response.errors) {
          console.error('GraphQL error updating exporter company ', response.errors);
        }

        if (response?.networkError?.result?.errors) {
          console.error('GraphQL network error updating exporter company ', response.networkError.result.errors);
        }

        if (response?.data?.updateApplicationCompanyAndCompanyAddress) {
          const { data } = response;

          return data.updateApplicationCompanyAndCompanyAddress;
        }

        throw new Error('Updating exporter company');
      } catch (err) {
        throw new Error(`Updating exporter company ${err}`);
      }
    },
  },
  eligibility,
};

export default application;
