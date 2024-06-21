import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

const addEligibilityHasEndBuyerField = (connection: Connection) => {
  const loggingMessage = 'Adding FIELD hasEndBuyer to eligibility table';

  const query = `
    ALTER TABLE Eligibility ADD hasEndBuyer tinyint(1) NOT NULL DEFAULT '0'
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default addEligibilityHasEndBuyerField;
