import { Context } from '.keystone/types'; // eslint-disable-line
import mapArrayOfConnectionObjects from './map-array-of-connection-objects';

const getAllApplications = async (context: Context) => {
  const loggingMessage = 'Getting all applications';

  console.info(`✅ ${loggingMessage}`);

  try {
    const applications = await context.db.Application.findMany() as Array<object>;
  
    console.info('✅ Generating an array of application ID connections');

    const applicationIdsConnectArray = mapArrayOfConnectionObjects({
      idsArray: applications,
      relationshipName: 'application',
    });

    return {
      applications,
      applicationIdsConnectArray,
    };
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default getAllApplications;
