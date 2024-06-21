import { Connection } from 'mysql2/promise';
import { addNominatedLossPayeeField, addNominatedLossPayeeConstraint } from './nominated-loss-payee';
import addExportContractFields from './add-export-contract-fields';
import addCompanyFields from './add-company-fields';
import addBusinessFields from './add-business-fields';
import addBrokerFullAddressField from './add-broker-full-address-field';
import addEligibilityHasEndBuyerField from './add-eligibility-has-end-buyer-field';
import addDeclarationsExportContractField from './add-declarations-export-contract-field';

/**
 * updateApplications
 * Update application fields from the MVP data model/structure, to the new "No PDF" data model/structure.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery responses
 */
const updateApplications = async (connection: Connection) => {
  const loggingMessage = 'Updating applications';

  console.info(`✅ ${loggingMessage}`);

  try {
    const tables = Promise.all([
      addNominatedLossPayeeField(connection),
      addNominatedLossPayeeConstraint(connection),
      addExportContractFields(connection),
      addCompanyFields(connection),
      addBusinessFields(connection),
      addBrokerFullAddressField(connection),
      addEligibilityHasEndBuyerField(connection),
      addDeclarationsExportContractField(connection),
    ]);

    return tables;
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default updateApplications;
