import generateAboutGoodsOrServicesFields from '.';
import { FIELDS } from '../../../../content-strings/fields/insurance';
import { FIELD_IDS } from '../../../../constants';
import fieldGroupItem from '../../generate-field-group-item';
import getCountryByIsoCode from '../../../get-country-by-iso-code';
import { mockApplication, mockCountries } from '../../../../test-mocks';

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      ABOUT_GOODS_OR_SERVICES: {
        DESCRIPTION,
        FINAL_DESTINATION,
      },
    },
  },
} = FIELD_IDS;

describe('server/helpers/summary-lists/policy-and-export/about-goods-or-services-fields', () => {
  const mockAnswers = mockApplication.policyAndExport;

  it('should return fields and values from the submitted data/answers', () => {
    const result = generateAboutGoodsOrServicesFields(mockAnswers, mockCountries );

    const expected = [
      fieldGroupItem({
        field: { id: DESCRIPTION, ...FIELDS.ABOUT_GOODS_OR_SERVICES[DESCRIPTION] },
        data: mockAnswers,
      }),
      fieldGroupItem(
        { field: { id: FINAL_DESTINATION, ...FIELDS.ABOUT_GOODS_OR_SERVICES[FINAL_DESTINATION] } },
        mockAnswers[FINAL_DESTINATION] && getCountryByIsoCode(mockCountries, mockAnswers[FINAL_DESTINATION]).name,
      ),
    ];

    expect(result).toEqual(expected);
  });
});
