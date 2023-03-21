import { POLICY_AND_EXPORTS_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import { FIELD_IDS, ROUTES } from '../../../../constants';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import formatDate from '../../../date/format-date';
import changeLink from '../change-link';
import generateChangeLink from '../../../generate-change-link';
import { ApplicationPolicyAndExport, SummaryListItemData } from '../../../../../types';

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      TYPE_OF_POLICY: { POLICY_TYPE },
      CONTRACT_POLICY: { REQUESTED_START_DATE },
    },
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: { TYPE_OF_POLICY_CHANGE, TYPE_OF_POLICY_CHECK_AND_CHANGE },
  },
} = ROUTES;

/**
 * generatePolicyAndDateFields
 * Create all policy and date fields and values for the Insurance - Type of policy govukSummaryList
 * @param {Object} All submitted policy and export data
 * @param {Boolean} checkAndChange true if coming from check your answers section in submit application section
 * @returns {Object} All policy and date fields and values in an object structure for GOVUK summary list structure
 */
const generatePolicyAndDateFields = (answers: ApplicationPolicyAndExport, referenceNumber: number, checkAndChange: boolean) => {
  const fields = [
    fieldGroupItem({
      field: getFieldById(FIELDS, POLICY_TYPE),
      data: answers,
      href: generateChangeLink(TYPE_OF_POLICY_CHANGE, TYPE_OF_POLICY_CHECK_AND_CHANGE, '#heading', referenceNumber, checkAndChange),
      renderChangeLink: true,
    }),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.CONTRACT_POLICY, REQUESTED_START_DATE),
        ...changeLink(answers[POLICY_TYPE], referenceNumber, REQUESTED_START_DATE, checkAndChange),
      },
      formatDate(answers[REQUESTED_START_DATE]),
    ),
  ] as Array<SummaryListItemData>;

  return fields;
};

export default generatePolicyAndDateFields;
