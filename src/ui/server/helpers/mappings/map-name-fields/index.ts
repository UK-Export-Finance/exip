import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';
import replaceCharacterCodesWithCharacters from '../../replace-character-codes-with-characters';
import { Application } from '../../../../types';

const {
  ACCOUNT: { FIRST_NAME, LAST_NAME },
  COMPANIES_HOUSE: { COMPANY_NAME },
  EXPORT_CONTRACT: {
    AGENT_DETAILS: { NAME: AGENT_NAME },
  },
  POLICY: {
    LOSS_PAYEE_DETAILS: { NAME: LOSS_PAYEE_NAME },
  },
  YOUR_BUYER: {
    COMPANY_OR_ORGANISATION: { NAME: BUYER_NAME },
  },
} = INSURANCE_FIELD_IDS;

/**
 * mapNameFields
 * Replace character codes in name fields with characters
 * @param {Application} application
 * @returns {object} Application with mapped name field characters
 */
const mapNameFields = (application: Application): Application => {
  const { buyer, company, exportContract, nominatedLossPayee, policyContact } = application;

  if (buyer?.[BUYER_NAME]) {
    const fieldValue = buyer[BUYER_NAME];

    buyer[BUYER_NAME] = replaceCharacterCodesWithCharacters(fieldValue);
  }

  if (company?.[COMPANY_NAME]) {
    const fieldValue = company[COMPANY_NAME];

    company[COMPANY_NAME] = replaceCharacterCodesWithCharacters(fieldValue);
  }

  if (exportContract?.agent?.[AGENT_NAME]) {
    const fieldValue = exportContract.agent[AGENT_NAME];

    exportContract.agent[AGENT_NAME] = replaceCharacterCodesWithCharacters(fieldValue);
  }

  if (nominatedLossPayee?.[LOSS_PAYEE_NAME]) {
    const fieldValue = nominatedLossPayee[LOSS_PAYEE_NAME];

    nominatedLossPayee[LOSS_PAYEE_NAME] = replaceCharacterCodesWithCharacters(fieldValue);
  }

  if (policyContact?.[FIRST_NAME]) {
    const fieldValue = policyContact[FIRST_NAME];

    policyContact[FIRST_NAME] = replaceCharacterCodesWithCharacters(fieldValue);
  }

  if (policyContact?.[LAST_NAME]) {
    const fieldValue = policyContact[LAST_NAME];

    policyContact[LAST_NAME] = replaceCharacterCodesWithCharacters(fieldValue);
  }

  return application;
};

export default mapNameFields;
