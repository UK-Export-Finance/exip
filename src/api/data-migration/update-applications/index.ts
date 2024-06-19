import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

const addNominatedLossPayeeField = (connection: Connection) => {
  const loggingMessage = 'Adding FIELD nominatedLossPayee to application table';

  const query = `
    ALTER TABLE Application ADD nominatedLossPayee varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

const addNominatedLossPayeeConstraint = (connection: Connection) => {
  const loggingMessage = 'Adding CONSTRAINT nominatedLossPayee to application table';

  const query = `
    ALTER TABLE Application ADD CONSTRAINT Application_nominatedLossPayee_fkey FOREIGN KEY (nominatedLossPayee) REFERENCES NominatedLossPayee (id) ON DELETE SET NULL ON UPDATE CASCADE
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

const addExportContractFields = (connection: Connection) => {
  const queries =  Promise.all([
    executeSqlQuery({
      connection,
      query: `ALTER TABLE ExportContract ADD goodsOrServicesDescription varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT ''`,
      loggingMessage: 'Adding FIELD goodsOrServicesDescription to exportContract table',
    }),
    executeSqlQuery({
      connection,
      query: `ALTER TABLE ExportContract ADD paymentTermsDescription varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT ''`,
      loggingMessage: 'Adding FIELD paymentTermsDescription to exportContract table',
    }),
    executeSqlQuery({
      connection,
      query: `ALTER TABLE ExportContract ADD privateMarket varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL`,
      loggingMessage: 'Adding FIELD privateMarket to exportContract table',
    }),
    executeSqlQuery({
      connection,
      query: `ALTER TABLE ExportContract ADD agent varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL`,
      loggingMessage: 'Adding FIELD agent to exportContract table',
    }),
  ]);

  return queries;
};

const addCompanyFields = (connection: Connection) => {
  const queries = Promise.all([
    executeSqlQuery({
      connection,
      query: `ALTER TABLE Company ADD differentTradingName varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT ''`,
      loggingMessage: 'Adding FIELD differentTradingName to company table',
    }),
    executeSqlQuery({
      connection,
      query: `ALTER TABLE Company ADD differentTradingAddress varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL`,
      loggingMessage: 'Adding FIELD differentTradingAddress to company table',
    }),
  ]);

  return queries;
};

const addCompanyConstraint = (connection: Connection) => {
  const loggingMessage = 'Adding CONSTRAINT differentTradingAddress to company table';

  const query = `
    ALTER TABLE Company ADD CONSTRAINT Different_trading_address_fkey FOREIGN KEY (differentTradingAddress) REFERENCES CompanyDifferentTradingAddress (id) ON DELETE SET NULL ON UPDATE CASCADE
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

const updateApplications = {
  nominatedLossPayeeField: (connection: Connection) => addNominatedLossPayeeField(connection),
  nominatedLossPayeeConstraint: (connection: Connection) => addNominatedLossPayeeConstraint(connection),
  exportContractFields: (connection: Connection) => addExportContractFields(connection),
  companyFields: (connection: Connection) => addCompanyFields(connection),
  companyConstraint: (connection: Connection) => addCompanyConstraint(connection),

};

export default updateApplications;
