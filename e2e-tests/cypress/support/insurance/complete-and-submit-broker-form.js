import { broker } from '../../e2e/pages/your-business';
import { submitButton } from '../../e2e/pages/shared';
import { FIELD_IDS } from '../../../constants';
import application from '../../fixtures/application';

const {
  BROKER: {
    USING_BROKER,
    NAME,
    ADDRESS_LINE_1,
    ADDRESS_LINE_2,
    TOWN,
    COUNTY,
    EMAIL,
    POSTCODE,
  },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

export default () => {
  broker[USING_BROKER].yesRadioInput().click();
  broker[NAME].input().clear().type(application.EXPORTER_BROKER[NAME], { delay: 0 });
  broker[ADDRESS_LINE_1].input().clear().type(application.EXPORTER_BROKER[ADDRESS_LINE_1], { delay: 0 });
  broker[ADDRESS_LINE_2].input().clear().type(application.EXPORTER_BROKER[ADDRESS_LINE_2], { delay: 0 });
  broker[TOWN].input().clear().type(application.EXPORTER_BROKER[TOWN], { delay: 0 });
  broker[COUNTY].input().clear().type(application.EXPORTER_BROKER[COUNTY], { delay: 0 });
  broker[EMAIL].input().clear().type(application.EXPORTER_BROKER[EMAIL], { delay: 0 });
  broker[POSTCODE].input().clear().type(application.EXPORTER_BROKER[POSTCODE], { delay: 0 });

  submitButton().click();
};
