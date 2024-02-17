import { YOUR_BUYER as FIELD_IDS } from '../../../constants/field-ids/insurance/your-buyer';
import { field, yesNoRadioHint } from '../../shared';

const {
  COMPANY_OR_ORGANISATION: { COUNTRY, CAN_CONTACT_BUYER },
} = FIELD_IDS;

const companyOrOrganisation = {
  [COUNTRY]: () => cy.get(`[data-cy="${COUNTRY}"]`),
  [CAN_CONTACT_BUYER]: {
    ...field(CAN_CONTACT_BUYER),
    yesNoRadioHint,
  },
};

export default companyOrOrganisation;
