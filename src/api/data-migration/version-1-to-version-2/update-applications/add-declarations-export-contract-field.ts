import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

const addDeclarationsExportContractField = (connection: Connection) => {
  const loggingMessage = 'Adding FIELD exportContract to declaration table';

  const query = `
    ALTER TABLE Declaration ADD exportContract tinyint(1) DEFAULT NULL
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default addDeclarationsExportContractField;
