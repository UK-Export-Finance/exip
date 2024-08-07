import { Connection } from 'mysql2/promise';
import addApplicationMigratedField from './add-application-migrated-field';
import { addNominatedLossPayeeField, addNominatedLossPayeeConstraint } from './nominated-loss-payee';
import addExportContractFields from './add-export-contract-fields';
import addBuyerFields from './add-buyer-fields';
import addCompanyFields from './add-company-fields';
import addBusinessFields from './add-business-fields';
import addBrokerFullAddressField from './add-broker-full-address-field';
import addEligibilityFields from './add-eligibility-fields';
import addDeclarationFields from './add-declaration-fields';
import updateDeclarationFields from './update-declaration-fields';
import addSectionReviewExportContractField from './add-section-review-export-contract-field';
import updateExportContractFinalDestinationCountryCodeVarChar from './update-export-contract-final-destination-country-code-var-char';
import updatePolicyCurrencyCodeVarChar from './update-policy-currency-code-var-char';
import updatePolicyContactPositionCodeVarChar from './update-policy-contact-position-var-char';
import updateApplicationVersion from './update-application-version';
import updateApplicationMigrated from './update-application-migrated';

/**
 * updateApplications
 * Update applications from the MVP data model/structure, to the new "No PDF" data model/structure.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery responses
 */
const updateApplications = async (connection: Connection) => {
  const loggingMessage = 'Updating applications';

  console.info(`✅ ${loggingMessage}`);

  try {
    const tables = await Promise.all([
      addApplicationMigratedField(connection),
      addNominatedLossPayeeField(connection),
      addNominatedLossPayeeConstraint(connection),

      addExportContractFields(connection),
      addBuyerFields(connection),
      addCompanyFields(connection),
      addBusinessFields(connection),
      addBrokerFullAddressField(connection),
      addEligibilityFields(connection),

      addDeclarationFields(connection),
      updateDeclarationFields(connection),

      addSectionReviewExportContractField(connection),
      updateExportContractFinalDestinationCountryCodeVarChar(connection),

      updatePolicyCurrencyCodeVarChar(connection),
      updatePolicyContactPositionCodeVarChar(connection),

      updateApplicationVersion(connection),
      updateApplicationMigrated(connection),
    ]);

    return tables;
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default updateApplications;
