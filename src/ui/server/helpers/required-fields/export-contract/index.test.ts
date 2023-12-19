import requiredFields, { getAboutGoodsOrServicesTasks } from '.';
import EXPORT_CONTRACT_FIELD_IDS from '../../../constants/field-ids/insurance/export-contract';
import { mockApplication } from '../../../test-mocks';

const { ABOUT_GOODS_OR_SERVICES } = EXPORT_CONTRACT_FIELD_IDS;

describe('server/helpers/required-fields/export-contract', () => {
  const {
    exportContract: { finalDestinationKnown },
  } = mockApplication;

  describe('getAboutGoodsOrServicesTasks', () => {
    describe('when finalDestinationKnown is true', () => {
      it('should return multiple field ids in an array', () => {
        const finalDestinationKnownFlag = true;

        const result = getAboutGoodsOrServicesTasks(finalDestinationKnownFlag);

        const expected = Object.values(ABOUT_GOODS_OR_SERVICES);

        expect(result).toEqual(expected);
      });
    });

    describe('when finalDestinationKnown is undefined', () => {
      it('should return 2 field ids in an array', () => {
        const result = getAboutGoodsOrServicesTasks();

        const expected = [ABOUT_GOODS_OR_SERVICES.DESCRIPTION, ABOUT_GOODS_OR_SERVICES.FINAL_DESTINATION_KNOWN];

        expect(result).toEqual(expected);
      });
    });
  });

  describe('requiredFields', () => {
    it('should return array of required fields', () => {
      const result = requiredFields({ finalDestinationKnown });

      const expected = getAboutGoodsOrServicesTasks(finalDestinationKnown);

      expect(result).toEqual(expected);
    });
  });
});
