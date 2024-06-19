import { Context } from '.keystone/types'; // eslint-disable-line
import mapArrayOfConnectionObjects from './map-array-of-connection-objects';
import { Application } from '../types';

const getAllApplications = async (context: Context) => {
  const loggingMessage = 'Getting all applications';

  console.info(`✅ ${loggingMessage}`);

  try {
    const applications = await context.db.Application.findMany() as Array<object>;
  
    console.info('✅ Generating an array of application ID connections');

    const idsConnectArray = mapArrayOfConnectionObjects({
      idsArray: applications,
      relationshipName: 'application',
    });

    return {
      applications,
      idsConnectArray,
    };
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default getAllApplications;
