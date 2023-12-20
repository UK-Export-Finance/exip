import { FIELDS } from '../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import mapYesNoField from '../../../mappings/map-yes-no-field';
import generateChangeLink from '../../../generate-change-link';
import { ApplicationBusiness, SummaryListItemData, SummaryListGroupData } from '../../../../../types';

const {
  EXPORTER_BUSINESS: { CREDIT_CONTROL_CHANGE, CREDIT_CONTROL_CHECK_AND_CHANGE },
} = INSURANCE_ROUTES;

const {
  EXPORTER_BUSINESS: { HAS_CREDIT_CONTROL },
} = INSURANCE_FIELD_IDS;

/**
 * generateCreditControlFields
 * Create all your Credit control fields and values for the Insurance - Credit control govukSummaryList
 * @param {ApplicationBusiness} answers: About your business answers
 * @param {Number} referenceNumber: Application reference number
 * @param {Boolean} checkAndChange: True if coming from check your answers section in submit application section
 * @returns {Object} All Credit control fields and values in an object structure for GOVUK summary list structure
 */
const generateCreditControlFields = (answers: ApplicationBusiness, referenceNumber: number, checkAndChange: boolean): SummaryListGroupData => {
  const fields = [
    fieldGroupItem(
      {
        field: getFieldById(FIELDS, HAS_CREDIT_CONTROL),
        data: answers,
        href: generateChangeLink(CREDIT_CONTROL_CHANGE, CREDIT_CONTROL_CHECK_AND_CHANGE, `#${HAS_CREDIT_CONTROL}-label`, referenceNumber, checkAndChange),
        renderChangeLink: true,
      },
      mapYesNoField(answers[HAS_CREDIT_CONTROL]),
    ),
  ] as Array<SummaryListItemData>;

  // TODO: content strings
  return {
    title: 'Credit control',
    fields,
  };
};

export default generateCreditControlFields;
