import { FIELD_IDS } from '../../constants';
import { aboutGoodsOrServicesPage } from '../../pages/insurance/policy';
import { submitButton, countryInput } from '../../pages/shared';
import application from '../../fixtures/application';
import mockCountries from '../../fixtures/countries';

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

export default () => {
  cy.keyboardInput(aboutGoodsOrServicesPage[DESCRIPTION].textarea(), application.EXPORT_CONTRACT[DESCRIPTION]);

  cy.keyboardInput(countryInput.field(FINAL_DESTINATION).input(), mockCountries[1].name);

  submitButton().click();
};
