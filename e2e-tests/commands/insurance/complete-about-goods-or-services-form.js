import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';
import { aboutGoodsOrServicesPage } from '../../pages/insurance/export-contract';
import { autoCompleteField } from '../../pages/shared';
import application from '../../fixtures/application';
import { COUNTRY_APPLICATION_SUPPORT } from '../../fixtures/countries';

const {
  EXPORT_CONTRACT: {
    ABOUT_GOODS_OR_SERVICES: {
      DESCRIPTION,
      FINAL_DESTINATION,
    },
  },
} = INSURANCE_FIELD_IDS;

/**
 * completeAboutGoodsOrServicesForm
 * Complete the "About goods or services" form
 * @param {Boolean} description: description value
 * @param {String} finalDestinationKnown: flag for if the final destination is known
 * @param {Boolean} includeFinalDestination: flag for if the final destination should be included.
 */
const completeAboutGoodsOrServicesForm = ({
  description = application.EXPORT_CONTRACT[DESCRIPTION],
  finalDestinationKnown = true,
  includeFinalDestination = true,
}) => {
  cy.keyboardInput(aboutGoodsOrServicesPage[DESCRIPTION].textarea(), description);

  if (finalDestinationKnown) {
    cy.clickYesRadioInput();

    if (includeFinalDestination) {
      cy.keyboardInput(autoCompleteField(FINAL_DESTINATION).input(), COUNTRY_APPLICATION_SUPPORT.ONLINE.NAME);
    }
  } else {
    cy.clickNoRadioInput();
  }
};

export default completeAboutGoodsOrServicesForm;
