import { FIELDS } from '../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { ROUTES } from '../../../../constants';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import mapPercentage from '../../../map-percentage';
import { ApplicationBusiness, SummaryListItemData } from '../../../../../types';
import generateChangeLink from '../../../generate-change-link';

const { EXPORTER_BUSINESS: FIELD_IDS } = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    EXPORTER_BUSINESS: { TURNOVER_CHANGE, TURNOVER_CHECK_AND_CHANGE },
  },
} = ROUTES;

const {
  TURNOVER: { PERCENTAGE_TURNOVER, ESTIMATED_ANNUAL_TURNOVER },
} = FIELD_IDS;

/**
 * generateTurnover
 * Create all your turnover fields and values for the Insurance - Turnover govukSummaryList
 * @param {ApplicationBusiness} answers: turnover answers
 * @param {Boolean} checkAndChange true if coming from check your answers section in submit application section
 * @returns {Object} All turnover fields and values in an object structure for GOVUK summary list structure
 */
const generateTurnoverFields = (answers: ApplicationBusiness, referenceNumber: number, checkAndChange: boolean) => {
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

  return fields;
};

export default generateTurnoverFields;
