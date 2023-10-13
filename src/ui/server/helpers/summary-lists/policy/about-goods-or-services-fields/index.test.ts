import generateAboutGoodsOrServicesFields from '.';
import { POLICY_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import { FIELD_IDS, ROUTES } from '../../../../constants';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import getCountryByIsoCode from '../../../get-country-by-iso-code';
import { mockApplication, mockCountries } from '../../../../test-mocks';
import generateChangeLink from '../../../generate-change-link';

const {
  INSURANCE: {
    POLICY: {
      ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION },
    },
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    INSURANCE_ROOT,
    POLICY: { ABOUT_GOODS_OR_SERVICES_CHANGE, ABOUT_GOODS_OR_SERVICES_CHECK_AND_CHANGE },
  },
} = ROUTES;

describe('server/helpers/summary-lists/policy/about-goods-or-services-fields', () => {
  const mockAnswers = mockApplication.policy;
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
