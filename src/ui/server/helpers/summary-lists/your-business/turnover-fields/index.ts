import { FIELDS } from '../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import mapPercentage from '../../../map-percentage';
import { ApplicationBusiness, SummaryListItemData, SummaryListGroupData } from '../../../../../types';
import generateChangeLink from '../../../generate-change-link';

const { EXPORTER_BUSINESS: FIELD_IDS } = INSURANCE_FIELD_IDS;

const {
  EXPORTER_BUSINESS: { TURNOVER_CHANGE, TURNOVER_CHECK_AND_CHANGE },
} = INSURANCE_ROUTES;

const {
  TURNOVER: { PERCENTAGE_TURNOVER, ESTIMATED_ANNUAL_TURNOVER },
} = FIELD_IDS;

/**
 * generateTurnover
 * Create all your Turnover fields and values for the Insurance - Turnover govukSummaryList
 * @param {ApplicationBusiness} answers: Turnover answers
 * @param {Number} referenceNumber: Application reference number
 * @param {Boolean} checkAndChange True if coming from check your answers section in submit application section
 * @returns {Object} All Turnover fields and values in an object structure for GOVUK summary list structure
 */
const generateTurnoverFields = (answers: ApplicationBusiness, referenceNumber: number, checkAndChange: boolean): SummaryListGroupData => {
  const fields = [
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.TURNOVER, ESTIMATED_ANNUAL_TURNOVER),
        data: answers,
        href: generateChangeLink(TURNOVER_CHANGE, TURNOVER_CHECK_AND_CHANGE, `#${ESTIMATED_ANNUAL_TURNOVER}-label`, referenceNumber, checkAndChange),
        renderChangeLink: true,
      },
      `£${answers[ESTIMATED_ANNUAL_TURNOVER]}`,
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.TURNOVER, PERCENTAGE_TURNOVER),
        data: answers,
        href: generateChangeLink(TURNOVER_CHANGE, TURNOVER_CHECK_AND_CHANGE, `#${PERCENTAGE_TURNOVER}-label`, referenceNumber, checkAndChange),
        renderChangeLink: true,
      },
      mapPercentage(answers[PERCENTAGE_TURNOVER]),
    ),
  ] as Array<SummaryListItemData>;

  // TODO: content strings
  return {
    title: 'Turnover',
    fields,
  };
};

export default generateTurnoverFields;
