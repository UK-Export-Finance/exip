import { Application, Context } from '.keystone/types'; // eslint-disable-line

/**
 * getIdsByReferenceNumber
 * get ids of application sections by application reference number
 * returns application ids or if not found, returns null
 * @param {Number} referenceNumber
 * @param {Context} context
 * @returns {Application} application ids or null
 */
const getIdsByReferenceNumber = async (referenceNumber: number, context: Context): Application => {
  const applications = (await context.db.Application.findMany({
    where: {
      referenceNumber: { equals: referenceNumber },
    },
  })) as Application;

  if (applications.length) {
    const [application] = applications;
    return application;
  }

  return null;
};

export default getIdsByReferenceNumber;
