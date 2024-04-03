import requiredFields, { getAboutGoodsOrServicesTasks, privateCoverTasks } from '.';
import FIELD_IDS from '../../../constants/field-ids/insurance/export-contract';
import { mockApplication } from '../../../test-mocks';

const {
  ABOUT_GOODS_OR_SERVICES,
  HOW_WILL_YOU_GET_PAID: { PAYMENT_TERMS_DESCRIPTION },
  PRIVATE_MARKET: { ATTEMPTED, DECLINED_DESCRIPTION },
} = FIELD_IDS;

describe('server/helpers/required-fields/export-contract', () => {
  const {
    exportContract: {
      finalDestinationKnown,
      privateMarket: { attempted: attemptedPrivateMarketCover },
    },
    totalContractValueOverThreshold,
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
    describe('when totalContractValueOverThreshold is true', () => {
      describe('when attemptedPrivateMarketCover is true', () => {
        it(`should return ${DECLINED_DESCRIPTION} field ID`, () => {
          const result = privateCoverTasks({ totalContractValueOverThreshold: true, attemptedPrivateMarketCover: true });

          const expected = [DECLINED_DESCRIPTION];

          expect(result).toEqual(expected);
        });
      });

      describe('when attemptedPrivateMarketCover is false', () => {
        it(`should return an array with ${ATTEMPTED} field ID`, () => {
          const result = privateCoverTasks({ totalContractValueOverThreshold: true, attemptedPrivateMarketCover: false });

          const expected = [ATTEMPTED];

          expect(result).toEqual(expected);
        });
      });

      describe('when attemptedPrivateMarketCover is undefined', () => {
        it(`should return an array with ${ATTEMPTED} field ID`, () => {
          const result = privateCoverTasks({ totalContractValueOverThreshold: true });

          const expected = [ATTEMPTED];

          expect(result).toEqual(expected);
        });
      });
    });

    describe('when totalContractValueOverThreshold is false', () => {
      it('should return an empty array', () => {
        const result = privateCoverTasks({ totalContractValueOverThreshold: false });

        expect(result).toEqual([]);
      });
    });

    describe('when totalContractValueOverThreshold is undefined', () => {
      it('should return an empty array', () => {
        const result = privateCoverTasks({});

        expect(result).toEqual([]);
      });
    });
  });

  describe('requiredFields', () => {
    it('should return array of required fields', () => {
      const result = requiredFields({ totalContractValueOverThreshold, finalDestinationKnown, attemptedPrivateMarketCover });

      const expected = [
        PAYMENT_TERMS_DESCRIPTION,
        ...getAboutGoodsOrServicesTasks(finalDestinationKnown),
        ...privateCoverTasks({ totalContractValueOverThreshold, attemptedPrivateMarketCover }),
      ];

      expect(result).toEqual(expected);
    });
  });
});
