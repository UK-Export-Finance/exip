import { POLICY_FIELDS as FIELDS } from '../../../../../content-strings/fields/insurance';
import POLICY_FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import fieldGroupItem from '../../../generate-field-group-item';
import getFieldById from '../../../../get-field-by-id';
import generateChangeLink from '../../../../generate-change-link';
import mapYesNoField from '../../../../mappings/map-yes-no-field';
import { ApplicationPolicy } from '../../../../../../types';

const { NEED_PRE_CREDIT_PERIOD, CREDIT_PERIOD_WITH_BUYER } = POLICY_FIELD_IDS;

const {
  POLICY: { PRE_CREDIT_PERIOD_CHANGE, PRE_CREDIT_PERIOD_CHECK_AND_CHANGE },
} = INSURANCE_ROUTES;

/**
 * generatePreCreditPeriodFields
 * if yes is selected for NEED_PRE_CREDIT_PERIOD, populates additional CREDIT_PERIOD_WITH_BUYER field.
 * @param {ApplicationPolicy} answers: Application policy answers
 * @param {Number} referenceNumber: Application reference number
 * @param {Boolean} checkAndChange true if coming from check your answers section in submit application section
 * @returns {Array<SummaryListItemData>}
 */
const generatePreCreditPeriodFields = (answers: ApplicationPolicy, referenceNumber: number, checkAndChange: boolean) => {
  const fields = [
    fieldGroupItem(
      {
        field: getFieldById(FIELDS, NEED_PRE_CREDIT_PERIOD),
        href: generateChangeLink(
          PRE_CREDIT_PERIOD_CHANGE,
          PRE_CREDIT_PERIOD_CHECK_AND_CHANGE,
          `#${NEED_PRE_CREDIT_PERIOD}-label`,
          referenceNumber,
          checkAndChange,
        ),
        renderChangeLink: true,
      },
      mapYesNoField(answers[NEED_PRE_CREDIT_PERIOD]),
    ),
  ];

  if (answers[NEED_PRE_CREDIT_PERIOD]) {
    fields.push(
      fieldGroupItem(
        {
          field: getFieldById(FIELDS, CREDIT_PERIOD_WITH_BUYER),
          href: generateChangeLink(
            PRE_CREDIT_PERIOD_CHANGE,
            PRE_CREDIT_PERIOD_CHECK_AND_CHANGE,
            `#${CREDIT_PERIOD_WITH_BUYER}-label`,
            referenceNumber,
            checkAndChange,
          ),
          renderChangeLink: true,
        },
        answers[CREDIT_PERIOD_WITH_BUYER],
      ),
    );
  }

  return fields;
};

export default generatePreCreditPeriodFields;
