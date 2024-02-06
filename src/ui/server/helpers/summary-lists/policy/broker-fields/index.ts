import { FORM_TITLES } from '../../../../content-strings/form-titles';
import { POLICY_FIELDS } from '../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
// import generateMultipleFieldHtml from '../../../generate-multiple-field-html';
import mapYesNoField from '../../../mappings/map-yes-no-field';
import generateChangeLink from '../../../generate-change-link';
import { ApplicationBroker, SummaryListItemData } from '../../../../../types';

const {
  POLICY: { BROKER: FORM_TITLE },
} = FORM_TITLES;

const {
  POLICY: {
    BROKER: { USING_BROKER},
    BROKER_DETAILS: { NAME, EMAIL },
  },
} = INSURANCE_FIELD_IDS;

const {
  POLICY: { BROKER_CHANGE, BROKER_CHECK_AND_CHANGE },
} = INSURANCE_ROUTES;

/**
 * optionalBrokerFields
 * if yes selected for broker, populates and returns optional fields in an array
 * @param {ApplicationBroker} answers
 * @param {Number} referenceNumber
 * @param {Boolean} checkAndChange true if coming from check your answers section in submit application section
 * @returns {Array<SummaryListItemData>} optional broker fields if yes selected
 */
const optionalBrokerFields = (answers: ApplicationBroker, referenceNumber: number, checkAndChange: boolean) => {
  let fields = [] as Array<SummaryListItemData>;

  /**
   * If using a broker,
   * populate optional fields.
   */
  if (answers[USING_BROKER]) {
    // address for HTML mapping
    // const address = {
    //   [ADDRESS_LINE_1]: answers[ADDRESS_LINE_1],
    //   [ADDRESS_LINE_2]: answers[ADDRESS_LINE_2],
    //   [TOWN]: answers[TOWN],
    //   [COUNTY]: answers[COUNTY],
    //   [POSTCODE]: answers[POSTCODE],
    // };

    fields = [
      fieldGroupItem({
        field: getFieldById(POLICY_FIELDS.BROKER, NAME),
        data: answers,
        href: generateChangeLink(BROKER_CHANGE, BROKER_CHECK_AND_CHANGE, `#${NAME}-label`, referenceNumber, checkAndChange),
        renderChangeLink: true,
      }),
      // fieldGroupItem(
      //   {
      //     field: getFieldById(POLICY_FIELDS.BROKER, ADDRESS_LINE_1),
      //     data: answers,
      //     href: generateChangeLink(BROKER_CHANGE, BROKER_CHECK_AND_CHANGE, `#${ADDRESS_LINE_1}-label`, referenceNumber, checkAndChange),
      //     renderChangeLink: true,
      //   },
      //   generateMultipleFieldHtml(address),
      // ),
      fieldGroupItem({
        field: getFieldById(POLICY_FIELDS.BROKER, EMAIL),
        data: answers,
        href: generateChangeLink(BROKER_CHANGE, BROKER_CHECK_AND_CHANGE, `#${EMAIL}-label`, referenceNumber, checkAndChange),
        renderChangeLink: true,
      }),
    ];
  }

  return fields;
};

/**
 * generateBrokerFields
 * Create all your broker fields and values for the Insurance - Broker govukSummaryList
 * @param {ApplicationBroker} answers
 * @returns {Object} All broker fields and values in an object structure for GOVUK summary list structure
 */
const generateBrokerFields = (answers: ApplicationBroker, referenceNumber: number, checkAndChange: boolean) => {
  const fields = [
    fieldGroupItem(
      {
        field: getFieldById(POLICY_FIELDS.BROKER, USING_BROKER),
        data: answers,
        href: generateChangeLink(BROKER_CHANGE, BROKER_CHECK_AND_CHANGE, `#${USING_BROKER}-label`, referenceNumber, checkAndChange),
        renderChangeLink: true,
      },
      mapYesNoField(answers[USING_BROKER]),
    ),
    ...optionalBrokerFields(answers, referenceNumber, checkAndChange),
  ] as Array<SummaryListItemData>;

  return {
    title: FORM_TITLE,
    fields,
  };
};

export { generateBrokerFields, optionalBrokerFields };
