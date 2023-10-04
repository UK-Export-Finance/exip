import { YOUR_BUYER as FIELD_IDS } from '../../../constants/field-ids/insurance/your-buyer';
import { field, yesRadioInput, noRadioInput } from '../../shared';

const {
  COMPANY_OR_ORGANISATION: { CAN_CONTACT_BUYER },
} = FIELD_IDS;

const companyOrOrganisation = {
  [CAN_CONTACT_BUYER]: {
    ...field(CAN_CONTACT_BUYER),
    yesRadioInput: () => yesRadioInput().first(),
    noRadioInput: () => noRadioInput().first(),
  },
};

export default companyOrOrganisation;
