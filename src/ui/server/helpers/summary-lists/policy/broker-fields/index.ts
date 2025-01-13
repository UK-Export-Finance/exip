import { POLICY as POLICY_FIELD_IDS } from '../../../../constants/field-ids/insurance/policy';
import ACCOUNT_FIELD_IDS from '../../../../constants/field-ids/insurance/account';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import { FORM_TITLES } from '../../../../content-strings/form-titles';
import { POLICY_FIELDS } from '../../../../content-strings/fields/insurance';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import mapYesNoField from '../../../mappings/map-yes-no-field';
import generateChangeLink from '../../../generate-change-link';
import brokerAddressField from './address-field';
import { ApplicationBroker, SummaryListItemData } from '../../../../../types';

const {
  POLICY: { BROKER: FORM_TITLE },
} = FORM_TITLES;

const {
  USING_BROKER,
  BROKER_DETAILS: { NAME },
} = POLICY_FIELD_IDS;

const { EMAIL } = ACCOUNT_FIELD_IDS;

const {
  POLICY: { BROKER_CHANGE, BROKER_CHECK_AND_CHANGE, BROKER_DETAILS_CHANGE, BROKER_DETAILS_CHECK_AND_CHANGE },
} = INSURANCE_ROUTES;

/**
 * optionalBrokerFields
 * If USING_BROKER is true, populate and return optional fields.
 * @param {ApplicationBroker} answers: Broker answers
 * @param {Number} referenceNumber: Application reference number
 * @param {Boolean} checkAndChange: True if coming from check your answers section in submit application section
 * @returns {Array<SummaryListItemData>} Optional broker fields if USING_BROKER is true
 */
export const optionalBrokerFields = (answers: ApplicationBroker, referenceNumber: number, checkAndChange?: boolean) => {
  let fields = [] as Array<SummaryListItemData>;

  /**
   * If using a broker,
   * populate optional fields.
   */
  if (answers[USING_BROKER]) {
    fields = [
      fieldGroupItem({
        field: getFieldById(POLICY_FIELDS.BROKER_DETAILS, NAME),
        data: answers,
        href: generateChangeLink(BROKER_DETAILS_CHANGE, BROKER_DETAILS_CHECK_AND_CHANGE, `#${NAME}-label`, referenceNumber, checkAndChange),
        renderChangeLink: true,
      }),
      brokerAddressField(answers, referenceNumber, checkAndChange),
      fieldGroupItem({
        field: getFieldById(POLICY_FIELDS.BROKER_DETAILS, EMAIL),
        data: answers,
        href: generateChangeLink(BROKER_DETAILS_CHANGE, BROKER_DETAILS_CHECK_AND_CHANGE, `#${EMAIL}-label`, referenceNumber, checkAndChange),
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
 * @param {Number} referenceNumber: Application reference number
 * @param {Boolean} checkAndChange: True if coming from check your answers section in submit application section
 * @returns {Object} All broker fields and values in an object structure for GOVUK summary list structure
 */
export const generateBrokerFields = (answers: ApplicationBroker, referenceNumber: number, checkAndChange?: boolean) => {
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
