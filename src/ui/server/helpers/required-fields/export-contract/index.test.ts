import requiredFields, { getAboutGoodsOrServicesTasks, privateCoverTasks, agentServiceChargeTasks, agentTasks, awardMethodTasks } from '.';
import { EXPORT_CONTRACT_AWARD_METHOD, FIELD_VALUES } from '../../../constants';
import FIELD_IDS from '../../../constants/field-ids/insurance/export-contract';
import { mockApplication } from '../../../test-mocks';

const {
  EXPORT_CONTRACT: { AGENT_SERVICE_CHARGE_METHOD },
} = FIELD_VALUES;

const {
  HOW_WAS_THE_CONTRACT_AWARDED: { AWARD_METHOD, OTHER_AWARD_METHOD },
  ABOUT_GOODS_OR_SERVICES,
  HOW_WILL_YOU_GET_PAID: { PAYMENT_TERMS_DESCRIPTION },
  PRIVATE_MARKET: { ATTEMPTED, DECLINED_DESCRIPTION },
  USING_AGENT,
  AGENT_DETAILS: { AGENT_NAME, AGENT_FULL_ADDRESS, AGENT_COUNTRY_CODE },
  AGENT_SERVICE: { IS_CHARGING, SERVICE_DESCRIPTION },
  AGENT_CHARGES: { FIXED_SUM_AMOUNT, FIXED_SUM_CURRENCY_CODE, METHOD, PAYABLE_COUNTRY_CODE, PERCENTAGE_CHARGE },
} = FIELD_IDS;

describe('server/helpers/required-fields/export-contract', () => {
  const {
    exportContract: {
      finalDestinationKnown,
      privateMarket: { attempted: attemptedPrivateMarketCover },
      agent: { isUsingAgent },
      awardMethod: { id: awardMethodId },
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
    describe('when totalContractValueOverThreshold=true', () => {
      describe('when attemptedPrivateMarketCover=true', () => {
        it(`should return an array with ${DECLINED_DESCRIPTION} field ID`, () => {
          const result = privateCoverTasks({ totalContractValueOverThreshold: false, attemptedPrivateMarketCover: true });

          expect(result).toEqual([DECLINED_DESCRIPTION]);
        });
      });

      describe('when attemptedPrivateMarketCover=false', () => {
        it(`should return an array with ${DECLINED_DESCRIPTION} field ID`, () => {
          const result = privateCoverTasks({ totalContractValueOverThreshold: true, attemptedPrivateMarketCover: false });

          expect(result).toEqual([ATTEMPTED]);
        });
      });
    });
  });

  describe('agentServiceChargeTasks', () => {
    describe(`when agentIsCharging is true and ${METHOD} is ${AGENT_SERVICE_CHARGE_METHOD.FIXED_SUM}`, () => {
      it('should return an array with required agent service charge field IDs', () => {
        const result = agentServiceChargeTasks({
          agentIsCharging: true,
          agentChargeMethod: AGENT_SERVICE_CHARGE_METHOD.FIXED_SUM,
        });

        const expected = [METHOD, PAYABLE_COUNTRY_CODE, FIXED_SUM_AMOUNT, FIXED_SUM_CURRENCY_CODE];

        expect(result).toEqual(expected);
      });
    });

    describe(`when agentIsCharging is true and ${METHOD} is ${AGENT_SERVICE_CHARGE_METHOD.PERCENTAGE}`, () => {
      it('should return an array with required agent service charge field IDs', () => {
        const result = agentServiceChargeTasks({
          agentIsCharging: true,
          agentChargeMethod: AGENT_SERVICE_CHARGE_METHOD.PERCENTAGE,
        });

        const expected = [METHOD, PAYABLE_COUNTRY_CODE, PERCENTAGE_CHARGE];

        expect(result).toEqual(expected);
      });
    });

    describe(`when agentIsCharging is false and ${METHOD} is NOT provided`, () => {
      it('should return an array with required agent service charge field IDs', () => {
        const result = agentServiceChargeTasks({ agentIsCharging: true });

        const expected = [METHOD, PAYABLE_COUNTRY_CODE];

        expect(result).toEqual(expected);
      });
    });

    describe('when agentIsCharging is false', () => {
      it('should return an empty array', () => {
        const result = agentServiceChargeTasks({ agentIsCharging: false });

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

  describe('awardMethodTasks', () => {
    describe(`when awardMethod is ${EXPORT_CONTRACT_AWARD_METHOD.OTHER.DB_ID}`, () => {
      it('should return an array with required field IDs', () => {
        const result = awardMethodTasks(EXPORT_CONTRACT_AWARD_METHOD.OTHER.DB_ID);

        const expected = [AWARD_METHOD, OTHER_AWARD_METHOD];

        expect(result).toEqual(expected);
      });
    });

    describe(`when awardMethod is NOT ${EXPORT_CONTRACT_AWARD_METHOD.OTHER.DB_ID}`, () => {
      it(`should return an array with ${AWARD_METHOD} field ID`, () => {
        const result = awardMethodTasks(EXPORT_CONTRACT_AWARD_METHOD.COMPETITIVE_BIDDING.DB_ID);

        const expected = [AWARD_METHOD];

        expect(result).toEqual(expected);
      });
    });
  });

  describe('requiredFields', () => {
    it('should return array of required fields', () => {
      const result = requiredFields({
        totalContractValueOverThreshold: true,
        finalDestinationKnown,
        attemptedPrivateMarketCover,
        isUsingAgent,
      });

      const expected = [
        PAYMENT_TERMS_DESCRIPTION,
        ...getAboutGoodsOrServicesTasks(finalDestinationKnown),
        ...privateCoverTasks({
          totalContractValueOverThreshold: true,
          attemptedPrivateMarketCover,
        }),
        ...agentTasks({ isUsingAgent }),
        ...awardMethodTasks(awardMethodId),
      ];

      expect(result).toEqual(expected);
    });
  });
});
