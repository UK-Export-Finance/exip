import { FIELD_IDS } from '../../constants';
import { aboutGoodsOrServicesPage } from '../../pages/insurance/policy';
import {
  countryInput,
  submitButton,
  noRadio,
  yesRadio,
} from '../../pages/shared';
import application from '../../fixtures/application';
import { COUNTRY_APPLICATION_SUPPORT } from '../../fixtures/countries';

const {
  INSURANCE: {
    POLICY: {
      ABOUT_GOODS_OR_SERVICES: {
        DESCRIPTION,
        FINAL_DESTINATION,
      },
    },
  },
} = FIELD_IDS;

/**
 * completeAndSubmitAboutGoodsOrServicesForm
 * Complete and submit the "About goods or services" form
 * @param {Boolean} finalDestinationKnown: flag for if the final destination is known
 */
const completeAndSubmitAboutGoodsOrServicesForm = ({ finalDestinationKnown = true }) => {
  cy.keyboardInput(aboutGoodsOrServicesPage[DESCRIPTION].textarea(), application.EXPORT_CONTRACT[DESCRIPTION]);

  if (finalDestinationKnown) {
    yesRadio().input().click();

    cy.keyboardInput(countryInput.field(FINAL_DESTINATION).input(), COUNTRY_APPLICATION_SUPPORT.ONLINE.NAME);
  } else {
    noRadio().input().click();
  }

  submitButton().click();
};

export default completeAndSubmitAboutGoodsOrServicesForm;
