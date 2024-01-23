import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';
import { aboutGoodsOrServicesPage } from '../../pages/insurance/export-contract';
import {
  countryInput,
  noRadio,
  yesRadio,
} from '../../pages/shared';
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
 * completeAndSubmitAboutGoodsOrServicesForm
 * Complete and submit the "About goods or services" form
 * @param {Boolean} description: description value
 * @param {Boolean} finalDestinationKnown: flag for if the final destination is known
 * @param {Boolean} includeFinalDestination: flag for if the final destination should be included.
 */
const completeAndSubmitAboutGoodsOrServicesForm = ({
  description = application.EXPORT_CONTRACT[DESCRIPTION],
  finalDestinationKnown = true,
  includeFinalDestination = true,
}) => {
  cy.keyboardInput(aboutGoodsOrServicesPage[DESCRIPTION].textarea(), description);

  if (finalDestinationKnown) {
    yesRadio().input().click();

    if (includeFinalDestination) {
      cy.keyboardInput(countryInput.field(FINAL_DESTINATION).input(), COUNTRY_APPLICATION_SUPPORT.ONLINE.NAME);
    }
  } else {
    noRadio().input().click();
  }

  // cy.clickSubmitButton();
};

export default completeAndSubmitAboutGoodsOrServicesForm;
