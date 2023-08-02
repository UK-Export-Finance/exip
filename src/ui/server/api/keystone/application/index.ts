import { ApolloResponse, InsuranceSubmittedBuyer, SubmittedDataInsuranceEligibility } from '../../../../types';
import apollo from '../../../graphql/apollo';
import countries from '../countries';
import eligibility from './eligibility';
import buyer from './buyer';
import declarations from './declarations';
import createApplicationMutation from '../../../graphql/mutations/create-application';
import getApplicationQuery from '../../../graphql/queries/application';
import updateApplicationPolicyAndExportMutation from '../../../graphql/mutations/update-application/policy-and-export';
import updateApplicationCompanyMutation from '../../../graphql/mutations/update-application/company';
import updateBusinessMutation from '../../../graphql/mutations/update-application/business';
import updateBusinessContactMutation from '../../../graphql/mutations/update-application/business-contact';
import updateBrokerMutation from '../../../graphql/mutations/update-application/broker';
import updateBuyerMutation from '../../../graphql/mutations/update-application/buyer';
import submitApplicationMutation from '../../../graphql/mutations/submit-application';
import updateApplicationSectionReviewMutation from '../../../graphql/mutations/update-application/section-review';

const createInitialApplication = async (accountId: string) => {
  try {
    console.info('Creating empty application');

    let variables = {};

    if (accountId) {
      variables = {
        data: {
          owner: {
            connect: { id: accountId },
          },
        },
      };
    }

    const response = (await apollo('POST', createApplicationMutation, variables)) as ApolloResponse;

    if (response.errors) {
      console.error('GraphQL error creating empty application %O', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error creating empty application %O', response.networkError.result.errors);
    }

    if (response?.data?.createApplication) {
      return response.data.createApplication;
    }

    console.error('Error with apollo createApplicationMutation %O', response);
    throw new Error('Creating empty application');
  } catch (err) {
    console.error('Error creating empty application %O', err);
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
        const { id: buyerId } = newApplication.buyer;

        const buyerCountry = await countries.get(buyerCountryIsoCode);

        await eligibility.update(eligibilityId, {
          ...eligibilityAnswers,
          buyerCountry: {
            connect: { id: buyerCountry.id },
          },
        });

        // update the buyer country on application creation using the eligiblity country
        await buyer.update(buyerId, {
          country: {
            connect: { id: buyerCountry.id },
          },
        });

        return newApplication;
      }
    } catch (err) {
      console.error('Error creating application with relationships %O', err);
      throw new Error('Creating application with relationships');
    }
  },
  get: async (referenceNumber: number) => {
    try {
      console.info('Getting application');

      const response = (await apollo('GET', getApplicationQuery, { referenceNumber })) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error getting application %O', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error getting application %O', response.networkError.result.errors);
      }

      if (response?.data?.referenceNumber && response?.data?.referenceNumber?.application) {
        const { data } = response;

        return {
          ...data.referenceNumber.application,
          referenceNumber: data.referenceNumber.id,
        };
      }

      console.error('Error with apollo getApplicationQuery %O', response);
      throw new Error('Getting application');
    } catch (err) {
      console.error('Error getting application %O', err);
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
          console.error('GraphQL error updating application policy and export %O', response.errors);
        }

        if (response?.networkError?.result?.errors) {
          console.error('GraphQL network error updating application policy and export %O', response.networkError.result.errors);
        }

        if (response?.data?.updatePolicyAndExport) {
          return response.data.updatePolicyAndExport;
        }

        console.error('Error with apollo updateApplicationPolicyAndExportMutation %O', response);
        throw new Error('Updating application policy and export');
      } catch (err) {
        console.error('Error updating application policy and export %O', err);
        throw new Error('Updating application policy and export');
      }
    },
    broker: async (id: string, update: object) => {
      try {
        console.info('Updating application broker');

        const variables = {
          where: { id },
          data: update,
        };

        const response = (await apollo('POST', updateBrokerMutation, variables)) as ApolloResponse;

        if (response.errors) {
          console.error('GraphQL error updating application broker %O', response.errors);
        }

        if (response?.networkError?.result?.errors) {
          console.error('GraphQL network error updating application broker %O', response.networkError.result.errors);
        }

        if (response?.data?.updateBroker) {
          return response.data.updateBroker;
        }

        console.error('Error with apollo updateBrokerMutation %O', response);
        throw new Error('Updating application broker');
      } catch (err) {
        console.error('Error updating application broker %O', err);
        throw new Error('Updating application broker');
      }
    },
    business: async (id: string, update: object) => {
      try {
        console.info('Updating application business');

        const variables = {
          where: { id },
          data: update,
        };

        const response = (await apollo('POST', updateBusinessMutation, variables)) as ApolloResponse;

        if (response.errors) {
          console.error('GraphQL error updating application business %O', response.errors);
        }

        if (response?.networkError?.result?.errors) {
          console.error('GraphQL network error updating application business %O', response.networkError.result.errors);
        }

        if (response?.data?.updateBusiness) {
          return response.data.updateBusiness;
        }

        console.error('Error with apollo updateBusinessMutation %O', response);
        throw new Error('Updating application business');
      } catch (err) {
        console.error('Error updating application business %O', err);
        throw new Error('Updating application business');
      }
    },
    businessContact: async (id: string, update: object) => {
      try {
        console.info('Updating application business contact');

        const variables = {
          where: { id },
          data: update,
        };

        const response = (await apollo('POST', updateBusinessContactMutation, variables)) as ApolloResponse;

        if (response.errors) {
          console.error('GraphQL error updating application business contact %O', response.errors);
        }

        if (response?.networkError?.result?.errors) {
          console.error('GraphQL network error updating application business contact %O', response.networkError.result.errors);
        }

        if (response?.data?.updateBusinessContactDetail) {
          return response.data.updateBusinessContactDetail;
        }

        console.error('Error with apollo updateBusinessContactMutation %O', response);
        throw new Error('Updating application business contact');
      } catch (err) {
        console.error('Error updating application business contact %O', err);
        throw new Error('Updating application business contact');
      }
    },
    company: async (companyId: string, companyAddressId: string, update: object) => {
      try {
        console.info('Updating application company');

        const variables = {
          companyId,
          companyAddressId,
          data: update,
        };

        const response = (await apollo('POST', updateApplicationCompanyMutation, variables)) as ApolloResponse;

        if (response.errors) {
          console.error('GraphQL error updating application company %O', response.errors);
        }

        if (response?.networkError?.result?.errors) {
          console.error('GraphQL network error updating application company %O', response.networkError.result.errors);
        }

        if (response?.data?.updateCompanyAndCompanyAddress) {
          return response.data.updateCompanyAndCompanyAddress;
        }

        console.error('Error with apollo updateApplicationCompanyMutation %O', response);
        throw new Error('Updating application company');
      } catch (err) {
        console.error('Error updating application company %O', err);
        throw new Error('Updating application company');
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
          console.error('GraphQL error updating application buyer %O', response.errors);
        }

        if (response?.networkError?.result?.errors) {
          console.error('GraphQL network error updating application buyer %O', response.networkError.result.errors);
        }

        if (response?.data?.updateBuyer) {
          return response.data.updateBuyer;
        }

        console.error('Error with apollo updateBuyerMutation %O', response);
        throw new Error('Updating application buyer');
      } catch (err) {
        console.error('Error updating application buyer %O', err);
        throw new Error('Updating application buyer');
      }
    },
    declarations: declarations.update,
    sectionReview: async (id: string, update: object) => {
      try {
        console.info('Updating application section review');

        const variables = {
          where: { id },
          data: update,
        };

        const response = (await apollo('POST', updateApplicationSectionReviewMutation, variables)) as ApolloResponse;

        if (response.errors) {
          console.error('GraphQL error updating application section review %O', response.errors);
        }

        if (response?.networkError?.result?.errors) {
          console.error('GraphQL network error updating application section review %O', response.networkError.result.errors);
        }

        if (response?.data?.updateSectionReview) {
          return response.data.updateSectionReview;
        }

        console.error('Error with apollo updateApplicationSectionReviewMutation %O', response);
        throw new Error('Updating application section review');
      } catch (err) {
        console.error('Error updating application section review %O', err);
        throw new Error('Updating application section review');
      }
    },
  },
  submit: async (applicationId: string) => {
    try {
      console.info(`Submitting application ${applicationId}`);

      const variables = { applicationId };

      const response = (await apollo('POST', submitApplicationMutation, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error submitting application %O', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error submitting application %O', response.networkError.result.errors);
      }

      if (response?.data?.submitApplication) {
        return response.data.submitApplication;
      }

      console.error('Error with apollo submitApplicationMutation %O', response);
      throw new Error(`Submitting application ${applicationId}`);
    } catch (err) {
      console.error('Error submitting application %O', err);
      throw new Error(`Submitting application ${applicationId}`);
    }
  },
  eligibility,
  declarations,
};

export default application;
