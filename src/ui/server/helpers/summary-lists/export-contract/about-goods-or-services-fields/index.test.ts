import generateAboutGoodsOrServicesFields from '.';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import getCountryByIsoCode from '../../../get-country-by-iso-code';
import { mockApplication, mockCountries } from '../../../../test-mocks';
import generateChangeLink from '../../../generate-change-link';

const {
  EXPORT_CONTRACT: {
    ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION },
  },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE_ROOT,
  EXPORT_CONTRACT: { ABOUT_GOODS_OR_SERVICES_CHANGE, ABOUT_GOODS_OR_SERVICES_CHECK_AND_CHANGE },
} = INSURANCE_ROUTES;

describe('server/helpers/summary-lists/export-contract/about-goods-or-services-fields', () => {
  const mockAnswers = mockApplication.exportContract;
  const { referenceNumber } = mockApplication;
  const checkAndChange = false;

  it('should return fields and values from the submitted data/answers', () => {
    const result = generateAboutGoodsOrServicesFields(mockAnswers, referenceNumber, mockCountries, checkAndChange);

    const expected = [
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
    ];

    expect(result).toEqual(expected);
  });
});
