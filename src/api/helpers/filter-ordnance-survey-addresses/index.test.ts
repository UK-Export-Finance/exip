import filterOrdnanceSurveyAddresses, { filterOrdnanceSurveyAddress } from '.';
import mockOrdnanceSurveyResponse from '../../test-mocks/mock-ordnance-survey-response';

const ordnanceSurveyResponse = mockOrdnanceSurveyResponse.results;

describe('api/helpers/filter-ordnance-survey-addresses', () => {
  describe('filterOrdnanceSurveyAddress', () => {
    describe('when an address has a SUB_BUILDING_NAME with a matching substring', () => {
      it('should return the address', () => {
        const [mockAddress] = ordnanceSurveyResponse;

        const substring = String(mockAddress.DPA.SUB_BUILDING_NAME)?.substring(0, 5);

        const result = filterOrdnanceSurveyAddress(mockAddress, substring);

        expect(result).toEqual(mockAddress);
      });
    });

    describe('when an address has a BUILDING_NAME with a matching substring', () => {
      it('should return the address', () => {
        const { 1: mockAddress } = ordnanceSurveyResponse;

        const substring = String(mockAddress.DPA.BUILDING_NAME)?.substring(0, 5);

        const result = filterOrdnanceSurveyAddress(mockAddress, substring);

        expect(result).toEqual(mockAddress);
      });
    });

    describe('when an address has a ORGANISATION_NAME with a matching substring', () => {
      it('should return the address', () => {
        const { 2: mockAddress } = ordnanceSurveyResponse;

        const substring = String(mockAddress.DPA.ORGANISATION_NAME)?.substring(0, 5);

        const result = filterOrdnanceSurveyAddress(mockAddress, substring);

        expect(result).toEqual(mockAddress);
      });
    });

    describe('when an address has a BUILDING_NUMBER with a matching substring', () => {
      it('should return the address', () => {
        const { 3: mockAddress } = ordnanceSurveyResponse;

        const substring = String(mockAddress.DPA.BUILDING_NUMBER)?.substring(0, 5);

        const result = filterOrdnanceSurveyAddress(mockAddress, substring);

        expect(result).toEqual(mockAddress);
      });
    });

    describe('when an address does NOT have a matching sub string', () => {
      it('should return null', () => {
        const [mockAddress] = ordnanceSurveyResponse;

        const substring = 'mock sub string';

        const result = filterOrdnanceSurveyAddress(mockAddress, substring);

        expect(result).toEqual(null);
      });
    });
  });

  describe('filterOrdnanceSurveyAddresses', () => {
    it('should return filtered addresses via filterOrdnanceSurveyAddress', () => {
      const substring = 'mock sub string';

      const result = filterOrdnanceSurveyAddresses(ordnanceSurveyResponse, substring);

      const expected = ordnanceSurveyResponse.filter((address) => filterOrdnanceSurveyAddress(address, substring));

      expect(result).toEqual(expected);
    });
  });
});
