import { Connection } from 'mysql2/promise';
import createCuid from '../create-cuid';
import executeSqlQuery from '../execute-sql-query';
import { Application } from '../../../types';

/**
 * createJointlyInsuredParty
 * Create new "jointly insured party" entries with "policy" relationships.
 * 1) Map over each application
 * 2) Create new database values with a UUID and policy ID
 * 3) Add entries to the JointlyInsuredParty table
 * @param {Connection} connection: SQL database connection
 * @param {Array<Application>} applications: Applications
 * @returns {Promise<Array<ApplicationJointlyInsuredParty>>} Jointly insured party entries
 */
const createJointlyInsuredParty = async (connection: Connection, applications: Array<Application>) => {
  const loggingMessage = 'Creating jointlyInsuredParty entries with policy relationships';

  console.info(`✅ ${loggingMessage}`);

  try {
    const jointlyInsuredPartyPromises = applications.map(async (application: Application) => {
      const theValues = `('${createCuid()}', '${application.policy}')`;

      const query = `
        INSERT INTO JointlyInsuredParty (id, policy) VALUES ${theValues};
      `;

      const updated = await executeSqlQuery({
        connection,
        query,
        loggingMessage: `Creating JointlyInsuredParty entry for application ${application.id}`,
      });

      return updated;
    });

    return Promise.all(jointlyInsuredPartyPromises);
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default createJointlyInsuredParty;
