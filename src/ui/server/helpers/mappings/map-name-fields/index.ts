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
 * @param {Object} Application
 * @returns {Object} Application with name field characters
 */
const mapNameFields = (application: Application): Application => {
  const { business, buyer } = application;

  if (business && business.businessContactDetail[FIRST_NAME]) {
    const fieldValue = business.businessContactDetail[FIRST_NAME];

    business.businessContactDetail[FIRST_NAME] = replaceCharacterCodesWithCharacters(fieldValue);
  }

  if (business?.businessContactDetail[LAST_NAME]) {
    const fieldValue = business.businessContactDetail[LAST_NAME];

    business.businessContactDetail[LAST_NAME] = replaceCharacterCodesWithCharacters(fieldValue);
  }

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

  return application;
};

export default mapNameFields;
