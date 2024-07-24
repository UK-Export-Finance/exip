import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';
import { field } from '../../pages/shared';
import application from '../../fixtures/application';

const {
  EXPORT_CONTRACT: {
    HOW_WILL_YOU_GET_PAID: { PAYMENT_TERMS_DESCRIPTION: FIELD_ID },
  },
} = INSURANCE_FIELD_IDS;

/**
 * completeHowYouWillGetPaidForm
 * Complete the "How you will get paid" form
 * @param {String} paymentTermsDescription: Description value
 */
const completeHowYouWillGetPaidForm = ({ paymentTermsDescription = application.EXPORT_CONTRACT.HOW_WILL_YOU_GET_PAID[FIELD_ID] }) => {
  cy.keyboardInput(field(FIELD_ID).textarea(), paymentTermsDescription);
};

export default completeHowYouWillGetPaidForm;
