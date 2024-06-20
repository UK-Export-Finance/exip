import { Context } from '.keystone/types'; // eslint-disable-line
import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';
import { ApplicationBuyerMvp } from '../../types';

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

const addBusinessFields = (connection: Connection) => {
  const queries = Promise.all([
    executeSqlQuery({
      connection,
      query: `ALTER TABLE Business ADD turnoverCurrencyCode varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT ''`,
      loggingMessage: 'Adding FIELD turnoverCurrencyCode to business table',
    }),
    executeSqlQuery({
      connection,
      query: `ALTER TABLE Business ADD hasCreditControlProcess tinyint(1) DEFAULT NULL`,
      loggingMessage: 'Adding FIELD hasCreditControlProcess to business table',
    }),
  ]);

  return queries;
};

const addBrokerFullAddressField = (connection: Connection) => {
  const loggingMessage = 'Adding FIELD fullAddress to broker table';

  const query = `
    ALTER TABLE Broker ADD fullAddress varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT ''
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

const addEligibilityHasEndBuyerField = (connection: Connection) => {
  const loggingMessage = 'Adding FIELD hasEndBuyer to eligibility table';

  const query = `
    ALTER TABLE Eligibility ADD hasEndBuyer tinyint(1) NOT NULL DEFAULT '0'
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

const addDeclarationsExportContractField = (connection: Connection) => {
  const loggingMessage = 'Adding FIELD exportContract to declaration table';

  const query = `
    ALTER TABLE Declaration ADD exportContract tinyint(1) DEFAULT NULL
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

/**
 * NOTE: The buyer data we receive is raw database data.
 * In the database, boolean fields are TINYINT/integer values.
 * The KeystoneJS context/GraphQL API expects these fields to be booleans.
 * Therefore, since the TINYINT values will be 0 or 1,
 * we can safely transform any TINYINT fields to have a boolean value.
 * KeystoneJS will then automatically handle saving in the database as a TINYINT
 */

const moveBuyerContactFields = async (buyers: Array<ApplicationBuyerMvp>, context: Context) => {
  const mappedBuyerContactData = buyers.map((buyer: ApplicationBuyerMvp) => {
    const mapped = {
      application: {
        connect: {
          id: buyer.application,
        },
      },
      canContactBuyer: Boolean(buyer.canContactBuyer),
      contactEmail: buyer.contactEmail,
      contactFirstName: buyer.contactFirstName,
      contactLastName: buyer.contactLastName,
      contactPosition: buyer.contactPosition,
    };

    return mapped;
  });

  const created = await context.db.BuyerContact.createMany({
    data: mappedBuyerContactData,
  });

  return created;
};

const moveBuyerRelationshipFields = async (buyers: Array<ApplicationBuyerMvp>, context: Context) => {
  const mappedBuyerRelationshipData = buyers.map((buyer: ApplicationBuyerMvp) => {
    const mapped = {
      application: {
        connect: {
          id: buyer.application,
        },
      },
      exporterIsConnectedWithBuyer: Boolean(buyer.exporterIsConnectedWithBuyer),
    };

    return mapped;
  });

  const created = await context.db.BuyerRelationship.createMany({
    data: mappedBuyerRelationshipData,
  });

  return created;
};

const moveBuyerTradingHistoryFields = async (buyers: Array<ApplicationBuyerMvp>, context: Context) => {
  const mappedBuyerTradingHistoryData = buyers.map((buyer: ApplicationBuyerMvp) => {
    const mapped = {
      application: {
        connect: {
          id: buyer.application,
        },
      },
      exporterHasTradedWithBuyer: Boolean(buyer.exporterHasTradedWithBuyer),
    };

    return mapped;
  });

  const created = await context.db.BuyerTradingHistory.createMany({
    data: mappedBuyerTradingHistoryData,
  });

  return created;
};

const removeBuyerFields = (connection: Connection) => {
  const queries = Promise.all([
    executeSqlQuery({
      connection,
      query: 'ALTER TABLE Buyer DROP COLUMN canContactBuyer',
      loggingMessage: 'Removing FIELD canContactBuyer from buyer table',
    }),
    executeSqlQuery({
      connection,
      query: 'ALTER TABLE Buyer DROP COLUMN contactEmail',
      loggingMessage: 'Removing FIELD contactEmail from buyer table',
    }),
    executeSqlQuery({
      connection,
      query: 'ALTER TABLE Buyer DROP COLUMN contactFirstName',
      loggingMessage: 'Removing FIELD contactFirstName from buyer table',
    }),
    executeSqlQuery({
      connection,
      query: 'ALTER TABLE Buyer DROP COLUMN contactLastName',
      loggingMessage: 'Removing FIELD contactLastName from buyer table',
    }),
    executeSqlQuery({
      connection,
      query: 'ALTER TABLE Buyer DROP COLUMN contactPosition',
      loggingMessage: 'Removing FIELD contactPosition from buyer table',
    }),
    executeSqlQuery({
      connection,
      query: 'ALTER TABLE Buyer DROP COLUMN exporterIsConnectedWithBuyer',
      loggingMessage: 'Removing FIELD exporterIsConnectedWithBuyer from buyer table',
    }),
    executeSqlQuery({
      connection,
      query: 'ALTER TABLE Buyer DROP COLUMN exporterHasTradedWithBuyer',
      loggingMessage: 'Removing FIELD exporterHasTradedWithBuyer from buyer table',
    }),
  ]);

  return queries;
};

const updateApplications = {
  nominatedLossPayeeField: (connection: Connection) => addNominatedLossPayeeField(connection),
  nominatedLossPayeeConstraint: (connection: Connection) => addNominatedLossPayeeConstraint(connection),
  exportContractFields: (connection: Connection) => addExportContractFields(connection),
  companyFields: (connection: Connection) => addCompanyFields(connection),
  companyConstraint: (connection: Connection) => addCompanyConstraint(connection),
  businessFields: (connection: Connection) => addBusinessFields(connection),
  brokerFullAddressField: (connection: Connection) => addBrokerFullAddressField(connection),
  eligibilityHasEndBuyerField: (connection: Connection) => addEligibilityHasEndBuyerField(connection),
  declarationsExportContractField: (connection: Connection) => addDeclarationsExportContractField(connection),
  buyerContactFields: (buyers: Array<ApplicationBuyerMvp>, context: Context) => moveBuyerContactFields(buyers, context),
  buyerRelationshipFields: (buyers: Array<ApplicationBuyerMvp>, context: Context) => moveBuyerRelationshipFields(buyers, context),
  buyerTradingHistoryFields: (buyers: Array<ApplicationBuyerMvp>, context: Context) => moveBuyerTradingHistoryFields(buyers, context),
  buyerFields: (connection: Connection) => removeBuyerFields(connection),
};

export default updateApplications;
