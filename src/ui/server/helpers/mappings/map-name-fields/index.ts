import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';
import replaceCharacterCodesWithCharacters from '../../replace-character-codes-with-characters';
import { Application } from '../../../../types';

const {
  ACCOUNT: { FIRST_NAME, LAST_NAME },
  YOUR_BUYER: {
    COMPANY_OR_ORGANISATION: { NAME: BUYER_NAME, FIRST_NAME: BUYER_CONTACT_FIRST_NAME, LAST_NAME: BUYER_CONTACT_LAST_NAME },
  },
} = INSURANCE_FIELD_IDS;

/**
 * mapNameFields
 * Replace character codes in name fields with characters
 * @param {Application}
 * @returns {Object} Application with mapped name field characters
 */
const mapNameFields = (application: Application): Application => {
  const { buyer, policyContact } = application;

  if (buyer?.[BUYER_NAME]) {
    const fieldValue = buyer[BUYER_NAME];

    buyer[BUYER_NAME] = replaceCharacterCodesWithCharacters(fieldValue);
  }

  if (buyer?.[BUYER_CONTACT_FIRST_NAME]) {
    const fieldValue = buyer[BUYER_CONTACT_FIRST_NAME];

    buyer[BUYER_CONTACT_FIRST_NAME] = replaceCharacterCodesWithCharacters(fieldValue);
  }

  if (buyer?.[BUYER_CONTACT_LAST_NAME]) {
    const fieldValue = buyer[BUYER_CONTACT_LAST_NAME];

    buyer[BUYER_CONTACT_LAST_NAME] = replaceCharacterCodesWithCharacters(fieldValue);
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
