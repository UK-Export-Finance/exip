import FIELD_IDS from '../../constants/field-ids/insurance/export-contract';
import { aboutGoodsOrServicesPage } from '../../pages/insurance/export-contract';
import { autoCompleteField } from '../../pages/shared';
import application from '../../fixtures/application';
import { COUNTRY_APPLICATION_SUPPORT } from '../../fixtures/countries';

const {
  ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION },
} = FIELD_IDS;

/**
 * completeAboutGoodsOrServicesForm
 * Complete the "About goods or services" form
 * @param {Boolean} description: description value
 * @param {String} finalDestinationKnown: flag for if the final destination is known. Defaults to false.
 * @param {Boolean} includeFinalDestination: flag for if the final destination should be included. Defaults to true.
 */
const completeAboutGoodsOrServicesForm = ({
  description = application.EXPORT_CONTRACT[DESCRIPTION],
  finalDestinationKnown = false,
  includeFinalDestination = true,
}) => {
  cy.keyboardInput(aboutGoodsOrServicesPage[DESCRIPTION].textarea(), description);

  if (finalDestinationKnown) {
    cy.clickYesRadioInput();

    if (includeFinalDestination) {
      cy.keyboardInput(autoCompleteField(FINAL_DESTINATION).input(), COUNTRY_APPLICATION_SUPPORT.ONLINE_SUPPORT_1.NAME);
    }
  } else {
    cy.clickNoRadioInput();
  }
};

export default completeAboutGoodsOrServicesForm;
