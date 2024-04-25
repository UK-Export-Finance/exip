import { Application, Context } from '.keystone/types'; // eslint-disable-line

/**
 * getApplicationByReferenceNumber
 * get ids of application sections by reference number
 * returns application section ids or if not found, returns null
 * @param {Number} referenceNumber
 * @param {Context} context
 * @returns {Application} application section ids or null
 */
const getApplicationByReferenceNumber = async (referenceNumber: number, context: Context): Application => {
  try {
    console.info('Getting application by reference number - getApplicationByReferenceNumber helper %s', referenceNumber);

    const applications = (await context.db.Application.findMany({
      where: {
        referenceNumber: { equals: referenceNumber },
      },
    })) as Application;

    if (applications?.length) {
      const [application] = applications;
      return application;
    }

    return null;
  } catch (err) {
    console.error('Error getting application by reference number %O', err);

    throw new Error(`Error getting application by reference number ${err}`);
  }
};

export default getApplicationByReferenceNumber;
