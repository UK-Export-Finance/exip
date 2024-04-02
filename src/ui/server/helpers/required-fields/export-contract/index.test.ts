import requiredFields, { getAboutGoodsOrServicesTasks, privateCoverTasks } from '.';
import FIELD_IDS from '../../../constants/field-ids/insurance/export-contract';
import { mockApplication } from '../../../test-mocks';

const {
  ABOUT_GOODS_OR_SERVICES,
  PRIVATE_MARKET: { ATTEMPTED, DECLINED_DESCRIPTION },
} = FIELD_IDS;

describe('server/helpers/required-fields/export-contract', () => {
  const {
    exportContract: {
      finalDestinationKnown,
      privateMarket: { attempted: attemptedPrivateMarketCover },
    },
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

  describe('privateCoverTasks', () => {
    describe('when attemptedPrivateMarketCover is true', () => {
      it(`should return ${DECLINED_DESCRIPTION} field ID`, () => {
        const attemptedPrivateMarketCoverFlag = true;

        const result = privateCoverTasks(attemptedPrivateMarketCoverFlag);

        const expected = DECLINED_DESCRIPTION;

        expect(result).toEqual(expected);
      });
    });

    describe('when attemptedPrivateMarketCover is undefined', () => {
      it(`should return ${ATTEMPTED} field ID`, () => {
        const result = privateCoverTasks();

        const expected = ATTEMPTED;

        expect(result).toEqual(expected);
      });
    });
  });

  describe('requiredFields', () => {
    it('should return array of required fields', () => {
      const result = requiredFields({ finalDestinationKnown, attemptedPrivateMarketCover });

      const expected = [...getAboutGoodsOrServicesTasks(finalDestinationKnown), privateCoverTasks(attemptedPrivateMarketCover)];

      expect(result).toEqual(expected);
    });
  });
});
