import BROKER_CONDITIONS from '.';
import { mockApplication } from '../../../../../test-mocks';

const mockIndexes = () => ({
  BROKER_ADDRESS: 0,
});

describe('api/constants/XLSX-CONFIG/INDEXES/POLICY/BROKER_CONDITIONS', () => {
  describe('when isUsingBroker=true, policyContactIsSameAsOwner=false, needPreCreditPeriodCover=true, requestedJointlyInsuredParty=true', () => {
    it('should return an object with indexes', () => {
      const application = mockApplication;

      application.broker.isUsingBroker = true;
      application.policyContact.isSameAsOwner = false;
      application.policy.jointlyInsuredParty.requested = true;
      application.policy.needPreCreditPeriodCover = true;

      const result = BROKER_CONDITIONS(application, mockIndexes());

      const expected = {
        BROKER_ADDRESS: 6,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when isUsingBroker=true, policyContactIsSameAsOwner=true, needPreCreditPeriodCover=true, requestedJointlyInsuredParty=true', () => {
    it('should return an object with indexes', () => {
      const application = mockApplication;

      application.broker.isUsingBroker = true;
      application.policyContact.isSameAsOwner = true;
      application.policy.needPreCreditPeriodCover = true;
      application.policy.jointlyInsuredParty.requested = true;

      const result = BROKER_CONDITIONS(application, mockIndexes());

      const expected = {
        BROKER_ADDRESS: 4,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when isUsingBroker=true, policyContactIsSameAsOwner=true, needPreCreditPeriodCover=false, requestedJointlyInsuredParty=false', () => {
    it('should return an object with indexes', () => {
      const application = mockApplication;

      application.broker.isUsingBroker = true;
      application.policyContact.isSameAsOwner = true;
      application.policy.needPreCreditPeriodCover = false;
      application.policy.jointlyInsuredParty.requested = false;

      const result = BROKER_CONDITIONS(application, mockIndexes());

      const expected = {
        BROKER_ADDRESS: 0,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when isUsingBroker=true, policyContactIsSameAsOwner=true, needPreCreditPeriodCover=true, requestedJointlyInsuredParty=false', () => {
    it('should return an object with indexes', () => {
      const application = mockApplication;

      application.broker.isUsingBroker = true;
      application.policyContact.isSameAsOwner = true;
      application.policy.needPreCreditPeriodCover = true;
      application.policy.jointlyInsuredParty.requested = false;

      const result = BROKER_CONDITIONS(application, mockIndexes());

      const expected = {
        BROKER_ADDRESS: 1,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when isUsingBroker=true, policyContactIsSameAsOwner=true, needPreCreditPeriodCover=false, requestedJointlyInsuredParty=true', () => {
    it('should return an object with indexes', () => {
      const application = mockApplication;

      application.broker.isUsingBroker = true;
      application.policyContact.isSameAsOwner = true;
      application.policy.needPreCreditPeriodCover = false;
      application.policy.jointlyInsuredParty.requested = true;

      const result = BROKER_CONDITIONS(application, mockIndexes());

      const expected = {
        BROKER_ADDRESS: 3,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when isUsingBroker=false', () => {
    it('should return an object with indexes', () => {
      const application = mockApplication;

      application.broker.isUsingBroker = false;

      const result = BROKER_CONDITIONS(application, mockIndexes());

      const expected = {
        BROKER_ADDRESS: 0,
      };

      expect(result).toEqual(expected);
    });
  });
});
