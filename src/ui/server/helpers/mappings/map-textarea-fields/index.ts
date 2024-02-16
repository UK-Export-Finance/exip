import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';
import replaceCharacterCodesWithCharacters from '../../replace-character-codes-with-characters';
import replaceNewLineWithLineBreak from '../../replace-new-line-with-line-break';
import { Application } from '../../../../types';

const {
  EXPORTER_BUSINESS: {
    ALTERNATIVE_TRADING_ADDRESS: { FULL_ADDRESS },
    NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES },
  },
  EXPORT_CONTRACT: {
    ABOUT_GOODS_OR_SERVICES: { DESCRIPTION },
  },
  POLICY: {
    BROKER_DETAILS: { FULL_ADDRESS: BROKER_ADDRESS },
    CREDIT_PERIOD_WITH_BUYER,
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
 * @param {Application}
 * @returns {Object} Application with mapped textarea field characters
 */
const mapTextareaFields = (application: Application): Application => {
  const { broker, business, buyer, company, exportContract, policy } = application;

  broker[BROKER_ADDRESS] = replaceNewLineWithLineBreak(broker[BROKER_ADDRESS]);

  business[GOODS_OR_SERVICES] = replaceCharacterCodesWithCharacters(business[GOODS_OR_SERVICES]);

  buyer[ADDRESS] = replaceCharacterCodesWithCharacters(buyer[ADDRESS]);

  buyer.relationship[CONNECTION_WITH_BUYER_DESCRIPTION] = replaceCharacterCodesWithCharacters(buyer.relationship[CONNECTION_WITH_BUYER_DESCRIPTION]);

  buyer[PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER] = replaceCharacterCodesWithCharacters(buyer[PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]);

  company.differentTradingAddress[FULL_ADDRESS] = replaceCharacterCodesWithCharacters(company.differentTradingAddress[FULL_ADDRESS]);

  exportContract[DESCRIPTION] = replaceCharacterCodesWithCharacters(exportContract[DESCRIPTION]);

  policy[CREDIT_PERIOD_WITH_BUYER] = replaceCharacterCodesWithCharacters(policy[CREDIT_PERIOD_WITH_BUYER]);

  return application;
};

export default mapTextareaFields;
