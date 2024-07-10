import { YOUR_BUYER as FIELD_IDS } from '../../../constants/field-ids/insurance/your-buyer';

const {
  COMPANY_OR_ORGANISATION: { COUNTRY },
} = FIELD_IDS;

const companyOrOrganisation = {
  [COUNTRY]: () => cy.get(`[data-cy="${COUNTRY}"]`),
};

export default companyOrOrganisation;
