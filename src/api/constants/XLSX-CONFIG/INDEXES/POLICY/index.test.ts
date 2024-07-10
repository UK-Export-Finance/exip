import POLICY_INDEXES, { DEFAULT_INDEXES } from '.';
import { FIELD_VALUES } from '../../../field-values';
import BROKER_CONDITIONS from './BROKER_CONDITIONS';
import LOSS_PAYEE_CONDITIONS from './LOSS_PAYEE_CONDITIONS';
import { mockApplication } from '../../../../test-mocks';

const {
  POLICY_TYPE: { SINGLE, MULTIPLE },
} = FIELD_VALUES;

describe('api/constants/XLSX-CONFIG/INDEXES/POLICY', () => {
  describe('DEFAULT_INDEXES', () => {
    it('should return an object with indexes', () => {
      const expected = {
        BROKER_ADDRESS: 0,
        LOSS_PAYEE_ADDRESS: 0,
      };

      expect(DEFAULT_INDEXES).toEqual(expected);
    });
  });

  describe('POLICY_INDEXES', () => {
    describe(`when ${SINGLE} contract policy, isUsingBroker=true, nominatedLossPayeeAppointed=true, policyContact.isSameAsOwner=false`, () => {
      it('should return an object with indexes', () => {
        const application = {
          ...mockApplication,
          broker: {
            ...mockApplication.broker,
            isUsingBroker: true,
          },
          nominatedLossPayee: {
            ...mockApplication.nominatedLossPayee,
            isAppointed: true,
          },
          policyContact: {
            isSameAsOwner: false,
          },
        };

        const result = POLICY_INDEXES(application);

        const expectedIndexes = {
          ...DEFAULT_INDEXES,
          BROKER_ADDRESS: 15,
          LOSS_PAYEE_ADDRESS: 18,
        };

        const expected = {
          ...DEFAULT_INDEXES,
          ...BROKER_CONDITIONS(application, expectedIndexes),
          ...LOSS_PAYEE_CONDITIONS(application, expectedIndexes),
        };

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${MULTIPLE} contract policy, isUsingBroker=true, nominatedLossPayeeAppointed=true, policyContact.isSameAsOwner=false`, () => {
      it('should return an object with indexes', () => {
        const application = {
          ...mockApplication,
          broker: {
            ...mockApplication.broker,
            isUsingBroker: true,
          },
          nominatedLossPayee: {
            ...mockApplication.nominatedLossPayee,
            isAppointed: true,
          },
          policy: {
            ...mockApplication.policy,
            policyType: MULTIPLE,
          },
          policyContact: {
            isSameAsOwner: false,
          },
        };

        const result = POLICY_INDEXES(application);

        const expectedIndexes = {
          ...DEFAULT_INDEXES,
          BROKER_ADDRESS: 16,
          LOSS_PAYEE_ADDRESS: 19,
        };

        const expected = {
          ...DEFAULT_INDEXES,
          ...BROKER_CONDITIONS(application, expectedIndexes),
          ...LOSS_PAYEE_CONDITIONS(application, expectedIndexes),
        };

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${SINGLE} contract policy, isUsingBroker=false, nominatedLossPayeeAppointed=false, policyContact.isSameAsOwner=true`, () => {
      it('should return an object with indexes', () => {
        const application = {
          ...mockApplication,
          broker: {
            ...mockApplication.broker,
            isUsingBroker: false,
          },
          nominatedLossPayee: {
            ...mockApplication.nominatedLossPayee,
            isAppointed: false,
          },
          policyContact: {
            isSameAsOwner: false,
          },
        };

        const result = POLICY_INDEXES(application);

        const expected = {
          ...DEFAULT_INDEXES,
          ...BROKER_CONDITIONS(application, DEFAULT_INDEXES),
          ...LOSS_PAYEE_CONDITIONS(application, DEFAULT_INDEXES),
        };

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${MULTIPLE} contract policy, isUsingBroker=false, nominatedLossPayeeAppointed=false, policyContact.isSameAsOwner=true`, () => {
      it('should return an object with indexes', () => {
        const application = {
          ...mockApplication,
          broker: {
            ...mockApplication.broker,
            isUsingBroker: false,
          },
          nominatedLossPayee: {
            ...mockApplication.nominatedLossPayee,
            isAppointed: false,
          },
          policy: {
            ...mockApplication.policy,
            policyType: MULTIPLE,
          },
          policyContact: {
            isSameAsOwner: false,
          },
        };

        const result = POLICY_INDEXES(application);

        const expected = {
          ...DEFAULT_INDEXES,
          ...BROKER_CONDITIONS(application, DEFAULT_INDEXES),
          ...LOSS_PAYEE_CONDITIONS(application, DEFAULT_INDEXES),
        };

        expect(result).toEqual(expected);
      });
    });
  });
});
