import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

const createAccountStatus = (connection: Connection) => {
  const loggingMessage = 'Creating TABLE - account status';

  const query =  `
    CREATE TABLE AccountStatus (
      id varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
      isBlocked tinyint(1) NOT NULL DEFAULT '0',
      isVerified tinyint(1) NOT NULL DEFAULT '0',
      isInactive tinyint(1) NOT NULL DEFAULT '0',
      updatedAt datetime(3) DEFAULT NULL,
      PRIMARY KEY (id)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

const createJointlyInsuredParty = (connection: Connection) => {
  const loggingMessage = 'Creating TABLE - jointly insured party';

  const query = `
    CREATE TABLE JointlyInsuredParty (
      id varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
      policy varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
      requested tinyint(1) DEFAULT NULL,
      companyName varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      companyNumber varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      countryCode varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      PRIMARY KEY (id),
      UNIQUE KEY JointlyInsuredParty_policy_key (policy),
      CONSTRAINT JointlyInsuredParty_policy_fkey FOREIGN KEY (policy) REFERENCES Policy (id) ON DELETE
      SET
        NULL ON UPDATE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

const createExportContractAgent = (connection: Connection) => {
  const loggingMessage = 'Creating TABLE - export contract agent';

  const query = `
    CREATE TABLE ExportContractAgent (
      id varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
      service varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
      countryCode varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      fullAddress varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      isUsingAgent tinyint(1) DEFAULT NULL,
      name varchar(800) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      PRIMARY KEY (id),
      UNIQUE KEY ExportContractAgent_service_key (service),
      CONSTRAINT ExportContractAgent_service_fkey FOREIGN KEY (service) REFERENCES ExportContractAgentService (id) ON DELETE
      SET
        NULL ON UPDATE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

const createExportContractAgentService = (connection: Connection) => {
  const loggingMessage = 'Creating TABLE - export contract agent service';

  const query = `
    CREATE TABLE ExportContractAgentService (
      id varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
      agentIsCharging tinyint(1) DEFAULT NULL,
      serviceDescription varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      charge varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
      PRIMARY KEY (id),
      UNIQUE KEY ExportContractAgentService_charge_key (charge),
      CONSTRAINT ExportContractAgentService_charge_fkey FOREIGN KEY (charge) REFERENCES ExportContractAgentServiceCharge (id) ON DELETE
      SET
        NULL ON UPDATE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

const createExportContractAgentServiceCharge = (connection: Connection) => {
  const loggingMessage = 'Creating TABLE - export contract agent service charge';

  const query = `
    CREATE TABLE ExportContractAgentServiceCharge (
      id varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
      percentageCharge int DEFAULT NULL,
      fixedSumAmount int DEFAULT NULL,
      fixedSumCurrencyCode varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'GBP',
      method varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
      payableCountryCode varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      PRIMARY KEY (id)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

const createPrivateMarket = (connection: Connection) => {
  const loggingMessage = 'Creating TABLE - private market';

  const query = `
    CREATE TABLE PrivateMarket (
      id varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
      attempted tinyint(1) DEFAULT NULL,
      declinedDescription varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      PRIMARY KEY (id)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

const createCompanyDifferentTradingAddress = (connection: Connection) => {
  const loggingMessage = 'Creating TABLE - company different trading address';

  const query = `
    CREATE TABLE CompanyDifferentTradingAddress (
      id varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
      company varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
      fullAddress varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      PRIMARY KEY (id),
      KEY CompanyDifferentTradingAddress_company_idx (company),
      CONSTRAINT CompanyDifferentTradingAddress_company_fkey FOREIGN KEY (company) REFERENCES Company (id) ON DELETE SET NULL ON UPDATE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

const createTables = {
  accountStatus: (connection: Connection) => createAccountStatus(connection),
  jointlyInsuredParty: (connection: Connection) => createJointlyInsuredParty(connection),
  exportContractAgent: (connection: Connection) => createExportContractAgent(connection),
  exportContractAgentService: (connection: Connection) => createExportContractAgentService(connection),
  exportContractAgentServiceCharge: (connection: Connection) => createExportContractAgentServiceCharge(connection),
  privateMarket: (connection: Connection) => createPrivateMarket(connection),
  companyDifferentTradingAddress: (connection: Connection) => createCompanyDifferentTradingAddress(connection),
};

export default createTables;
