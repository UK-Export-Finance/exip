import LOSS_PAYEE_CONDITIONS from '.';
import { mockApplication } from '../../../../../test-mocks';

const mockIndexes = {
  LOSS_PAYEE_ADDRESS: 0,
};

const populatedApplicationFlags = {
  ...mockApplication,
  nominatedLossPayee: {
    ...mockApplication.nominatedLossPayee,
    isAppointed: true,
  },
  policyContact: {
    ...mockApplication.policyContact,
    isSameAsOwner: false,
  },
  policy: {
    ...mockApplication.policy,
    needPreCreditPeriodCover: true,
    jointlyInsuredParty: {
      ...mockApplication.policy.jointlyInsuredParty,
      requested: true,
    },
  },
  broker: {
    ...mockApplication.broker,
    isUsingBroker: true,
  },
};

describe('api/constants/XLSX-CONFIG/INDEXES/POLICY/LOSS_PAYEE_CONDITIONS', () => {
  describe('when isAppointed=true, policyContactIsSameAsOwner=false, needPreCreditPeriodCover=true, requestedJointlyInsuredParty=true, isUsingBroker=true', () => {
    it('should return an object with indexes', () => {
      const application = populatedApplicationFlags;

      const result = LOSS_PAYEE_CONDITIONS(application, mockIndexes);

      const expected = {
        LOSS_PAYEE_ADDRESS: (mockIndexes.LOSS_PAYEE_ADDRESS += 9),
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when isAppointed=true, policyContactIsSameAsOwner=true, needPreCreditPeriodCover=true, requestedJointlyInsuredParty=true, isUsingBroker=true', () => {
    it('should return an object with indexes', () => {
      const application = {
        ...populatedApplicationFlags,
        policyContact: {
          ...populatedApplicationFlags.policyContact,
          isSameAsOwner: true,
        },
      };

      const result = LOSS_PAYEE_CONDITIONS(application, mockIndexes);

      const expected = {
        LOSS_PAYEE_ADDRESS: (mockIndexes.LOSS_PAYEE_ADDRESS += 7),
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when isAppointed=true, policyContactIsSameAsOwner=true, needPreCreditPeriodCover=false, requestedJointlyInsuredParty=true, isUsingBroker=true', () => {
    it('should return an object with indexes', () => {
      const application = {
        ...populatedApplicationFlags,
        policy: {
          ...populatedApplicationFlags.policy,
          needPreCreditPeriodCover: false,
        },
      };

      const result = LOSS_PAYEE_CONDITIONS(application, mockIndexes);

      const expected = {
        LOSS_PAYEE_ADDRESS: (mockIndexes.LOSS_PAYEE_ADDRESS += 7),
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when isAppointed=true, policyContactIsSameAsOwner=true, needPreCreditPeriodCover=true, requestedJointlyInsuredParty=false, isUsingBroker=true', () => {
    it('should return an object with indexes', () => {
      const application = {
        ...populatedApplicationFlags,
        policy: {
          ...populatedApplicationFlags.policy,
          jointlyInsuredParty: {
            ...populatedApplicationFlags.policy.jointlyInsuredParty,
            requested: true,
          },
        },
      };

      const result = LOSS_PAYEE_CONDITIONS(application, mockIndexes);

      const expected = {
        LOSS_PAYEE_ADDRESS: (mockIndexes.LOSS_PAYEE_ADDRESS += 7),
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when isAppointed=true, policyContactIsSameAsOwner=true, needPreCreditPeriodCover=true, requestedJointlyInsuredParty=false, isUsingBroker=true', () => {
    it('should return an object with indexes', () => {
      const application = {
        ...populatedApplicationFlags,
        policy: {
          ...populatedApplicationFlags.policy,
          jointlyInsuredParty: {
            ...populatedApplicationFlags.policy.jointlyInsuredParty,
            requested: false,
          },
        },
      };

      const result = LOSS_PAYEE_CONDITIONS(application, mockIndexes);

      const expected = {
        LOSS_PAYEE_ADDRESS: (mockIndexes.LOSS_PAYEE_ADDRESS += 4),
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when isUsingBroker=false', () => {
    it('should return an object with indexes', () => {
      const application = {
        ...populatedApplicationFlags,
        broker: {
          ...populatedApplicationFlags.broker,
          isUsingBroker: false,
        },
      };

      const result = LOSS_PAYEE_CONDITIONS(application, mockIndexes);

      const expected = {
        LOSS_PAYEE_ADDRESS: mockIndexes.LOSS_PAYEE_ADDRESS,
      };

      expect(result).toEqual(expected);
    });
  });
});
