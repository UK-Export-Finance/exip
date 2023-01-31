import { FIELD_IDS } from '../../../constants';
import { natureOfBusiness } from '../../e2e/pages/your-business';
import { submitButton } from '../../e2e/pages/shared';
import application from '../../fixtures/application';

const {
  NATURE_OF_YOUR_BUSINESS: {
    GOODS_OR_SERVICES,
    YEARS_EXPORTING,
    EMPLOYEES_UK,
    EMPLOYEES_INTERNATIONAL,
  },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

export default () => {
  natureOfBusiness[GOODS_OR_SERVICES].input().clear().type(application.EXPORTER_BUSINESS[GOODS_OR_SERVICES]);
  natureOfBusiness[YEARS_EXPORTING].input().clear().type(application.EXPORTER_BUSINESS[YEARS_EXPORTING]);
  natureOfBusiness[EMPLOYEES_UK].input().clear().type(application.EXPORTER_BUSINESS[EMPLOYEES_UK]);
  natureOfBusiness[EMPLOYEES_INTERNATIONAL].input().clear().type(application.EXPORTER_BUSINESS[EMPLOYEES_INTERNATIONAL]);

  submitButton().click();
};
