import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';
import { field } from '../../pages/shared';
import application from '../../fixtures/application';

const {
  EXPORT_CONTRACT: {
    PRIVATE_MARKET: { DECLINED_DESCRIPTION: FIELD_ID },
  },
} = INSURANCE_FIELD_IDS;

/**
 * completeDeclinedByPrivateMarketForm
 * Complete the "Why were you declined by the private market" form
 * @param {String} declinedDescription: Description value
 */
const completeDeclinedByPrivateMarketForm = ({
  declinedDescription = application.EXPORT_CONTRACT.PRIVATE_MARKET[FIELD_ID],
}) => {
  cy.keyboardInput(field(FIELD_ID).textarea(), declinedDescription);
};

export default completeDeclinedByPrivateMarketForm;
