import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

const createAccountStatus = (connection: Connection) => {
  const loggingMessage = 'Creating TABLE - account status';

  const query = `
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

const createBuyerContact = (connection: Connection) => {
  const loggingMessage = 'Creating TABLE - buyer contact';

  const query = `
    CREATE TABLE BuyerContact (
      id varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
      contactFirstName varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      contactLastName varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      contactPosition varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      contactEmail varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      canContactBuyer tinyint(1) DEFAULT NULL,
      application varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
      PRIMARY KEY (id),
      KEY BuyerContact_application_idx (application),
      CONSTRAINT BuyerContact_application_fkey FOREIGN KEY (application) REFERENCES Application (id) ON DELETE
      SET
        NULL ON UPDATE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

const createBuyerRelationship = (connection: Connection) => {
  const loggingMessage = 'Creating TABLE - buyer relationship';

  const query = `
    CREATE TABLE BuyerRelationship (
      id varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
      exporterIsConnectedWithBuyer tinyint(1) DEFAULT NULL,
      connectionWithBuyerDescription varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      exporterHasPreviousCreditInsuranceWithBuyer tinyint(1) DEFAULT NULL,
      exporterHasBuyerFinancialAccounts tinyint(1) DEFAULT NULL,
      previousCreditInsuranceWithBuyerDescription varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      application varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
      PRIMARY KEY (id),
      KEY BuyerRelationship_application_idx (application),
      CONSTRAINT BuyerRelationship_application_fkey FOREIGN KEY (application) REFERENCES Application (id) ON DELETE
      SET
        NULL ON UPDATE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

const createBuyerTradingHistory = (connection: Connection) => {
  const loggingMessage = 'Creating TABLE - buyer trading history';

  const query = `
    CREATE TABLE BuyerTradingHistory (
      id varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
      currencyCode varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      outstandingPayments tinyint(1) DEFAULT NULL,
      failedPayments tinyint(1) DEFAULT NULL,
      exporterHasTradedWithBuyer tinyint(1) DEFAULT NULL,
      totalOverduePayments int DEFAULT NULL,
      totalOutstandingPayments int DEFAULT NULL,
      application varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
      PRIMARY KEY (id),
      KEY BuyerTradingHistory_application_idx (application),
      CONSTRAINT BuyerTradingHistory_application_fkey FOREIGN KEY (application) REFERENCES Application (id) ON DELETE
      SET
        NULL ON UPDATE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

const createNominatedLossPayee = (connection: Connection) => {
  const loggingMessage = 'Creating TABLE - nominated loss payee';

  const query = `
    CREATE TABLE NominatedLossPayee (
      id varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
      application varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
      isAppointed tinyint(1) DEFAULT NULL,
      name varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      isLocatedInUk tinyint(1) DEFAULT NULL,
      isLocatedInternationally tinyint(1) DEFAULT NULL,
      PRIMARY KEY (id),
      KEY NominatedLossPayee_application_idx (application),
      CONSTRAINT NominatedLossPayee_application_fkey FOREIGN KEY (application) REFERENCES Application (id) ON DELETE
      SET
        NULL ON UPDATE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

const createLossPayeeFinancialInternational = (connection: Connection) => {
  const loggingMessage = 'Creating TABLE - loss payee financial international';

  const query = `
    CREATE TABLE LossPayeeFinancialInternational (
      id varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
      lossPayee varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
      bankAddress varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      bicSwiftCode varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      iban varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      vector varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
      PRIMARY KEY (id),
      UNIQUE KEY LossPayeeFinancialInternational_lossPayee_key (lossPayee),
      UNIQUE KEY LossPayeeFinancialInternational_vector_key (vector),
      CONSTRAINT LossPayeeFinancialInternational_lossPayee_fkey FOREIGN KEY (lossPayee) REFERENCES NominatedLossPayee (id) ON DELETE
      SET
        NULL ON UPDATE CASCADE,
        CONSTRAINT LossPayeeFinancialInternational_vector_fkey FOREIGN KEY (vector) REFERENCES LossPayeeFinancialInternationalVector (id) ON DELETE
      SET
        NULL ON UPDATE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

const createLossPayeeFinancialInternationalVector = (connection: Connection) => {
  const loggingMessage = 'Creating TABLE - loss payee financial international vector';

  const query = `
    CREATE TABLE LossPayeeFinancialInternationalVector (
      id varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
      bicSwiftCodeVector varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      ibanVector varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      PRIMARY KEY (id)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

const createLossPayeeFinancialUk = (connection: Connection) => {
  const loggingMessage = 'Creating TABLE - loss payee financial UK';

  const query = `
    CREATE TABLE LossPayeeFinancialUk (
      id varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
      lossPayee varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
      accountNumber varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      bankAddress varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      sortCode varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      vector varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
      PRIMARY KEY (id),
      UNIQUE KEY LossPayeeFinancialUk_lossPayee_key (lossPayee),
      UNIQUE KEY LossPayeeFinancialUk_vector_key (vector),
      CONSTRAINT LossPayeeFinancialUk_lossPayee_fkey FOREIGN KEY (lossPayee) REFERENCES NominatedLossPayee (id) ON DELETE
      SET
        NULL ON UPDATE CASCADE,
        CONSTRAINT LossPayeeFinancialUk_vector_fkey FOREIGN KEY (vector) REFERENCES LossPayeeFinancialUkVector (id) ON DELETE
      SET
        NULL ON UPDATE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

const createLossPayeeFinancialUkVector = (connection: Connection) => {
  const loggingMessage = 'Creating TABLE - loss payee financial UK vector';

  const query = `
    CREATE TABLE LossPayeeFinancialUkVector (
      id varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
      accountNumberVector varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      sortCodeVector varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      PRIMARY KEY (id)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

const createTables = async (connection: Connection) => {
  const loggingMessage = 'Creating new tables';

  try {
    console.info(`✅ ${loggingMessage}`);

    const tables = await Promise.all([
      createAccountStatus(connection),
      createJointlyInsuredParty(connection),

      createExportContractAgentServiceCharge(connection),
      createExportContractAgentService(connection),
      createExportContractAgent(connection),

      createPrivateMarket(connection),
      createCompanyDifferentTradingAddress(connection),

      createBuyerContact(connection),
      createBuyerRelationship(connection),
      createBuyerTradingHistory(connection),

      createNominatedLossPayee(connection),
      createLossPayeeFinancialInternationalVector(connection),
      createLossPayeeFinancialInternational(connection),
      createLossPayeeFinancialUkVector(connection),
      createLossPayeeFinancialUk(connection),
    ]);

    return tables;
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default createTables;
