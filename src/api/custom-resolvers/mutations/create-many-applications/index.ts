import { CreateManyApplicationsVariables, Application, Context, ObjectType } from '../../../types';
import getCountries from '../../../helpers/get-countries';
import { mockApplicationCreationObject } from '../../../test-mocks/mock-application';

/**
 * createManyApplications
 * Creates many applications.
 * This is used by E2E tests only
 * 1) Creates an empty object array with the number of elements passed in variables
 * 2) Gets all countries and creates a buyer with the first country
 * 3) Maps application creation object
 * 4) Creates many applications
 * 5) Creates reference numbers for applications and updated ReferenceNumber and Application tables
 * 6) returns applications array and success flag
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
    const buyer = await context.db.Buyer.createOne({
      data: {
        country: {
          connect: {
            id: countries[0].id,
          },
        },
      },
    });

    // creates object for creation/update of applications
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
      ...mockApplicationCreationObject,
    }));

    // creates many applications
    const applications = (await context.db.Application.createMany({
      data: mockApplicationsData,
    })) as Array<Application>;

    // generates data for creating referenceNumbers
    const referenceNumbersData = applications.map((application) => ({
      application: {
        connect: {
          id: application.id,
        },
      },
    }));

    // creates reference numbers
    const referenceNumbers = await context.db.ReferenceNumber.createMany({ data: referenceNumbersData });

    // maps update object for updating all applications with relevant reference numbers
    const updateApplicationReferenceNumbers = referenceNumbers.map((referenceNumber: ObjectType) => ({
      where: { id: referenceNumber.applicationId },
      data: { referenceNumber: referenceNumber.id },
    }));

    // updates application's reference numbers
    await context.db.Application.updateMany({
      data: updateApplicationReferenceNumbers,
    });

    const allApplications = await context.db.Application.findMany();

    if (applications.length) {
      return {
        applications: allApplications,
        success: true,
      };
    }

    return {
      success: false,
    };
  } catch (error) {
    console.error('Error creating many applications %O', error);

    throw new Error(`Creating many applications ${error}`);
  }
};

export default createManyApplications;
