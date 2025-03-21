import { FORM_TITLES } from '../../../../content-strings/form-titles';
import { EXPORTER_BUSINESS_FIELDS } from '../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import formatCurrency from '../../../format-currency';
import generateTurnoverFields from '.';
import mapPercentage from '../../../map-percentage';
import generateChangeLink from '../../../generate-change-link';
import { mockBusiness, referenceNumber } from '../../../../test-mocks/mock-application';

const {
  YOUR_BUSINESS: { TURNOVER: FORM_TITLE },
} = FORM_TITLES;

const { EXPORTER_BUSINESS: FIELD_IDS } = INSURANCE_FIELD_IDS;

const {
  EXPORTER_BUSINESS: { TURNOVER_CHANGE, TURNOVER_CHECK_AND_CHANGE, TURNOVER_CURRENCY_CHANGE, TURNOVER_CURRENCY_CHECK_AND_CHANGE },
} = INSURANCE_ROUTES;

const {
  TURNOVER: { PERCENTAGE_TURNOVER, ESTIMATED_ANNUAL_TURNOVER, TURNOVER_CURRENCY_CODE },
} = FIELD_IDS;

const { TURNOVER } = EXPORTER_BUSINESS_FIELDS;

describe('server/helpers/summary-lists/your-business/turnover-fields', () => {
  const mockAnswers = mockBusiness;
  const checkAndChange = false;

  const expectedFields = [
    fieldGroupItem({
      field: getFieldById(TURNOVER, TURNOVER_CURRENCY_CODE),
      data: mockAnswers,
      href: generateChangeLink(
        TURNOVER_CURRENCY_CHANGE,
        TURNOVER_CURRENCY_CHECK_AND_CHANGE,
        `#${TURNOVER_CURRENCY_CODE}-label`,
        referenceNumber,
        checkAndChange,
      ),
      renderChangeLink: true,
    }),
    fieldGroupItem(
      {
        field: getFieldById(TURNOVER, ESTIMATED_ANNUAL_TURNOVER),
        data: mockAnswers,
        href: generateChangeLink(TURNOVER_CHANGE, TURNOVER_CHECK_AND_CHANGE, `#${ESTIMATED_ANNUAL_TURNOVER}-label`, referenceNumber, checkAndChange),
        renderChangeLink: true,
      },
      formatCurrency(Number(mockAnswers[ESTIMATED_ANNUAL_TURNOVER]), mockAnswers[TURNOVER_CURRENCY_CODE]),
    ),
    fieldGroupItem(
      {
        field: getFieldById(TURNOVER, PERCENTAGE_TURNOVER),
        data: mockAnswers,
        href: generateChangeLink(TURNOVER_CHANGE, TURNOVER_CHECK_AND_CHANGE, `#${PERCENTAGE_TURNOVER}-label`, referenceNumber, checkAndChange),
        renderChangeLink: true,
      },
      mapPercentage(mockAnswers[PERCENTAGE_TURNOVER]),
    ),
  ];

  it('should return fields and values from the submitted data/answers', () => {
    const result = generateTurnoverFields(mockAnswers, referenceNumber, checkAndChange);

    const expected = {
      title: FORM_TITLE,
      fields: expectedFields,
    };

    expect(result).toEqual(expected);
  });
});
