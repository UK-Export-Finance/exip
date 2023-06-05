import { FIELDS } from '../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { ROUTES } from '../../../../constants';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import { ApplicationBusinessContactDetail, SummaryListItemData } from '../../../../../types';
import generateChangeLink from '../../../generate-change-link';

const { EXPORTER_BUSINESS: FIELD_IDS } = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    EXPORTER_BUSINESS: { CONTACT_CHANGE, CONTACT_CHECK_AND_CHANGE },
  },
} = ROUTES;

const {
  CONTACT: { POSITION, NAME },
} = FIELD_IDS;

const {
  ACCOUNT: { EMAIL, FIRST_NAME, LAST_NAME },
} = INSURANCE_FIELD_IDS;

/**
 * generateBusinessContactFields
 * Create all your business contact fields and values for the Insurance - business contact govukSummaryList
 * @param {ApplicationBusiness} answers exporter business
 * @param {Boolean} checkAndChange true if coming from check your answers section in submit application section
 * @returns {Object} All business contact fields and values in an object structure for GOVUK summary list structure
 */
const generateBusinessContactFields = (answers: ApplicationBusinessContactDetail, referenceNumber: number, checkAndChange: boolean) => {
  const fields = [
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.CONTACT, NAME, 'contact'),
        data: answers,
        href: generateChangeLink(CONTACT_CHANGE, CONTACT_CHECK_AND_CHANGE, `#${FIRST_NAME}-label`, referenceNumber, checkAndChange),
        renderChangeLink: true,
      },
      `${answers[FIRST_NAME]} ${answers[LAST_NAME]}`,
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.CONTACT, EMAIL, 'contact'),
        data: answers,
        href: generateChangeLink(CONTACT_CHANGE, CONTACT_CHECK_AND_CHANGE, `#${EMAIL}-label`, referenceNumber, checkAndChange),
        renderChangeLink: true,
      },
      answers[EMAIL],
    ),
    fieldGroupItem({
      field: getFieldById(FIELDS.CONTACT, POSITION),
      data: answers,
      href: generateChangeLink(CONTACT_CHANGE, CONTACT_CHECK_AND_CHANGE, `#${POSITION}-label`, referenceNumber, checkAndChange),
      renderChangeLink: true,
    }),
  ] as Array<SummaryListItemData>;

  return fields;
};

export default generateBusinessContactFields;
