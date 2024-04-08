import generateAboutTheExportFields from '.';
import { FORM_TITLES } from '../../../../content-strings';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import FIELD_IDS from '../../../../constants/field-ids/insurance/export-contract';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import getCountryByIsoCode from '../../../get-country-by-iso-code';
import generateChangeLink from '../../../generate-change-link';
import replaceNewLineWithLineBreak from '../../../replace-new-line-with-line-break';
import { mockApplication, mockCountries } from '../../../../test-mocks';

const {
  ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION },
  HOW_WILL_YOU_GET_PAID: { PAYMENT_TERMS_DESCRIPTION },
} = FIELD_IDS;

const {
  EXPORT_CONTRACT: { ABOUT_THE_EXPORT: FORM_TITLE },
} = FORM_TITLES;

const {
  INSURANCE_ROOT,
  EXPORT_CONTRACT: {
    ABOUT_GOODS_OR_SERVICES_CHANGE,
    ABOUT_GOODS_OR_SERVICES_CHECK_AND_CHANGE,
    HOW_WILL_YOU_GET_PAID_CHANGE,
    HOW_WILL_YOU_GET_PAID_CHECK_AND_CHANGE,
  },
} = INSURANCE_ROUTES;

describe('server/helpers/summary-lists/export-contract/about-goods-or-services-fields', () => {
  const mockAnswers = mockApplication.exportContract;
  const { referenceNumber } = mockApplication;
  const checkAndChange = false;

  it('should return fields and values from the submitted data/answers', () => {
    const result = generateAboutTheExportFields(mockAnswers, referenceNumber, mockCountries, checkAndChange);

    const expected = {
      title: FORM_TITLE,
      fields: [
        fieldGroupItem({
          field: getFieldById(FIELDS.ABOUT_GOODS_OR_SERVICES, DESCRIPTION),
          data: mockAnswers,
          href: generateChangeLink(
            ABOUT_GOODS_OR_SERVICES_CHANGE,
            ABOUT_GOODS_OR_SERVICES_CHECK_AND_CHANGE,
            `#${DESCRIPTION}-label`,
            referenceNumber,
            checkAndChange,
          ),
          renderChangeLink: true,
        }),
        fieldGroupItem(
          {
            field: getFieldById(FIELDS.ABOUT_GOODS_OR_SERVICES, FINAL_DESTINATION),
            href: `${INSURANCE_ROOT}/${referenceNumber}${ABOUT_GOODS_OR_SERVICES_CHANGE}#${FINAL_DESTINATION}-label`,
            renderChangeLink: true,
          },
          mockAnswers[FINAL_DESTINATION] && getCountryByIsoCode(mockCountries, mockAnswers[FINAL_DESTINATION]).name,
        ),
        fieldGroupItem(
          {
            field: getFieldById(FIELDS.HOW_WILL_YOU_GET_PAID, PAYMENT_TERMS_DESCRIPTION),
            href: generateChangeLink(
              HOW_WILL_YOU_GET_PAID_CHANGE,
              HOW_WILL_YOU_GET_PAID_CHECK_AND_CHANGE,
              `#${PAYMENT_TERMS_DESCRIPTION}-label`,
              referenceNumber,
              checkAndChange,
            ),
            renderChangeLink: true,
          },
          replaceNewLineWithLineBreak(mockAnswers[PAYMENT_TERMS_DESCRIPTION]),
        ),
      ],
    };

    expect(result).toEqual(expected);
  });
});
