import { Context } from '.keystone/types'; // eslint-disable-line
import { Connection } from 'mysql2/promise';
// import mapArrayOfConnectionObjects from './map-array-of-connection-objects';
import executeSqlQuery from './execute-sql-query';

/**
 * getAllApplications
 * Get all entries in the "Application" table.
 * 1) Get all applications via KeystoneJS context.
 * 2) Create an array of application ID "connect" relationships.
 * @param {Context} context: KeystoneJS context API
 * @returns {Promise<Object>} applications and application ID "connect" relationships
 */
const getAllApplications = async (context: Context, connection: Connection) => {
  const loggingMessage = 'Getting all applications';

  console.info(`✅ ${loggingMessage}`);

  try {
    // const applications = (await context.db.Application.findMany()) as Array<object>;

    const query = 'SELECT * FROM Application';

    const [applications] = await executeSqlQuery({ connection, query, loggingMessage });

    console.info('✅ Generating an array of application ID connections');

    // const applicationIdsConnectArray = mapArrayOfConnectionObjects({
    //   idsArray: applications,
    //   relationshipName: 'application',
    // });

    return {
      applications,
      // applicationIdsConnectArray,
    };
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default getAllApplications;
