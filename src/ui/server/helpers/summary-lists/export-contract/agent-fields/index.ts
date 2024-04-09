import { FORM_TITLES } from '../../../../content-strings';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import FIELD_IDS from '../../../../constants/field-ids/insurance/export-contract';
import { EXPORT_CONTRACT as EXPORT_CONTRACT_ROUTES } from '../../../../constants/routes/insurance/export-contract';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import mapYesNoField from '../../../mappings/map-yes-no-field';
import generateChangeLink from '../../../generate-change-link';
import replaceNewLineWithLineBreak from '../../../replace-new-line-with-line-break';
import { ApplicationExportContractAgent, SummaryListItemData } from '../../../../../types';

const {
  EXPORT_CONTRACT: { AGENT: FORM_TITLE },
} = FORM_TITLES;

const {
  USING_AGENT,
  AGENT_DETAILS: { NAME, FULL_ADDRESS, COUNTRY_CODE },
} = FIELD_IDS;

const { AGENT_CHANGE, AGENT_CHECK_AND_CHANGE, AGENT_DETAILS_CHANGE, AGENT_DETAILS_CHECK_AND_CHANGE } = EXPORT_CONTRACT_ROUTES;

/**
 * agentDetailsFields
 * Create all fields and values for the Insurance - "Export contract - agent details" govukSummaryList
 * @param {ApplicationExportContractAgent} answers: All submitted agent data
 * @param {Number} referenceNumber: Application reference number
 * @param {Boolean} checkAndChange: True if coming from check your answers section in submit application section
 * @returns {Array<SummaryListItemData>} Agent details fields
 */
export const agentDetailsFields = (answers: ApplicationExportContractAgent, referenceNumber: number, checkAndChange: boolean) => {
  const fields = [
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.AGENT_DETAILS, NAME),
        data: answers,
        href: generateChangeLink(
          AGENT_DETAILS_CHANGE,
          AGENT_DETAILS_CHECK_AND_CHANGE,
          `#${NAME}-label`,
          referenceNumber,
          checkAndChange,
        ),
        renderChangeLink: true,
      },
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.AGENT_DETAILS, FULL_ADDRESS),
        data: answers,
        href: generateChangeLink(
          AGENT_DETAILS_CHANGE,
          AGENT_DETAILS_CHECK_AND_CHANGE,
          `#${FULL_ADDRESS}-label`,
          referenceNumber,
          checkAndChange,
        ),
        renderChangeLink: true,
      },
      replaceNewLineWithLineBreak(answers[FULL_ADDRESS]),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.AGENT_DETAILS, COUNTRY_CODE),
        data: answers,
        href: generateChangeLink(
          AGENT_DETAILS_CHANGE,
          AGENT_DETAILS_CHECK_AND_CHANGE,
          `#${COUNTRY_CODE}-label`,
          referenceNumber,
          checkAndChange,
        ),
        renderChangeLink: true,
      },
    ),
  ];

  return fields;
};

/**
 * agentFields
 * Create all fields and values for the Insurance - "Export contract - agent" govukSummaryList
 * @param {ApplicationExportContractAgent} answers: All submitted agent data
 * @param {Number} referenceNumber: Application reference number
 * @param {Boolean} checkAndChange: True if coming from check your answers section in submit application section
 * @returns {Object} Fields and values in an object structure for GOVUK summary list structure
 */
const agentFields = (answers: ApplicationExportContractAgent, referenceNumber: number, checkAndChange: boolean) => {
  let fields = [
    fieldGroupItem(
      {
        field: getFieldById(FIELDS, USING_AGENT),
        data: answers,
        href: generateChangeLink(AGENT_CHANGE, AGENT_CHECK_AND_CHANGE, `#${USING_AGENT}-label`, referenceNumber, checkAndChange),
        renderChangeLink: true,
      },
      mapYesNoField(answers[USING_AGENT]),
    ),
  ] as Array<SummaryListItemData>;

  if (answers[USING_AGENT]) {
    fields = [
      ...fields,
      ...agentDetailsFields(answers, referenceNumber, checkAndChange),
    ];
  }

  return {
    title: FORM_TITLE,
    fields,
  };
};

export default agentFields;
