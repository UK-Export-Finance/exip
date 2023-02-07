import { FIELD_IDS } from '../../../constants';
import { turnover } from '../../e2e/pages/your-business';
import { submitButton } from '../../e2e/pages/shared';
import application from '../../fixtures/application';

const {
  TURNOVER: {
    ESTIMATED_ANNUAL_TURNOVER,
    PERCENTAGE_TURNOVER,
  },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

export default () => {
  turnover[ESTIMATED_ANNUAL_TURNOVER].input().clear().type(application.EXPORTER_BUSINESS[ESTIMATED_ANNUAL_TURNOVER]);
  turnover[PERCENTAGE_TURNOVER].input().clear().type(application.EXPORTER_BUSINESS[PERCENTAGE_TURNOVER]);

  submitButton().click();
};
