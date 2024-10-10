import getCountries from '../../../helpers/get-countries';
import createABuyer from '../../../helpers/create-a-buyer';
import createManyApplicationsAndReferenceNumbers from '../../../helpers/create-many-applications-and-reference-numbers';
import updateApplicationsData from '../../../helpers/update-applications-data';
import INITIAL_APPLICATION_DATA from '../../../constants/application/initial-application-data';
import { CreateManyApplicationsVariables, Context, ObjectType } from '../../../types';

/**
 * createManyApplications
 * Creates many applications.
 * This is used by E2E tests only
 * 1) Creates an empty object array with the number of elements passed in variables
 * 2) Gets all countries
 * 3) creates a buyer with the first country
 * 4) Maps application creation object
 * 5) Creates many applications
 * 6) Creates reference numbers for applications
 * 7) updates ReferenceNumber table with application reference numbers
 * 8) updates application tables with relevant reference numbers
 * 9) returns applications array and success flag
 * @param {Object} root: GraphQL root variables
 * @param {CreateManyApplicationsVariables} GraphQL variables for the createManyApplications mutation
 * @param {Context} context: KeystoneJS context API
 * @returns {Promise<Object>} Object with success flag and applications array
 */
const createManyApplications = async (root: any, variables: CreateManyApplicationsVariables, context: Context) => {
  console.info('Creating many applications');

  try {
    const emptyArray = new Array(variables.count).fill({});

    const countries = await getCountries(context);

    // creates buyer with first country from countries array
    const buyer = await createABuyer(context, countries[0].id);

    // creates array for creation/update of applications
    const mockApplicationsData = emptyArray.map(() => ({
      owner: {
        connect: {
          id: variables.accountId,
        },
      },
      buyer: {
        connect: {
          id: buyer.id,
        },
      },
      ...INITIAL_APPLICATION_DATA,
    }));

    const { referenceNumbers } = await createManyApplicationsAndReferenceNumbers(context, mockApplicationsData);

    // maps update object for updating all applications with relevant reference numbers
    const updateApplicationReferenceNumbers = referenceNumbers.map((referenceNumber: ObjectType) => ({
      where: { id: referenceNumber.applicationId },
      data: { referenceNumber: referenceNumber.id },
    }));

    await updateApplicationsData(context, updateApplicationReferenceNumbers);

    const allApplications = await context.query.Application.findMany({
      query: 'id referenceNumber',
    });

    if (allApplications.length) {
      return {
        applications: allApplications,
        success: true,
      };
    }

    return {
      success: false,
    };
  } catch (error) {
    console.error('Error creating many applications %o', error);

    throw new Error(`Creating many applications ${error}`);
  }
};

export default createManyApplications;
