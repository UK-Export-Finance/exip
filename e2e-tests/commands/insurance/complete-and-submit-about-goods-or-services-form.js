import { FIELD_IDS } from '../../constants';
import { aboutGoodsOrServicesPage } from '../../pages/insurance/policy-and-export';
import { submitButton } from '../../pages/shared';
import application from '../../fixtures/application';
import mockCountries from '../../fixtures/countries';

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      ABOUT_GOODS_OR_SERVICES: {
        DESCRIPTION,
        FINAL_DESTINATION,
      },
    },
  },
} = FIELD_IDS;

export default () => {
  cy.keyboardInput(aboutGoodsOrServicesPage[DESCRIPTION].input(), application.POLICY_AND_EXPORTS[DESCRIPTION]);
  cy.keyboardInput(aboutGoodsOrServicesPage[FINAL_DESTINATION].input(), mockCountries[1].name);

  submitButton().click();
};
