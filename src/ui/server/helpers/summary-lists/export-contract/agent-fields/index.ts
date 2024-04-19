import { FORM_TITLES } from '../../../../content-strings';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import FIELD_IDS from '../../../../constants/field-ids/insurance/export-contract';
import { EXPORT_CONTRACT as EXPORT_CONTRACT_ROUTES } from '../../../../constants/routes/insurance/export-contract';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import mapYesNoField from '../../../mappings/map-yes-no-field';
import mapPercentage from '../../../map-percentage';
import getCountryByIsoCode from '../../../get-country-by-iso-code';
import generateChangeLink from '../../../generate-change-link';
import replaceNewLineWithLineBreak from '../../../replace-new-line-with-line-break';
import { ApplicationExportContractAgent, ApplicationExportContractAgentService, Country, SummaryListItemData } from '../../../../../types';

const {
  EXPORT_CONTRACT: { AGENT: FORM_TITLE },
} = FORM_TITLES;

const {
  USING_AGENT,
  AGENT_DETAILS: { NAME, FULL_ADDRESS, COUNTRY_CODE },
  AGENT_SERVICE: { SERVICE_DESCRIPTION, IS_CHARGING },
  AGENT_CHARGES: { FIXED_SUM_AMOUNT, CHARGE_PERCENTAGE, PAYABLE_COUNTRY_CODE },
} = FIELD_IDS;

const {
  AGENT_CHANGE,
  AGENT_CHECK_AND_CHANGE,
  AGENT_DETAILS_CHANGE,
  AGENT_DETAILS_CHECK_AND_CHANGE,
  AGENT_SERVICE_CHANGE,
  AGENT_SERVICE_CHECK_AND_CHANGE,
  AGENT_CHARGES_CHANGE,
  AGENT_CHARGES_CHECK_AND_CHANGE,
} = EXPORT_CONTRACT_ROUTES;

/**
 * agentDetailsFields
 * Create all fields and values for the Insurance - "Export contract - agent details" govukSummaryList
 * @param {ApplicationExportContractAgent} answers: All submitted agent data
 * @param {Number} referenceNumber: Application reference number
 * @param {Array} countries: Countries
 * @param {Boolean} checkAndChange: True if coming from check your answers section in submit application section
 * @returns {Array<SummaryListItemData>} Agent details fields
 */
export const agentDetailsFields = (answers: ApplicationExportContractAgent, referenceNumber: number, countries: Array<Country>, checkAndChange: boolean) => {
  const fields = [
    fieldGroupItem({
      field: getFieldById(FIELDS.AGENT_DETAILS, NAME),
      data: answers,
      href: generateChangeLink(AGENT_DETAILS_CHANGE, AGENT_DETAILS_CHECK_AND_CHANGE, `#${NAME}-label`, referenceNumber, checkAndChange),
      renderChangeLink: true,
    }),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.AGENT_DETAILS, FULL_ADDRESS),
        data: answers,
        href: generateChangeLink(AGENT_DETAILS_CHANGE, AGENT_DETAILS_CHECK_AND_CHANGE, `#${FULL_ADDRESS}-label`, referenceNumber, checkAndChange),
        renderChangeLink: true,
      },
      replaceNewLineWithLineBreak(answers[FULL_ADDRESS]),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.AGENT_DETAILS, COUNTRY_CODE),
        data: answers,
        href: generateChangeLink(AGENT_DETAILS_CHANGE, AGENT_DETAILS_CHECK_AND_CHANGE, `#${COUNTRY_CODE}-label`, referenceNumber, checkAndChange),
        renderChangeLink: true,
      },
      getCountryByIsoCode(countries, answers[COUNTRY_CODE]).name,
    ),
  ];

  return fields;
};

/**
 * agentServiceFields
 * Create all fields and values for the Insurance - "Export contract - agent service" govukSummaryList
 * @param {ApplicationExportContractAgentService} answers: All submitted agent data
 * @param {Number} referenceNumber: Application reference number
 * @param {Boolean} checkAndChange: True if coming from check your answers section in submit application section
 * @returns {Array<SummaryListItemData>} Agent service fields
 */
export const agentServiceFields = (answers: ApplicationExportContractAgentService, referenceNumber: number, checkAndChange: boolean) => {
  const fields = [
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.AGENT_SERVICE, SERVICE_DESCRIPTION),
        data: answers,
        href: generateChangeLink(AGENT_SERVICE_CHANGE, AGENT_SERVICE_CHECK_AND_CHANGE, `#${SERVICE_DESCRIPTION}-label`, referenceNumber, checkAndChange),
        renderChangeLink: true,
      },
      replaceNewLineWithLineBreak(answers[SERVICE_DESCRIPTION]),
    ),
  ];

  return fields;
};

/**
 * agentServiceChargeFields
 * Create all fields and values for the Insurance - "Export contract - agent charges" govukSummaryList
 * @param {ApplicationExportContractAgentService} answers: All submitted agent data
 * @param {Number} referenceNumber: Application reference number
 * @param {Array} countries: Countries
 * @param {Boolean} checkAndChange: True if coming from check your answers section in submit application section
 * @returns {Array<SummaryListItemData>} Agent charges fields
 */
export const agentServiceChargeFields = (
  answers: ApplicationExportContractAgentService,
  referenceNumber: number,
  countries: Array<Country>,
  checkAndChange: boolean,
) => {
  const fields = [
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.AGENT_SERVICE, IS_CHARGING),
        data: answers,
        href: generateChangeLink(AGENT_SERVICE_CHANGE, AGENT_SERVICE_CHECK_AND_CHANGE, `#${IS_CHARGING}-label`, referenceNumber, checkAndChange),
        renderChangeLink: true,
      },
      mapYesNoField(answers[IS_CHARGING]),
    ),
  ];

  if (answers[IS_CHARGING]) {
    if (answers.charge[FIXED_SUM_AMOUNT]) {
      fields.push(
        fieldGroupItem({
          field: getFieldById(FIELDS.AGENT_CHARGES, FIXED_SUM_AMOUNT),
          data: answers.charge,
          href: generateChangeLink(AGENT_CHARGES_CHANGE, AGENT_CHARGES_CHECK_AND_CHANGE, `#${FIXED_SUM_AMOUNT}-label`, referenceNumber, checkAndChange),
          renderChangeLink: true,
        }),
      );
    }

    if (answers.charge[CHARGE_PERCENTAGE]) {
      fields.push(
        fieldGroupItem(
          {
            field: getFieldById(FIELDS.AGENT_CHARGES, CHARGE_PERCENTAGE),
            data: answers.charge,
            href: generateChangeLink(AGENT_CHARGES_CHANGE, AGENT_CHARGES_CHECK_AND_CHANGE, `#${CHARGE_PERCENTAGE}-label`, referenceNumber, checkAndChange),
            renderChangeLink: true,
          },
          mapPercentage(answers.charge[CHARGE_PERCENTAGE]),
        ),
      );
    }

    fields.push(
      fieldGroupItem(
        {
          field: getFieldById(FIELDS.AGENT_CHARGES, PAYABLE_COUNTRY_CODE),
          data: answers.charge,
          href: generateChangeLink(AGENT_CHARGES_CHANGE, AGENT_CHARGES_CHECK_AND_CHANGE, `#${PAYABLE_COUNTRY_CODE}-label`, referenceNumber, checkAndChange),
          renderChangeLink: true,
        },
        getCountryByIsoCode(countries, answers.charge[PAYABLE_COUNTRY_CODE]).name,
      ),
    );
  }

  return fields;
};

/**
 * agentFields
 * Create all fields and values for the Insurance - "Export contract - agent" govukSummaryList
 * @param {ApplicationExportContractAgent} answers: All submitted agent data
 * @param {Number} referenceNumber: Application reference number
 * @param {Array} countries: Countries
 * @param {Boolean} checkAndChange: True if coming from check your answers section in submit application section
 * @returns {Object} Fields and values in an object structure for GOVUK summary list structure
 */
const agentFields = (answers: ApplicationExportContractAgent, referenceNumber: number, countries: Array<Country>, checkAndChange: boolean) => {
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
      ...agentDetailsFields(answers, referenceNumber, countries, checkAndChange),
      ...agentServiceFields(answers.service, referenceNumber, checkAndChange),
      ...agentServiceChargeFields(answers.service, referenceNumber, countries, checkAndChange),
    ];
  }

  return {
    title: FORM_TITLE,
    fields,
  };
};

export default agentFields;
