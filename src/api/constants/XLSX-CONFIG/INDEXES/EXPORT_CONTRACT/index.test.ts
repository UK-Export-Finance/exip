import EXPORT_CONTRACT_INDEXES, { DEFAULT_INDEXES } from '.';
import { mockApplication } from '../../../../test-mocks';

describe('api/constants/XLSX-CONFIG/INDEXES/EXPORT_CONTRACT', () => {
  describe('DEFAULT_INDEXES', () => {
    it('should return an object with indexes', () => {
      const expected = {
        AGENT_ADDRESS: 0,
      };

      expect(DEFAULT_INDEXES()).toEqual(expected);
    });
  });

  describe('EXPORT_CONTRACT_INDEXES', () => {
    describe('when isUsingAgent=true, finalDestinationKnown=true, attemptedPrivateMarket=true', () => {
      it('should return an object with indexes', () => {
        const application = mockApplication;

        application.exportContract.agent.isUsingAgent = true;
        application.exportContract.finalDestinationKnown = true;
        application.exportContract.privateMarket.attempted = true;

        const result = EXPORT_CONTRACT_INDEXES(application);

        const expected = {
          ...DEFAULT_INDEXES(),
          AGENT_ADDRESS: DEFAULT_INDEXES().AGENT_ADDRESS + 11,
        };

        expect(result).toEqual(expected);
      });
    });

    describe('when isUsingAgent=true, finalDestinationKnown=false, attemptedPrivateMarket=true', () => {
      it('should return an object with indexes', () => {
        const application = mockApplication;

        application.exportContract.agent.isUsingAgent = true;
        application.exportContract.finalDestinationKnown = false;
        application.exportContract.privateMarket.attempted = true;

        const result = EXPORT_CONTRACT_INDEXES(application);

        const expected = {
          ...DEFAULT_INDEXES(),
          AGENT_ADDRESS: DEFAULT_INDEXES().AGENT_ADDRESS + 10,
        };

        expect(result).toEqual(expected);
      });
    });

    describe('when isUsingAgent=true, finalDestinationKnown=true, attemptedPrivateMarket=false', () => {
      it('should return an object with indexes', () => {
        const application = mockApplication;

        application.exportContract.agent.isUsingAgent = true;
        application.exportContract.finalDestinationKnown = true;
        application.exportContract.privateMarket.attempted = false;

        const result = EXPORT_CONTRACT_INDEXES(application);

        const expected = {
          ...DEFAULT_INDEXES(),
          AGENT_ADDRESS: DEFAULT_INDEXES().AGENT_ADDRESS + 10,
        };

        expect(result).toEqual(expected);
      });
    });

    describe('when isUsingAgent=true, finalDestinationKnown=false, attemptedPrivateMarket=false', () => {
      it('should return an object with indexes', () => {
        const application = mockApplication;

        application.exportContract.agent.isUsingAgent = true;
        application.exportContract.finalDestinationKnown = false;
        application.exportContract.privateMarket.attempted = false;

        const result = EXPORT_CONTRACT_INDEXES(application);

        const expected = {
          ...DEFAULT_INDEXES(),
          AGENT_ADDRESS: DEFAULT_INDEXES().AGENT_ADDRESS + 9,
        };

        expect(result).toEqual(expected);
      });
    });

    describe('when isUsingAgent=false, finalDestinationKnown=false, attemptedPrivateMarket=false', () => {
      it('should return DEFAULT_INDEXES()', () => {
        const application = mockApplication;

        application.exportContract.agent.isUsingAgent = false;
        application.exportContract.finalDestinationKnown = false;
        application.exportContract.privateMarket.attempted = false;

        const result = EXPORT_CONTRACT_INDEXES(application);

        const expected = DEFAULT_INDEXES();

        expect(result).toEqual(expected);
      });
    });
  });
});
