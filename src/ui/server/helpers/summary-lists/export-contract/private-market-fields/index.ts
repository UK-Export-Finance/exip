import { FORM_TITLES } from '../../../../content-strings';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import FIELD_IDS from '../../../../constants/field-ids/insurance/export-contract';
import { EXPORT_CONTRACT as EXPORT_CONTRACT_ROUTES } from '../../../../constants/routes/insurance/export-contract';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import mapYesNoField from '../../../mappings/map-yes-no-field';
import generateChangeLink from '../../../generate-change-link';
import replaceNewLineWithLineBreak from '../../../replace-new-line-with-line-break';
import { ApplicationPrivateMarket, SummaryListItemData } from '../../../../../types';

const {
  EXPORT_CONTRACT: { PRIVATE_MARKET: FORM_TITLE },
} = FORM_TITLES;

const {
  PRIVATE_MARKET: { ATTEMPTED, DECLINED_DESCRIPTION },
} = FIELD_IDS;

const { PRIVATE_MARKET_CHANGE, PRIVATE_MARKET_CHECK_AND_CHANGE } = EXPORT_CONTRACT_ROUTES;
const { DECLINED_BY_PRIVATE_MARKET_CHANGE, DECLINED_BY_PRIVATE_MARKET_CHECK_AND_CHANGE } = EXPORT_CONTRACT_ROUTES;

/**
 * generatePrivateMarketFields
 * Create all fields and values for the Insurance - "Export contract - private market" govukSummaryList
 * @param {ApplicationPrivateMarket} answers: All submitted private market data
 * @param {Number} referenceNumber: Application reference number
 * @param {Array<Country>} countries: Countries
 * @param {Boolean} checkAndChange: True if coming from check your answers section in submit application section
 * @returns {Object} Fields and values in an object structure for GOVUK summary list structure
 */
const generatePrivateMarketFields = (answers: ApplicationPrivateMarket, referenceNumber: number, checkAndChange: boolean) => {
  const fields = [
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.PRIVATE_MARKET, ATTEMPTED),
        data: answers,
        href: generateChangeLink(PRIVATE_MARKET_CHANGE, PRIVATE_MARKET_CHECK_AND_CHANGE, `#${ATTEMPTED}-label`, referenceNumber, checkAndChange),
        renderChangeLink: true,
      },
      mapYesNoField(answers[ATTEMPTED]),
    ),
  ] as Array<SummaryListItemData>;

  if (answers[ATTEMPTED]) {
    fields.push(
      fieldGroupItem(
        {
          field: getFieldById(FIELDS.PRIVATE_MARKET, DECLINED_DESCRIPTION),
          data: answers,
          href: generateChangeLink(
            DECLINED_BY_PRIVATE_MARKET_CHANGE,
            DECLINED_BY_PRIVATE_MARKET_CHECK_AND_CHANGE,
            `#${DECLINED_DESCRIPTION}-label`,
            referenceNumber,
            checkAndChange,
          ),
          renderChangeLink: true,
        },
        replaceNewLineWithLineBreak(answers[DECLINED_DESCRIPTION]),
      ),
    );
  }

  return {
    title: FORM_TITLE,
    fields,
  };
};

export default generatePrivateMarketFields;
