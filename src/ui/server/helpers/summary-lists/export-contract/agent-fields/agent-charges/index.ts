import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../../content-strings/fields/insurance';
import FIELD_IDS from '../../../../../constants/field-ids/insurance';
import { EXPORT_CONTRACT as EXPORT_CONTRACT_ROUTES } from '../../../../../constants/routes/insurance/export-contract';
import fieldGroupItem from '../../../generate-field-group-item';
import getFieldById from '../../../../get-field-by-id';
import mapYesNoField from '../../../../mappings/map-yes-no-field';
import mapPercentage from '../../../../map-percentage';
import getCountryByIsoCode from '../../../../get-country-by-iso-code';
import generateChangeLink from '../../../../generate-change-link';
import formatCurrency from '../../../../format-currency';
import { transformEmptyDecimalsToWholeNumber, numberHasDecimalPlaces } from '../../../../number';
import getCurrencyByCode from '../../../../get-currency-by-code';
import { ApplicationExportContractAgentService, Country, Currency } from '../../../../../../types';

const {
  CURRENCY: { CURRENCY_CODE },
  EXPORT_CONTRACT: {
    AGENT_SERVICE: { IS_CHARGING },
    AGENT_CHARGES: { FIXED_SUM_AMOUNT, FIXED_SUM_CURRENCY_CODE, PERCENTAGE_CHARGE, PAYABLE_COUNTRY_CODE },
  },
} = FIELD_IDS;

const {
  AGENT_CHARGES_CURRENCY_CHANGE,
  AGENT_CHARGES_CURRENCY_CHECK_AND_CHANGE,
  AGENT_CHARGES_CHANGE,
  AGENT_CHARGES_CHECK_AND_CHANGE,
  AGENT_SERVICE_CHANGE,
  AGENT_SERVICE_CHECK_AND_CHANGE,
  HOW_MUCH_THE_AGENT_IS_CHARGING_CHANGE,
  HOW_MUCH_THE_AGENT_IS_CHARGING_CHECK_AND_CHANGE,
} = EXPORT_CONTRACT_ROUTES;

/**
 * agentChargesFields
 * Create all fields and values for the Insurance - "Export contract - agent charges" govukSummaryList
 * @param {ApplicationExportContractAgentService} answers: All submitted agent data
 * @param {number} referenceNumber: Application reference number
 * @param {Array<Country>} countries: Countries
 * @param {Array<Currency>} currencies: Currencies
 * @param {boolean} checkAndChange: True if coming from check your answers section in submit application section
 * @returns {Array<SummaryListItemData>} Agent charges fields
 */
const agentChargesFields = (
  answers: ApplicationExportContractAgentService,
  referenceNumber: number,
  countries: Array<Country>,
  currencies: Array<Currency>,
  checkAndChange?: boolean,
) => {
  let fields = [
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
      /**
       * transforms the number to a whole number if it has .00 at the end
       */
      const answer = transformEmptyDecimalsToWholeNumber(answers.charge[FIXED_SUM_AMOUNT]);

      /**
       * If the number has decimal places, show 2 decimal places
       * or 0 if it's a whole number
       */
      const decimalPlaces = numberHasDecimalPlaces(answer) ? 2 : 0;

      fields = [
        ...fields,
        fieldGroupItem(
          {
            field: getFieldById(FIELDS.AGENT_CHARGES, CURRENCY_CODE),
            data: answers.charge,
            href: generateChangeLink(
              AGENT_CHARGES_CURRENCY_CHANGE,
              AGENT_CHARGES_CURRENCY_CHECK_AND_CHANGE,
              `#${CURRENCY_CODE}-label`,
              referenceNumber,
              checkAndChange,
            ),
            renderChangeLink: true,
          },
          answers.charge[FIXED_SUM_CURRENCY_CODE] && getCurrencyByCode(currencies, answers.charge[FIXED_SUM_CURRENCY_CODE]).name,
        ),
        fieldGroupItem(
          {
            field: getFieldById(FIELDS.AGENT_CHARGES, FIXED_SUM_AMOUNT),
            data: answers.charge,
            href: generateChangeLink(
              HOW_MUCH_THE_AGENT_IS_CHARGING_CHANGE,
              HOW_MUCH_THE_AGENT_IS_CHARGING_CHECK_AND_CHANGE,
              `#${FIXED_SUM_AMOUNT}-label`,
              referenceNumber,
              checkAndChange,
            ),
            renderChangeLink: true,
          },
          answers.charge[FIXED_SUM_CURRENCY_CODE] && formatCurrency(Number(answer), answers.charge[FIXED_SUM_CURRENCY_CODE], decimalPlaces),
        ),
      ];
    }

    if (answers.charge[PERCENTAGE_CHARGE]) {
      fields.push(
        fieldGroupItem(
          {
            field: getFieldById(FIELDS.AGENT_CHARGES, PERCENTAGE_CHARGE),
            data: answers.charge,
            href: generateChangeLink(AGENT_CHARGES_CHANGE, AGENT_CHARGES_CHECK_AND_CHANGE, `#${PERCENTAGE_CHARGE}-label`, referenceNumber, checkAndChange),
            renderChangeLink: true,
          },
          mapPercentage(answers.charge[PERCENTAGE_CHARGE]),
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
        answers.charge[PAYABLE_COUNTRY_CODE] && getCountryByIsoCode(countries, answers.charge[PAYABLE_COUNTRY_CODE]).name,
      ),
    );
  }

  return fields;
};

export default agentChargesFields;
