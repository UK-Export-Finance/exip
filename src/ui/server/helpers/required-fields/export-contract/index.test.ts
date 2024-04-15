import requiredFields, { getAboutGoodsOrServicesTasks, privateCoverTasks, agentTasks } from '.';
import FIELD_IDS from '../../../constants/field-ids/insurance/export-contract';
import { mockApplication } from '../../../test-mocks';

const {
  ABOUT_GOODS_OR_SERVICES,
  HOW_WILL_YOU_GET_PAID: { PAYMENT_TERMS_DESCRIPTION },
  PRIVATE_MARKET: { ATTEMPTED, DECLINED_DESCRIPTION },
  USING_AGENT,
  AGENT_DETAILS: { AGENT_NAME, AGENT_FULL_ADDRESS, AGENT_COUNTRY_CODE },
  AGENT_SERVICE: { IS_CHARGING, SERVICE_DESCRIPTION },
} = FIELD_IDS;

describe('server/helpers/required-fields/export-contract', () => {
  const {
    exportContract: {
      finalDestinationKnown,
      privateMarket: { attempted: attemptedPrivateMarketCover },
      agent: { isUsingAgent },
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
        it(`should return an array with ${DECLINED_DESCRIPTION} field ID`, () => {
          const result = privateCoverTasks({ totalContractValueOverThreshold: true, attemptedPrivateMarketCover: true });

          expect(result).toEqual([DECLINED_DESCRIPTION]);
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

  describe('agentTasks', () => {
    describe('when isUsingAgent is true', () => {
      it('should return an array with required agent details field IDs', () => {
        const result = agentTasks({ isUsingAgent: true });

        const expected = [AGENT_NAME, AGENT_FULL_ADDRESS, AGENT_COUNTRY_CODE, IS_CHARGING, SERVICE_DESCRIPTION];

        expect(result).toEqual(expected);
      });
    });

    describe('when isUsingAgent is false', () => {
      it(`should return an array with ${USING_AGENT} field ID`, () => {
        const result = agentTasks({ isUsingAgent: false });

        const expected = [USING_AGENT];

        expect(result).toEqual(expected);
      });
    });
  });

  describe('requiredFields', () => {
    it('should return array of required fields', () => {
      const result = requiredFields({ totalContractValueOverThreshold, finalDestinationKnown, attemptedPrivateMarketCover, isUsingAgent });

      const expected = [
        PAYMENT_TERMS_DESCRIPTION,
        ...getAboutGoodsOrServicesTasks(finalDestinationKnown),
        ...privateCoverTasks({ totalContractValueOverThreshold, attemptedPrivateMarketCover }),
        ...agentTasks({ isUsingAgent }),
      ];

      expect(result).toEqual(expected);
    });
  });
});
