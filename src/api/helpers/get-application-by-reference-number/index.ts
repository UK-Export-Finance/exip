import { Context } from '.keystone/types'; // eslint-disable-line
import { Application } from '../../types';

/**
 * getApplicationByReferenceNumber
 * get ids of application sections by reference number
 * returns application section ids or if not found, returns null
 * @param {Number} referenceNumber
 * @param {Context} context
 * @returns {Application} application section ids or null
 */
const getApplicationByReferenceNumber = async (referenceNumber: number, context: Context): Promise<Application | null> => {
  try {
    console.info('Getting application by reference number - getApplicationByReferenceNumber helper %s', referenceNumber);

    // @ts-ignore
    const applications = (await context.db.Application.findMany({
      where: {
        referenceNumber: { equals: referenceNumber },
      },
    })) as Array<Application>;

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
