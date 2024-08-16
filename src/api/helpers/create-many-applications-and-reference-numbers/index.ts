import { Context, Application, ObjectType } from '../../types';

/**
 * createManyApplications
 * Creates many applications
 * Creates reference numbers for each application
 * @param {Context} context: KeystoneJS context API
 * @param {String} applicationData: create applications data
 * @returns {Promise<Object>} Created applications and reference numbers
 */
const createManyApplicationsAndReferenceNumbers = async (context: Context, applicationData: Array<ObjectType>) => {
  console.info('Creating many applications and reference numbers');

  try {
    const applications = (await context.db.Application.createMany({
      data: applicationData,
    })) as Array<Application>;

    const referenceNumbersData = applications.map((application) => ({
      application: {
        connect: {
          id: application.id,
        },
      },
    }));

    // creates reference numbers
    const referenceNumbers = await context.db.ReferenceNumber.createMany({ data: referenceNumbersData });

    return {
      applications,
      referenceNumbers,
    };
  } catch (error) {
    console.error('Error creating many applications and reference numbers - helper %O', error);

    throw new Error(`Creating many applications and reference numbers - helper ${error}`);
  }
};

export default createManyApplicationsAndReferenceNumbers;
