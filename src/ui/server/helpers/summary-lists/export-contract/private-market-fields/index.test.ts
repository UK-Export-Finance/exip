import generatePrivateMarketFields from '.';
import { FORM_TITLES } from '../../../../content-strings';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import FIELD_IDS from '../../../../constants/field-ids/insurance/export-contract';
import { EXPORT_CONTRACT as EXPORT_CONTRACT_ROUTES } from '../../../../constants/routes/insurance/export-contract';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import mapYesNoField from '../../../mappings/map-yes-no-field';
import generateChangeLink from '../../../generate-change-link';
import replaceNewLineWithLineBreak from '../../../replace-new-line-with-line-break';
import { mockApplication, referenceNumber } from '../../../../test-mocks';

const {
  EXPORT_CONTRACT: { PRIVATE_MARKET: FORM_TITLE },
} = FORM_TITLES;

const {
  PRIVATE_MARKET: { ATTEMPTED, DECLINED_DESCRIPTION },
} = FIELD_IDS;

const { PRIVATE_MARKET_CHANGE, PRIVATE_MARKET_CHECK_AND_CHANGE } = EXPORT_CONTRACT_ROUTES;
const { DECLINED_BY_PRIVATE_MARKET_CHANGE, DECLINED_BY_PRIVATE_MARKET_CHECK_AND_CHANGE } = EXPORT_CONTRACT_ROUTES;

describe('server/helpers/summary-lists/export-contract/private-market-fields', () => {
  const mockAnswersAttemptedTrue = {
    ...mockApplication.exportContract.privateMarket,
    [ATTEMPTED]: true,
  };

  const mockAnswersAttemptedFalse = {
    ...mockApplication.exportContract.privateMarket,
    [ATTEMPTED]: false,
  };

  const checkAndChange = false;

  describe(`when ${ATTEMPTED} is false`, () => {
    it(`should return one ${ATTEMPTED} field and value`, () => {
      const result = generatePrivateMarketFields(mockAnswersAttemptedFalse, referenceNumber, checkAndChange);

      const expected = {
        title: FORM_TITLE,
        fields: [
          fieldGroupItem(
            {
              field: getFieldById(FIELDS.PRIVATE_MARKET, ATTEMPTED),
              data: mockAnswersAttemptedFalse,
              href: generateChangeLink(PRIVATE_MARKET_CHANGE, PRIVATE_MARKET_CHECK_AND_CHANGE, `#${ATTEMPTED}-label`, referenceNumber, checkAndChange),
              renderChangeLink: true,
            },
            mapYesNoField(mockAnswersAttemptedFalse[ATTEMPTED]),
          ),
        ],
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${ATTEMPTED} is true`, () => {
    it(`should return ${ATTEMPTED} and ${DECLINED_DESCRIPTION} fields and values`, () => {
      const result = generatePrivateMarketFields(mockAnswersAttemptedTrue, referenceNumber, checkAndChange);

      const expected = {
        title: FORM_TITLE,
        fields: [
          fieldGroupItem(
            {
              field: getFieldById(FIELDS.PRIVATE_MARKET, ATTEMPTED),
              data: mockAnswersAttemptedFalse,
              href: generateChangeLink(PRIVATE_MARKET_CHANGE, PRIVATE_MARKET_CHECK_AND_CHANGE, `#${ATTEMPTED}-label`, referenceNumber, checkAndChange),
              renderChangeLink: true,
            },
            mapYesNoField(mockAnswersAttemptedFalse[ATTEMPTED]),
          ),
          fieldGroupItem(
            {
              field: getFieldById(FIELDS.PRIVATE_MARKET, DECLINED_DESCRIPTION),
              data: mockAnswersAttemptedTrue,
              href: generateChangeLink(
                DECLINED_BY_PRIVATE_MARKET_CHANGE,
                DECLINED_BY_PRIVATE_MARKET_CHECK_AND_CHANGE,
                `#${DECLINED_DESCRIPTION}-label`,
                referenceNumber,
                checkAndChange,
              ),
              renderChangeLink: true,
            },
            replaceNewLineWithLineBreak(mockAnswersAttemptedTrue[DECLINED_DESCRIPTION]),
          ),
        ],
      };

      expect(result).toEqual(expected);
    });
  });
});
