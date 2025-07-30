import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';
import replaceCharacterCodesWithCharacters from '../../replace-character-codes-with-characters';
import { Application } from '../../../../types';

const {
  DECLARATIONS: {
    MODERN_SLAVERY: {
      CONDITIONAL_REASONS: { CANNOT_ADHERE_TO_ALL_REQUIREMENTS, OFFENSES_OR_INVESTIGATIONS, AWARE_OF_EXISTING_SLAVERY },
    },
  },
  EXPORTER_BUSINESS: {
    ALTERNATIVE_TRADING_ADDRESS: { FULL_ADDRESS: ALT_TRADING_FULL_ADDRESS },
    NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES },
  },
  EXPORT_CONTRACT: {
    ABOUT_GOODS_OR_SERVICES: { DESCRIPTION },
    PRIVATE_MARKET: { DECLINED_DESCRIPTION },
    AGENT_DETAILS: { FULL_ADDRESS: AGENT_FULL_ADDRESS },
    AGENT_SERVICE: { SERVICE_DESCRIPTION },
  },
  POLICY: {
    BROKER_MANUAL_ADDRESS: { FULL_ADDRESS: BROKER_ADDRESS },
    CREDIT_PERIOD_WITH_BUYER,
    FINANCIAL_ADDRESS,
  },
  YOUR_BUYER: {
    COMPANY_OR_ORGANISATION: { ADDRESS },
    CONNECTION_WITH_BUYER_DESCRIPTION,
    PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER,
  },
} = INSURANCE_FIELD_IDS;

/**
 * mapTextareaFields
 * Replace line breaks and character codes in textarea fields
 * @param {Application} application
 * @returns {object} Application with mapped textarea field characters
 */
const mapTextareaFields = (application: Application): Application => {
  try {
    console.info('Mapping textarea fields');

    const { broker, business, buyer, company, declaration, exportContract, policy, nominatedLossPayee } = application;

    broker[BROKER_ADDRESS] = replaceCharacterCodesWithCharacters(broker[BROKER_ADDRESS]);

    business[GOODS_OR_SERVICES] = replaceCharacterCodesWithCharacters(business[GOODS_OR_SERVICES]);

    buyer[ADDRESS] = replaceCharacterCodesWithCharacters(buyer[ADDRESS]);

    buyer.relationship[CONNECTION_WITH_BUYER_DESCRIPTION] = replaceCharacterCodesWithCharacters(buyer.relationship[CONNECTION_WITH_BUYER_DESCRIPTION]);

    buyer.relationship[PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER] = replaceCharacterCodesWithCharacters(
      buyer.relationship[PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER],
    );

    company.differentTradingAddress[ALT_TRADING_FULL_ADDRESS] = replaceCharacterCodesWithCharacters(company.differentTradingAddress[ALT_TRADING_FULL_ADDRESS]);

    exportContract[DESCRIPTION] = replaceCharacterCodesWithCharacters(exportContract[DESCRIPTION]);

    exportContract.privateMarket[DECLINED_DESCRIPTION] = replaceCharacterCodesWithCharacters(exportContract.privateMarket[DECLINED_DESCRIPTION]);

    exportContract.agent[AGENT_FULL_ADDRESS] = replaceCharacterCodesWithCharacters(exportContract.agent[AGENT_FULL_ADDRESS]);

    exportContract.agent.service[SERVICE_DESCRIPTION] = replaceCharacterCodesWithCharacters(exportContract.agent.service[SERVICE_DESCRIPTION]);

    policy[CREDIT_PERIOD_WITH_BUYER] = replaceCharacterCodesWithCharacters(policy[CREDIT_PERIOD_WITH_BUYER]);

    nominatedLossPayee.financialUk[FINANCIAL_ADDRESS] = replaceCharacterCodesWithCharacters(nominatedLossPayee.financialUk[FINANCIAL_ADDRESS]);

    nominatedLossPayee.financialInternational[FINANCIAL_ADDRESS] = replaceCharacterCodesWithCharacters(
      nominatedLossPayee.financialInternational[FINANCIAL_ADDRESS],
    );

    declaration.modernSlavery[CANNOT_ADHERE_TO_ALL_REQUIREMENTS] = replaceCharacterCodesWithCharacters(
      declaration.modernSlavery[CANNOT_ADHERE_TO_ALL_REQUIREMENTS],
    );

    declaration.modernSlavery[OFFENSES_OR_INVESTIGATIONS] = replaceCharacterCodesWithCharacters(declaration.modernSlavery[OFFENSES_OR_INVESTIGATIONS]);

    declaration.modernSlavery[AWARE_OF_EXISTING_SLAVERY] = replaceCharacterCodesWithCharacters(declaration.modernSlavery[AWARE_OF_EXISTING_SLAVERY]);

    return application;
  } catch (error) {
    console.error('Error mapping textarea fields %o', error);

    throw new Error(`Error mapping textarea fields ${error}`);
  }
};

export default mapTextareaFields;
