import { FIELDS } from '../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { ROUTES } from '../../../../constants';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import { generateAddressHTML } from '../../company-house-summary-list';
import { ApplicationExporterBusiness, SummaryListItemData } from '../../../../../types';

const { EXPORTER_BUSINESS: FIELD_IDS } = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    INSURANCE_ROOT,
    EXPORTER_BUSINESS: { BROKER_CHANGE },
  },
} = ROUTES;

const {
  BROKER: { USING_BROKER, NAME, ADDRESS_LINE_1, ADDRESS_LINE_2, TOWN, COUNTY, POSTCODE, EMAIL },
} = FIELD_IDS;

/**
 * optionalBrokerFields
 * if yes selected for broker, populates and returns optional fields in an array
 * @param {ApplicationExporterBusiness} answers
 * @param {Number} referenceNumber
 * @returns {Array<SummaryListItemData>} optional broker fields if yes selected
 */
const optionalBrokerFields = (answers: ApplicationExporterBusiness, referenceNumber: number) => {
  let fields = [] as Array<SummaryListItemData>;

  // if yes selected then will populate optional fields, else will return empty array
  if (answers[USING_BROKER] === 'Yes') {
    // address for HTML mapping
    const address = {
      [ADDRESS_LINE_1]: answers[ADDRESS_LINE_1],
      [ADDRESS_LINE_2]: answers[ADDRESS_LINE_2],
      [TOWN]: answers[TOWN],
      [COUNTY]: answers[COUNTY],
      [POSTCODE]: answers[POSTCODE],
    };

    fields = [
      fieldGroupItem({
        field: getFieldById(FIELDS.BROKER, NAME),
        data: answers,
        href: `${INSURANCE_ROOT}/${referenceNumber}${BROKER_CHANGE}#${NAME}-label`,
        renderChangeLink: true,
      }),
      fieldGroupItem(
        {
          field: getFieldById(FIELDS.BROKER, ADDRESS_LINE_1),
          data: answers,
          href: `${INSURANCE_ROOT}/${referenceNumber}${BROKER_CHANGE}#${ADDRESS_LINE_1}-label`,
          renderChangeLink: true,
        },
        generateAddressHTML(address),
      ),
      fieldGroupItem({
        field: getFieldById(FIELDS.BROKER, EMAIL),
        data: answers,
        href: `${INSURANCE_ROOT}/${referenceNumber}${BROKER_CHANGE}#${EMAIL}-label`,
        renderChangeLink: true,
      }),
    ];
  }

  return fields;
};

/**
 * generateBrokerFields
 * Create all your broker fields and values for the Insurance - Broker govukSummaryList
 * @param {ApplicationExporterBusiness} answers exporter broker
 * @returns {Object} All broker fields and values in an object structure for GOVUK summary list structure
 */
const generateBrokerFields = (answers: ApplicationExporterBusiness, referenceNumber: number) => {
  const fields = [
    fieldGroupItem({
      field: getFieldById(FIELDS.BROKER, USING_BROKER),
      data: answers,
      href: `${INSURANCE_ROOT}/${referenceNumber}${BROKER_CHANGE}#${USING_BROKER}-label`,
      renderChangeLink: true,
    }),
    ...optionalBrokerFields(answers, referenceNumber),
  ] as Array<SummaryListItemData>;

  return fields;
};

export { generateBrokerFields, optionalBrokerFields };
