import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

const addBrokerFullAddressField = (connection: Connection) => {
  const loggingMessage = 'Adding FIELD fullAddress to broker table';

  const query = `
    ALTER TABLE Broker ADD fullAddress varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT ''
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default addBrokerFullAddressField;
